import React from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import { storage } from "../../componets/config/firebaseConfig";

export default function SaveImages({
  images,
  setReadyimages,
  readyimages,
  setImages,
  setSingleimage,
  setSaveprogress,
  saveprogress
}) {
  const uploadFiles = async (e) => {
    e.preventDefault();

    if (!images || images.length === 0) {
      console.error("No files selected");
      toast.error("No files selected!");
      return;
    }

    // Array to store download URLs
    const downloadUrls = [];
    setSaveprogress(true)
    for (const image of images) {
      try {
        const name = `${new Date().getTime()}_${image.name}`;
        const storageRef = ref(storage, `images/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              console.error("Upload error:", error);
              toast.error("Failed to upload an image.");
              reject(error);
            },
            async () => {
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
              downloadUrls.push(downloadUrl);
              resolve();
            }
          );
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    if (downloadUrls.length > 0) {
      setReadyimages([...readyimages, ...downloadUrls]);
      setSingleimage(downloadUrls[0])
      
      setImages([]); // Clear the images state after upload
      setSaveprogress(false)
      toast.success("Images uploaded successfully!");
      alert("uploaded")
    }
  };

  return (
    <div>
     {images?.length > 0 &&  <button disabled={saveprogress} onClick={uploadFiles} style={{ padding: "10px", margin: "10px" }}>
        Save Images
      </button>}
      {/* <ToastContainer /> */}
    </div>
  );
}
