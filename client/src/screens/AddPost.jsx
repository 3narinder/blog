import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addPost } from "../redux/posts/post.action";
import { getCategories } from "../redux/category/category.action";

const AddPost = () => {
  const dispatch = useDispatch();

  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [category, setcategory] = useState("");

  const [author, setauthor] = useState("");

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    let body = { category, title, content, author };
    dispatch(addPost(body));
  };

  const categoryState = useSelector((state) => state.categoryState);

  const { categories } = categoryState;

  return (
    <div className="w-full h-auto py-12 bg-teal-200">
      <form className=" lg:px-48 md:px-24 px-2 w-full">
        <div className="">
          <label className=" text-2xl font-semibold tracking-wider ">Title</label>
          <input
            className=" block p-2 mt-2 w-full border-none rounded-sm focus:outline-none"
            type="text"
            placeholder="add title"
            onChange={(e) => settitle(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className=" flex gap-2 mt-4">
            <label className="text-lg font-semibold">Category</label>
            <select
              onChange={(e) => setcategory(e.target.value)}
              className="rounded-sm px-2 py-1 border-none focus:outline-none text-gray-700 capitalize"
            >
              <option selected disabled value="">
                Select category
              </option>

              {categories?.map((category) => (
                <option className="capitalize text-sm">{category.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <label className="text-lg font-semibold">Author</label>
            <input
              className=" block p-1 w-full border-none rounded-sm capitalize focus:outline-none"
              type="text"
              placeholder="add author"
              onChange={(e) => setauthor(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 ">
          <textarea
            rows={14}
            className=" block w-full p-2 border-none rounded focus:outline-none"
            type="text"
            placeholder="add content here...."
            onChange={(e) => setcontent(e.target.value)}
          />
        </div>

        <button
          onClick={submitHandler}
          className="mt-4 block mx-auto md:mx-0 bg-white px-4 py-2 rounded-full text-lg font-semibold"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default AddPost;
