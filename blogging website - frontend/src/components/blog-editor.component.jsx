import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import { uploadImage } from "../common/aws";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  publishBlog,
  setBlog,
  setEditorState,
} from "../features/blog/blogSlice";
import EditorJS from "@editorjs/editorjs";
import { Tools } from "./tools.component";

const BlogEditor = () => {
  const { user } = useSelector((state) => state.auth);

  const accessToken = user?.access_token;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogBannerRef = useRef();

  const textEditorRef = useRef(null);

  const {
    blog,
    blog: { content, title, des, tags },
  } = useSelector((state) => state.blog);

  useEffect(() => {
    const editor = new EditorJS({
      holder: "textEditor",
      data: content?.blocks?.length ? content : "no content",
      tools: Tools,
      placeholder: "Let's write an Awesome story",
    });

    textEditorRef.current = editor;

    return () => {
      editor.destroy();
      textEditorRef.current = null;
    };
  }, [dispatch]);

  const handleBannerUpload = async (e) => {
    e.preventDefault();
    const img = e.target.files[0];

    if (!img) {
      toast.error("No image selected!");
      return;
    }

    const loadingToast = toast.loading("Uploading...");

    try {
      const url = await uploadImage(img);

      if (url) {
        const imageElement = blogBannerRef.current;
        imageElement.onload = () => {
          toast.success("Uploaded 👍");
          toast.dismiss(loadingToast);
        };
        imageElement.src = url;
        dispatch(setBlog({ banner: url }));
      } else {
        throw new Error("Image upload failed. URL not returned.");
      }
    } catch (error) {
      console.error("Error during banner upload:", error);
      toast.error(error.message || "An error occurred during upload.");
      toast.dismiss(loadingToast);
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    dispatch(setBlog({ title: input.value }));
  };

  const handlePublishEvent = () => {
    if (!blog?.banner?.length) {
      return toast.error("Upload a blog banner");
    }

    if (!blog?.title?.length) {
      return toast.error("Write a title for blog banner");
    }

    if (textEditorRef.current) {
      textEditorRef.current
        .save()
        .then((data) => {
          if (data?.blocks?.length) {
            dispatch(setBlog({ ...blog, content: data }));
            dispatch(setEditorState("publish"));
          } else {
            return toast.error("Write something in order to publish");
          }
        })
        .catch((error) => {
          console.error("Error saving editor content:", error);
        });
    } else {
      toast.error("Editor is not ready yet!");
    }
  };

  const handleSaveDraft = async (e) => {
    // Prevent multiple clicks
    if (e.target.className.includes("disable")) {
      return;
    }

    if (!title?.length) {
      return toast.error("Write a blog title before saving as draft.");
    }

    const loadingToast = toast.loading("Saving draft...");

    // Disable the button temporarily
    e.target.classList.add("disable");

    try {
      // Only include title and draft:true for the draft
      const blogObj = {
        title,
        draft: true,
      };

      // Dispatch the saveDraft action
      await dispatch(publishBlog({ blogData: blogObj, accessToken })).unwrap();

      toast.success("Draft saved successfully!");
      setTimeout(() => {
        navigate("/"); // Redirect to the homepage or drafts page
      }, 500);
    } catch (error) {
      toast.error(error.message || "Failed to save draft.");
    } finally {
      e.target.classList.remove("disable");
      toast.dismiss(loadingToast);
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} alt="logo" />
        </Link>

        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {blog?.title?.length ? blog.title : "New blog"}
        </p>

        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2" onClick={handlePublishEvent}>
            Publish
          </button>
          <button className="btn-light" onClick={handleSaveDraft}>
            Save Draft
          </button>
        </div>
      </nav>

      <Toaster />

      <AnimationWrapper>
        <section>
          <div className="max-auto max-w-[900px] w-full">
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner" className="w-full h-full">
                <img
                  ref={blogBannerRef}
                  src={blog.banner || defaultBanner}
                  className="z-20 cursor-pointer"
                  alt="Banner"
                />

                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>
            <textarea
              placeholder="Blog Title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
              value={blog.title}
            />

            <hr className="w-full opacity-10 m-5" />

            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
