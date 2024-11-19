// DetailTask.jsx
import React, { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Picker from "emoji-picker-react";
import { FaFileUpload, FaSmile } from "react-icons/fa";
import { FaPaperclip } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import API_ENDPOINTS from "../../constant/linkapi";
import {
  FaFileAlt,
  FaFilePdf,
  FaFileImage,
  FaFileWord,
  FaFileExcel,
  FaFileVideo,
} from "react-icons/fa";
import axios from "axios";
const DetailTask = ({
  expanded,
  setExpanded,
  task,
  titleTask,
  name,
  date,
  userTeam,
  roleTeam,
}) => {
  const maCongViec = task.maCongViec + "";
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progress, setProgress] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [showComments, setShowComment] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  console.log(userTeam);
  console.log(roleTeam);
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(API_ENDPOINTS.HUB_URL)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    const startConnection = async () => {
      try {
        await newConnection.start();
        console.log("Connected!");
        setConnection(newConnection);
        await newConnection.invoke("ThamGiaNhom", maCongViec);
        console.log(`Joined group: ${maCongViec}`);
        newConnection.off("ReceiveMessage");
        newConnection.off("UserJoined");
        newConnection.on("ReceiveMessage", (user, message) => {
          var date=new Date().toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }).toString()
          const newMessage = { user, message,date };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          console.log("Received message:", newMessage);
        });

        newConnection.on("UserJoined", (message) => {
          console.log("User joined message:", message);
        });
      } catch (err) {
        console.error("Connection failed: ", err);
      }
    };

    startConnection();

    return () => {
      if (newConnection) {
        newConnection.off("ReceiveMessage");
        newConnection.off("UserJoined");
        newConnection.stop();
        console.log("Connection stopped.");
      }
    };
  }, [maCongViec]);
  const handleSendComment = async () => {
    if (newComment.trim() === "" && selectedFiles.length === 0) return;
    try {
      if (selectedFiles.length > 0) {
        const uploadedFiles = await handleUpload();
        for (const file of uploadedFiles) {
          const fileHTML = `
          <div>
            <h4>File uploaded:</h4>
            <div style="display: flex; align-items: center;">
              <span style="margin-right: 8px;">${getSendFileIcon(file.extension)}</span>
              <p>${file.name} (${file.size})</p>
            </div>
            <a href="${file.url}" target="_blank">Download</a>
          </div>
        `;
          await connection.invoke(
            "TraoDoiThongTin",
            maCongViec,
            localStorage.getItem("name"),
            //`File uploaded: ${file.name} (${file.url})`
            fileHTML
          );
        }
        setSelectedFiles([]);
      }

      if (newComment.trim() !== "") {
        await connection.invoke(
          "TraoDoiThongTin",
          maCongViec,
          localStorage.getItem("name"),
          newComment
        );
        setNewComment("");
      }

      setShowEmojiPicker(false);
    } catch (err) {
      console.error("Error sending message: ", err);
    }
  };
  const onEmojiClick = (emoji) => {
    setNewComment((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };
  const handleFileChange = (event) => {
    //setSelectedFile(event.target.files[0]);
    setSelectedFiles([...selectedFiles, ...event.target.files]);
    console.log(selectedFiles);
  };
  const handleUpload = async () => {
    try {
      setUploadStatus("Uploading...");
      const newProgress = Array(selectedFiles.length).fill(0);
      setProgress(newProgress);
      const responses = [];

      const uploadPromises = selectedFiles.map((file, index) => {
        const formData = new FormData();
        formData.append("file", file);

        return axios
          .post(`${API_ENDPOINTS.URL}/FileUpload/Upload`, formData, {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress((prev) => {
                const updated = [...prev];
                updated[index] = percentCompleted;
                return updated;
              });
            },
          })
          .then((response) => {
            responses.push({
              name: file.name,
              url: response.data.url,
              extension: file.name.split(".").pop(),
              size: formatFileSize(file.size),
            });
          });
      });
      await Promise.all(uploadPromises);
      setUploadStatus("Upload Successful");
      return responses;
    } catch (error) {
      console.error(error);
      setUploadStatus("Upload Failed");
      return [];
    }
  };
  const removeFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  const getFileIcon = (fileName) => {
    const ext = fileName.toLowerCase();

    switch (ext) {
      case "pdf":
        return <FaFilePdf />;
      case "jpg":
      case "jpeg":
      case "png":
        return <FaFileImage />;
      case "doc":
      case "docx":
        return <FaFileWord />;
      case "xls":
      case "xlsx":
        return <FaFileExcel />;
      case "mp4":
        return <FaFileVideo />;
      default:
        return <FaFileAlt />;
    }
  };
  const getSendFileIcon = (extension) => {
    const ext = extension.toLowerCase();
    switch (ext) {
      case "pdf":
        return `<i class="fas fa-file-pdf" style="color: red;"></i>`;
      case "jpg":
      case "jpeg":
      case "png":
        return `<i class="fas fa-file-image" style="color: green;"></i>`;
      case "doc":
      case "docx":
        return `<i class="fas fa-file-word" style="color: blue;"></i>`;
      case "xls":
      case "xlsx":
        return `<i class="fas fa-file-excel" style="color: green;"></i>`;
      case "mp4":
        return `<i class="fas fa-file-video" style="color: purple;"></i>`;
      default:
        return `<i class="fas fa-file-alt" style="color: gray;"></i>`;
    }
  };

  const formatFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    else if (size < 1024 * 1024 * 1024)
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    else return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };
  const isImage = (file) => {
    const imageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    return imageTypes.includes(file.type);
  };
  return (
    <>
      <div
        className={`fixed overflow-auto top-0 right-0 h-full bg-white shadow-lg w-1/2 transform ${
          expanded ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
        style={{
          position: "absolute",
          zIndex: 10,
          borderLeft: "1px solid #e5e7eb",
        }}
      >
        {/* Close button */}
        <div className="flex justify-between p-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full focus:outline-none">
            Mark Complete
          </button>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setExpanded(false)}
          >
            ✖️
          </button>
        </div>

        {/* Task Title */}
        <div className="mb-4 px-6">
          <h2 className="text-2xl font-semibold text-gray-800">Tên Công Việc: {titleTask}</h2>
        </div>

        {/* Assignee and Due Date */}
        <div className="mb-4 px-6 flex justify-between items-center">
          <div className="grid grid-cols-4 gap-1 px-4">
            {roleTeam.map((member, index) => (
              <div
                key={index}
                className="p-1 bg-white shadow-md rounded-md flex flex-col items-center text-center hover:bg-gray-100 transition duration-200"
              >
                {/* Avatar */}
                <div
                  className="rounded-full h-8 w-8 bg-purple-600 flex items-center justify-center text-xs text-white mb-1"
                  title={member.nhanVien?.email || "No email available"}
                >
                  {member.nhanVien?.tenNhanVien?.[0]?.toUpperCase() || "?"}
                </div>
                {/* Tên nhân viên */}
                <p className="text-xs font-medium text-gray-800">
                  {member.nhanVien?.tenNhanVien || "Unknown"}
                </p>
                {/* Email (hiển thị khi hover card) */}
                <p className="text-xs text-gray-500 mt-0.5 opacity-0 hover:opacity-100 transition duration-200">
                  {member.nhanVien?.email || "No email available"}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <span className="text-red-600 mr-3 text-sm">{date}</span>
            <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs">
              Limited access
            </span>
          </div>
        </div>

        <div className="mb-6 px-6">
          <p className="text-gray-700 font-medium">Mô Tả</p>
          <textarea
            className="w-full bg-gray-100 p-3 mt-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What is this task about?"
            rows="1"
            value={task.moTa}
            readOnly
          ></textarea>
        </div>

        {/* Collaborators Section */}
        <div className="mb-6 px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-gray-700 font-medium">Thành Viên:</span>
              <div className="flex -space-x-2 ml-3">
                {userTeam.map((m, index) => {
                  return (
                    <div
                      className="rounded-full h-8 w-8 bg-purple-500 flex items-center justify-center text-xs text-white"
                      key={index}
                    >
                      {m.nhanVien?.tenNhanVien.slice(0, 2)}
                    </div>
                  );
                })}
                
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 px-6 bg-gray-100">
          <div
            className="rounded border-t-2"
            style={{ maxHeight: "200px", overflowY: "auto" }} // Thanh trượt
          >
            {/* <div className="border">
              <button
                onClick={() => {
                  setShowComment(true);
                }}
                className="px-2 py font-bold border-r-2"
              >
                comments
              </button>
              <button
                onClick={() => {
                  setShowComment(false);
                }}
                className="px-2 py font-bold"
              >
                histories
              </button>
            </div> */}
            {true ? (
              <div className="py-2">
                {messages.map((comment, index) => (
                  <div
                    key={index}
                    className="mb-2 bg-gray-50 p-2 border rounded-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="rounded-full h-8 w-8 bg-purple-500 flex items-center justify-center text-xs text-white">
                          {comment.user.slice(0, 2)}
                        </div>
                        <span className="ml-3 text-gray-700">
                          {comment.user === localStorage.getItem("name")
                            ? "Bạn"
                            : comment.user}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {comment.date}
                      </span>
                    </div>
                    <p className="ml-11 text-gray-600">{comment.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div>histories</div>
            )}
          </div>
        </div>

        {/* Files Section */}

        {/* Phần Emoji Picker và Comment Input không thay đổi */}
        <div className="mb-4 px-6 absolute bottom-0 w-full">
          <div>
            {/* Hiển thị các tệp đã chọn */}
            {selectedFiles.length > 0 && (
              <div className="mb-4 flex flex-wrap">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 mb-2 mr-2 border rounded p-2"
                  >
                    {/* Hiển thị file icon hoặc hình ảnh */}
                    {isImage(file) ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="text-lg">{getFileIcon(file.name)}</div>
                    )}
                    <span>{file.name}</span>
                    <div className="text-gray-500 text-sm">
                      {formatFileSize(file.size)}
                    </div>
                    <button
                      className="text-red-500"
                      onClick={() => removeFile(index)} // Xóa tệp khi nhấn "X"
                    >
                      ✖️
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Thay đổi nút chọn file thành icon */}
          </div>
          <div className="flex items-center">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full bg-gray-50 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a comment"
            />
            {newComment.trim() === "" && selectedFiles.length === 0 ? (
              <button
                className=" text-gray-400 px-4 py-2 rounded-full ml-3 focus:outline-none"
                disabled
              >
                <IoMdSend size={30} />
              </button>
            ) : (
              <button
                className=" text-black px-4 py-2 rounded-full ml-3 focus:outline-none"
                onClick={handleSendComment}
              >
                <IoMdSend size={30} />
              </button>
            )}
            {/* Emoji Picker Toggle */}
            <label htmlFor="file-upload" className="cursor-pointer text-xl">
              <FaFileUpload />
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              className="ml-3 focus:outline-none"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <FaSmile className="text-2xl text-gray-600" />
            </button>
            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div
                className="top-0 right-10 -translate-y-full"
                style={{ position: "absolute", zIndex: 20 }}
              >
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailTask;
