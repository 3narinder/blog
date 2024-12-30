import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import BlogEditor from "../components/blog-editor.component";
import PublishFrom from "../components/publish-form.component";
import { setEditorState } from "../features/blog/blogSlice";

const Editor = () => {
  const dispatch = useDispatch();
  const { blog, editorState } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);

  // Redirect to login if the user is not authenticated
  if (!user || !user.access_token) {
    return <Navigate to="/login" />;
  }

  return <>{editorState === "editor" ? <BlogEditor /> : <PublishFrom />}</>;
};

export default Editor;
