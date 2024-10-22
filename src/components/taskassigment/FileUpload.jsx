// import { useState } from "react";
// import Button from "../Button"; // Import Button component

// const FileUpload = ({ onSubmit }) => {
//   const [fileList, setFileList] = useState([]);
//   const [uploadProgress, setUploadProgress] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Handle file selection
//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     const validFiles = selectedFiles.filter(file => {
//       if (file.size > 100 * 1024) { // Check if file size exceeds 100KB
//         setErrorMessage(`File ${file.name} vượt quá kích thước 100KB`);
//         return false;
//       }
//       return true;
//     });
    
//     if (validFiles.length) {
//       setFileList((prevFiles) => [...prevFiles, ...validFiles]);
//       setErrorMessage(""); // Clear any previous error message
//       setUploadProgress((prevProgress) => [
//         ...prevProgress,
//         ...validFiles.map(() => 0), // Initialize progress for valid files
//       ]);
//     }
//   };

//   // Handle file removal
//   const handleRemoveFile = (index) => {
//     setFileList((prevFiles) => {
//       const updatedFiles = prevFiles.filter((_, idx) => idx !== index);
//       const updatedProgress = uploadProgress.filter((_, idx) => idx !== index);
//       console.log("Updated file list after removal:", updatedFiles);
//       setUploadProgress(updatedProgress); // Update progress state
//       return updatedFiles;
//     });
//   };

//   // Handle file submission
//   const handleSubmitFiles = () => {
//     if (onSubmit) {
//       onSubmit(fileList);
//       // Simulate file upload progress (optional)
//       const interval = setInterval(() => {
//         setUploadProgress((prevProgress) =>
//           prevProgress.map((progress, index) =>
//             progress < 100 ? progress + 10 : progress
//           )
//         );
//       }, 100); // Increase progress by 10% every 100ms

//       setTimeout(() => {
//         clearInterval(interval);
//         alert("Nộp file thành công!");
//       }, 1000); // Stop after 1 second
//     }
//   };

//   return (
//     <div className="mt-4 w-full">
//       <input
//         type="file"
//         multiple
//         onChange={handleFileChange}
//         className="mb-2 border border-gray-300 rounded px-1 py-1 w-auto"
//       />

//       {/* Display error message */}
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}

//       {/* Display selected files */}
//       {fileList.length > 0 && (
//         <ul className="mb-4">
//           {fileList.map((file, index) => (
//             <li key={index} className="flex justify-between items-center truncate">
//               <span className="overflow-hidden whitespace-nowrap text-ellipsis max-w-xs">
//                 {file.name}
//               </span>
//               <div className="flex items-center">
//                 {uploadProgress[index] !== undefined && (
//                   <span className="text-sm mr-2">
//                     {uploadProgress[index]}%
//                   </span>
//                 )}
//                 <button
//                   onClick={() => handleRemoveFile(index)}
//                   className="text-red-500 ml-2"
//                 >
//                   Gỡ file
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Submit button */}
//       <Button onClick={handleSubmitFiles} className="bg-blue-500 text-white">
//         Xác nhận nộp
//       </Button>
//     </div>
//   );
// };

// export default FileUpload;
import React, { useRef, useState } from "react";
import axios from "axios";

const FileUpload = ({}) => {
  const inputRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = "";
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus("select");
  };

  const handleUpload = async () => {
    if (uploadStatus === "done") {
      clearFileInput();
      return;
    }

    try {
      setUploadStatus("uploading");

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "http://localhost:8000/api/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      setUploadStatus("done");
    } catch (error) {
      setUploadStatus("select");
    }
  };

  const styles = {
    fileBtn: {
      display: "inline-block",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      borderRadius: "5px",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    fileCard: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      border: "1px solid #ddd",
      padding: "10px",
      borderRadius: "5px",
      marginTop: "10px",
    },
    fileInfo: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flex: 1,
    },
    progressBg: {
      width: "100%",
      height: "5px",
      backgroundColor: "#f1f1f1",
      borderRadius: "5px",
      overflow: "hidden",
      marginTop: "8px",
    },
    progress: {
      height: "100%",
      backgroundColor: "#007bff",
      transition: "width 0.4s ease",
    },
    uploadBtn: {
      marginTop: "10px",
      padding: "8px 15px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      borderRadius: "5px",
    },
    checkCircle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      backgroundColor: "#28a745",
      color: "#fff",
    },
    closeIcon: {
      cursor: "pointer",
      color: "#ff0000",
    },
    icon: {
      fontSize: "20px",
      marginRight: "8px",
    },
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {!selectedFile && (
        <button style={styles.fileBtn} onClick={onChooseFile}>
          <span className="material-symbols-outlined">upload</span> Upload File
        </button>
      )}

      {selectedFile && (
        <>
          <div style={styles.fileCard}>
            <span className="material-symbols-outlined" style={styles.icon}>
              description
            </span>

            <div style={styles.fileInfo}>
              <div style={{ flex: 1 }}>
                <h6>{selectedFile?.name}</h6>

                <div style={styles.progressBg}>
                  <div style={{ ...styles.progress, width: `${progress}%` }} />
                </div>
              </div>

              {uploadStatus === "select" ? (
                <button onClick={clearFileInput}>
                  <span
                    className="material-symbols-outlined"
                    style={styles.closeIcon}
                  >
                    close
                  </span>
                </button>
              ) : (
                <div style={styles.checkCircle}>
                  {uploadStatus === "uploading" ? (
                    `${progress}%`
                  ) : uploadStatus === "done" ? (
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "20px" }}
                    >
                      check
                    </span>
                  ) : null}
                </div>
              )}
            </div>
          </div>
          <button style={styles.uploadBtn} onClick={handleUpload}>
            {uploadStatus === "select" || uploadStatus === "uploading"
              ? "Upload"
              : "Done"}
          </button>
        </>
      )}
    </div>
  );
};

export default FileUpload;
