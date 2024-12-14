import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { storage } from "../../componets/config/firebaseConfig"

export default function Videoupload({
    setVideo,
    video,
  setSelectedVideo,
  setSaveprogress,
  saveprogress
}) {
    const uploadFiles = (e) => {
        e.preventDefault();
        if (!video) {
          console.error("File is missing");
          toast.error("No file selected!");
          return;
        }
        setSaveprogress(true)
        const name = `${new Date().getTime()}_${video.name}`;
        const storageRef = ref(storage, `videos/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, video);
    
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("Upload error:", error);
            toast.error("Failed to upload image.");
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
              console.log("File available at", downloadUrl);
              setSelectedVideo(downloadUrl)
              setVideo()
              setSaveprogress(false)
            //   toast.success("Image uploaded successfully!");
            alert("Video Uploaded")
            });
          }
        );
      };
    
    

  return (
    <div>
      {video && <button disabled={saveprogress} onClick={uploadFiles} style={{ padding: "10px", margin: "10px" }}>
        Save Video
      </button>}
     
      {/* <ToastContainer /> */}
    </div>
  );
}