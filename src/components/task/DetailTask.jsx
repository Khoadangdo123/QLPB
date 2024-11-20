// DetailTask.jsx
import React, { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Picker from "emoji-picker-react";
import { FaFileUpload, FaSmile } from "react-icons/fa";
import { FaPaperclip } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import API_ENDPOINTS from "../../constant/linkapi";
import { format } from "date-fns";
import {
  FaFileAlt,
  FaFilePdf,
  FaFileImage,
  FaFileWord,
  FaFileExcel,
  FaFileVideo,
} from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { findExchangeByTask } from "../../redux/exchange/exchangeSlice";
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
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const dispatch = useDispatch();
  const exchanges = useSelector((state) => state.exchanges.list);
  const files=useSelector((state)=>state.file)
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await dispatch(findExchangeByTask(task.maCongViec));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [dispatch, task.maCongViec]);
  console.log(exchanges);
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
          var date = new Date()
            .toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })
            .toString();
          const newMessage = { user, message, date };
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
              <span style="margin-right: 8px;">${getSendFileIcon(
                file.extension
              )}</span>
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
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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
        <div className="mb-3 px-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            Tên Công Việc: {titleTask}
          </h3>
        </div>

        {/* Assignee and Due Date */}
        <div className="mb-1 px-6 flex justify-between items-center">
          <div className="mb-6 px-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-gray-700 text-sm font-medium">
                  Chịu Trách Nhiệm
                </span>
                <div className="flex space-x-2 ml-3">
                  {roleTeam.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-sm"
                    >
                      <span>{member.nhanVien?.tenNhanVien || "Unknown"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
              <span className="text-gray-700 font-medium text-sm">
                Thành Viên
              </span>
              <div className="flex space-x-2 ml-3">
                {userTeam.map((m, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium"
                  >
                    <span className="mr-2">
                      {m.nhanVien?.tenNhanVien || "Tên chưa có"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 px-6 bg-gray-300">
          <div
            className="rounded border-t-2"
            style={{ maxHeight: "250px", overflowY: "auto" }}
          >
            <div className="py-2">
              {exchanges.map((comment, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 border rounded-md ${
                    comment.maNhanVien ===
                    Number(localStorage.getItem("userId"))
                      ? "bg-blue-100 text-white ml-auto"
                      : "bg-gray-50 text-black"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="rounded-full h-8 w-8 bg-purple-500 flex items-center justify-center text-xs text-white">
                        {comment.tenNhanVien
                          ? comment.tenNhanVien
                              .split(" ")
                              .map((name) => name[0])
                              .join("")
                          : "N/A"}
                      </div>
                      <span className="ml-3 text-black text-sm">
                        {comment.tenNhanVien === localStorage.getItem("name") &&
                        comment.maNhanVien ===
                          Number(localStorage.getItem("userId"))
                          ? "Bạn"
                          : comment.tenNhanVien}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {format(
                        new Date(comment.thoiGianGui),
                        "dd/MM/yyyy HH:mm:ss"
                      )}
                    </span>
                  </div>
                  <p className="ml-11 text-gray-600 text-sm">
                    {comment.noiDungTraoDoi}
                  </p>
                  {/* {comment.chiTietTraoDoiThongTins &&
                    comment.chiTietTraoDoiThongTins.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {comment.chiTietTraoDoiThongTins.map(
                          (fileDetail, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-2"
                            >
                              {fileDetail.Files &&
                              fileDetail.Files.LoaiFile.startsWith("image/") ? (
                                <div className="relative group">
                                  <img
                                    src={fileDetail.Files.DuongDan}
                                    alt={fileDetail.Files.TenFile}
                                    className="max-w-xs rounded-md cursor-pointer"
                                  />
                                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-1 rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity">
                                    Xem hình ảnh
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center bg-gray-100 p-2 rounded-md shadow-sm w-max">
                                  <a
                                    href={fileDetail.Files.DuongDan}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
                                  >
                                    <span className="material-icons text-sm">
                                      file_download
                                    </span>
                                    <span className="text-sm">
                                      {fileDetail.Files.TenFile}
                                    </span>
                                  </a>
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    )} */}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-4 px-6 absolute bottom-0 w-full ">
          <div>
            {/* Hiển thị các tệp đã chọn */}
            {selectedFiles.length > 0 && (
              <div className="mb-4 flex flex-wrap max-h-28 overflow-auto">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 mb-2 mr-2 border rounded p-2 bg-gray-100 hover:bg-gray-200"
                    style={{ maxWidth: "calc(33% - 0.5rem)" }}
                  >
                    {/* Hiển thị file icon hoặc hình ảnh */}
                    {isImage(file) ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    ) : (
                      <div className="text-lg text-gray-600">
                        {getFileIcon(file.name)}
                      </div>
                    )}
                    <div className="flex flex-col justify-center">
                      <span className="text-sm text-gray-800">{file.name}</span>
                      <div className="text-xs text-blue-400">
                        {formatFileSize(file.size)}
                      </div>
                    </div>
                    <button
                      className="text-red-500 text-xs px-2 py-1 rounded-full"
                      onClick={() => removeFile(index)}
                    >
                      ✖️
                    </button>
                  </div>
                ))}
              </div>
            )}
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
