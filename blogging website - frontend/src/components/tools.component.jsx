import React from "react";
import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import { uploadImage } from "../common/aws";

const uploadImageByUrl = async (url) => {
  console.log("uploadImageByUrl called with URL:", url); // Add this

  if (!url || typeof url !== "string") {
    console.error("Invalid URL:", url);
    return {
      success: 0,
      message: "Invalid URL provided!",
    };
  }

  return {
    success: 1,
    file: {
      url: "https://via.placeholder.com/150",
    },
  };
};

const uploadImageByFile = (e) => {
  return uploadImage(e).then((url) => {
    if (url) {
      return {
        success: 1,
        file: { url },
      };
    }
  });
};

export const Tools = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByUrl, // Ensure the correct reference
        uploadByFile: uploadImageByFile,
      },
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: "Type Heading....",
      level: [2, 3],
      defaultLevel: 2,
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  marker: Marker,
  inlineCode: InlineCode,
};
