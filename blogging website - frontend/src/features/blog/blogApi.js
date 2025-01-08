import axios from "axios";

// Create an axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to publish a blog
export const publishBlogApi = async (blogData, accessToken) => {
  try {
    const response = await api.post("/blog/create-blog", blogData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.error ||
      "An error occurred while publishing the blog"
    );
  }
};

// Function to fetch a blog by ID
// export const getBlogById = async (blogId) => {
//   try {
//     const response = await api.get(`/blogs/${blogId}`);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.error || "Failed to fetch the blog";
//   }
// };

// // Function to fetch all blogs
// export const getAllBlogs = async () => {
//   try {
//     const response = await api.get("/blogs");
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.error || "Failed to fetch blogs";
//   }
// };

// // Function to update a blog
// export const updateBlog = async (blogId, updatedBlogData, accessToken) => {
//   try {
//     const response = await api.put(`/blogs/${blogId}`, updatedBlogData, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.error || "Failed to update the blog";
//   }
// };

// // Function to delete a blog
// export const deleteBlog = async (blogId, accessToken) => {
//   try {
//     const response = await api.delete(`/blogs/${blogId}`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.error || "Failed to delete the blog";
//   }
// };

// Additional API endpoints related to blogs can be added here
