import React from "react";
import AnimationWrapper from "../common/page-animation";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setEditorState } from "../features/blog/blogSlice";

const PublishFrom = () => {
  const dispatch = useDispatch();

  const {
    blog,
    blog: { content, title },
  } = useSelector((state) => state.blog);

  console.log(blog, `<---- final blog data`);

  const handleCloseEvent = () => {
    dispatch(setEditorState("editor"));
  };

  return (
    <AnimationWrapper>
      <section>
        <Toaster />

        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg-[10%]"
          onClick={handleCloseEvent}
        >
          <i className="fi fi-br-cross"></i>
        </button>
        <form>form</form>
      </section>
    </AnimationWrapper>
  );
};

export default PublishFrom;
