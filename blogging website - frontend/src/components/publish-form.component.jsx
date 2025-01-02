import React from "react";
import AnimationWrapper from "../common/page-animation";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setBlog, setEditorState } from "../features/blog/blogSlice";
import Tag from "./tags.component";

const PublishFrom = () => {
  let characterLimit = 200;

  let tagLimit = 10;

  const dispatch = useDispatch();

  const {
    blog,
    blog: { content, title, banner, tags, des },
  } = useSelector((state) => state.blog);

  const handleCloseEvent = () => {
    dispatch(setEditorState("editor"));
  };

  const handleBlogTitle = (e) => {
    const input = e.target.value;
    // Dispatching updated blog with new title
    dispatch(setBlog({ ...blog, title: input }));
  };

  const handleBlogDes = (e) => {
    const input = e.target.value;
    // Dispatching updated blog with new title
    dispatch(setBlog({ ...blog, des: input }));
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      let tag = e.target.value.trim(); // Trim spaces from the input

      if (tags?.length < tagLimit) {
        if (tag && !tags?.includes(tag)) {
          dispatch(setBlog({ ...blog, tags: [...tags, tag] }));
          e.target.value = ""; // Clear the input field after adding the tag
        } else {
          toast.error("Tag is either empty or already added.");
        }
      } else {
        toast.error("Tag limit reached.");
      }
    }
  };

  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
        <Toaster />
        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg-[10%]"
          onClick={handleCloseEvent}
        >
          <i className="fi fi-br-cross"></i>
        </button>

        <div className="max-w-[550px] center">
          <p className="text-dark-grey">Preview</p>

          <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
            <img src={banner} />
          </div>

          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}
          </h1>

          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
            {des}
          </p>
        </div>

        <div className="border-grey lg:border-1 ">
          <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
          <input
            type="text"
            placeholder="Blog title"
            defaultValue={title}
            className="input-box pl-4"
            onChange={handleBlogTitle}
          />

          <p className="text-dark-grey mb-2 mt-9">
            Short description about your blog
          </p>

          <textarea
            maxLength={characterLimit}
            defaultValue={des}
            className="h-40 resize-none leading-7 input-box pl-4"
            onChange={handleBlogDes}
            onKeyDown={handleTitleKeyDown}
          ></textarea>

          <p className="mt-1 text-dark-grey text-sm text-right">
            {characterLimit - des?.length} character left
          </p>

          <p className="text-dark-grey mb-2 mt-9">
            Topic - (Help in searching and ranking blog post)
          </p>

          <div className="relative input-box pl-2 py-2 pb-4">
            <input
              type="text"
              placeholder="Topic"
              className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
              onKeyDown={handleKeyDown}
            />

            {tags?.map((tag, i) => (
              <Tag key={i} tagIndex={i} tag={tag} />
            ))}
          </div>

          <p className="mt-1 text-dark-grey text-sm text-right">
            {tagLimit - tags?.length} tag left
          </p>

          <button className="btn-dark px-8 mt-8">Publish</button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishFrom;
