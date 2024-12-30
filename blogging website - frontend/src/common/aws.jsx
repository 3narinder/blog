import axios from "axios";

export const uploadImage = async (img) => {
  let imageUrl = null;

  try {
    const {
      data: { uploadUrl },
    } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/blog/get-upload-url`
    );

    try {
      await axios({
        method: "PUT",
        url: uploadUrl,
        headers: { "Content-Type": "multipart/form-data" },
        data: img,
      });
      imageUrl = uploadUrl.split("?")[0];
    } catch (uploadError) {
      console.error("Error uploading the image:", uploadError);
      throw new Error("Image upload failed. Please try again.");
    }
  } catch (error) {
    console.error("Error fetching upload URL:", error);
    throw new Error("Failed to fetch upload URL. Please try again.");
  }

  return imageUrl;
};
