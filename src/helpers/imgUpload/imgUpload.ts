import axios from "axios";

export async function uploadImageToCloudinary(files: File | File[]) {
  console.log(files);
  try {
    // Check if files is an array (multiple files) or a single file
    const isMultiple = Array.isArray(files);

    // If it's a single file, convert it to an array
    const filesArray = isMultiple ? files : [files];

    const uploadPromises = filesArray.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "traverse"); // Replace with your actual upload preset
      formData.append("cloud_name", "da7fd517b"); // Replace with your actual cloud name

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/da7fd517b/upload",
        formData
      );

      return cloudinaryResponse.data.url;
    });

    const urls = await Promise.all(uploadPromises);
    return isMultiple ? urls : urls[0]; // Return array if multiple, otherwise return single URL
  } catch (error) {
    console.error("Error uploading images to Cloudinary:", error);
    throw error;
  }
}
