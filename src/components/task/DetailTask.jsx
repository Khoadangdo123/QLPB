// DetailTask.jsx
import React, { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Picker from "emoji-picker-react";
import { FaSmile } from "react-icons/fa";
import { FaPaperclip } from "react-icons/fa";
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
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7131/hub")
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    newConnection
      .start()
      .then(() => {
        console.log("Connected!");
        setConnection(newConnection);

        // Tham gia nhóm
        newConnection
          .invoke("ThamGiaNhom", maCongViec)
          .then(() => {
            console.log(`Joined group: ${maCongViec}`);
          })
          .catch((err) => console.error("Error joining group: ", err));
        //newConnection.off("ReceiveMessage");
        newConnection.on("ReceiveMessage", (user, message) => {
          const newMessage = { user, message };
          console.log(newMessage);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          console.log(newMessage);
        });
        newConnection.on("UserJoined", (message) => {
          console.log(message);
        });
      })
      .catch((err) => console.error("Connection failed: ", err));
    return () => {
      if (newConnection) {
        newConnection.stop();
        console.log("Connection stopped.");
      }
    };
  }, [maCongViec]);
  const handleSendComment =async () => {
    if (newComment.trim() === "") return;
    // if (connection && connection.state === "Connected") {
    //   connection
    //     .invoke(
    //       "TraoDoiThongTin",
    //       maCongViec,
    //       localStorage.getItem("name"),
    //       newComment
    //     )
    //     .then(() => {
    //       setNewComment("");
    //       console.log("reconnection");
    //     })
    //     .catch((err) => console.error("Error sending message: ", err));
    // } else {
    //   console.error("Connection is not established.");
    // }
    //setLoading(true);
    const messageContent = selectedFile ? `Uploaded file: ${selectedFile.name}` : newComment;

    try {
      await connection.invoke("TraoDoiThongTin", maCongViec, localStorage.getItem("name"), messageContent);
      setNewComment("");
      setSelectedFile(null);
      setShowEmojiPicker(false);
    } catch (err) {
      console.error("Error sending message: ", err);
      setErrorMessage("Failed to send message.");
    } finally {
      //setLoading(false);
    }
  };
  const onEmojiClick = (emoji) => {
    setNewComment((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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
        <div className="flex justify-end p-4">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setExpanded(false)}
          >
            ✖️
          </button>
        </div>

        {/* Task Title */}
        <div className="mb-4 px-6">
          <h2 className="text-2xl font-semibold text-gray-800">{titleTask}</h2>
        </div>
        {/* Assignee and Due Date */}
        <div className="mb-4 px-6 flex justify-between items-center">
          <div className="flex items-center">
            {roleTeam.map((member, index) => (
              <div
                key={index}
                className="rounded-full h-10 w-10 bg-purple-600 flex items-center justify-center text-xl text-white mr-2"
              >
                {member.nhanVien?.tenNhanVien.slice(0, 2)}
              </div>
            ))}
            <span className="ml-3 text-gray-700">
              {roleTeam[0]?.nhanVien?.email}
            </span>
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
            className="w-full bg-gray-50 p-3 mt-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What is this task about?"
            rows="3"
            value={task.moTa}
            readOnly
          ></textarea>
        </div>

        {/* Comments Section */}
        <div className="mb-4 px-6">
          <div
            className="bg-gray-50 p-4 rounded border border-gray-200"
            style={{ maxHeight: "200px", overflowY: "auto" }} // Thanh trượt
          >
            {messages.map((comment, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="rounded-full h-8 w-8 bg-purple-500 flex items-center justify-center text-xs text-white">
                      {comment.user.slice(0, 2)}
                    </div>
                    <span className="ml-3 text-gray-700">{comment.user}</span>
                  </div>
                  {/* <span className="text-sm text-gray-500">{comment.date}</span> */}
                </div>
                <p className="ml-11 text-gray-600">{comment.message}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4 px-6">
          <div className="flex items-center">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full bg-gray-50 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a comment"
            />
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full ml-3 focus:outline-none"
              onClick={handleSendComment}
            >
              Send
            </button>
            {/* Emoji Picker Toggle */}
            <button
              className="ml-3 focus:outline-none"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <FaSmile className="text-2xl text-gray-600" />
            </button>
            <label className="ml-3 cursor-pointer">
              <FaPaperclip className="text-2xl text-gray-600" />
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            </label>
            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div style={{ position: "absolute", zIndex: 20 }}>
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>
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
                <div
                  style={{
                    cursor: "pointer",
                  }}
                  className="rounded-full h-8 w-8 bg-gray-400 flex items-center justify-center text-xs text-white"
                >
                  +
                </div>
              </div>
            </div>
            {/* <button className="text-gray-600 hover:text-red-500 flex items-center focus:outline-none">
							<span className="mr-1">Leave task</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M4 5a3 3 0 013-3h6a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V5zm7.293 2.293a1 1 0 00-1.414 1.414L10.586 10l-1.707 1.707a1 1 0 001.414 1.414L12 11.414l1.707 1.707a1 1 0 001.414-1.414L13.414 10l1.707-1.707a1 1 0 00-1.414-1.414L12 8.586 10.293 6.707z"
									clipRule="evenodd"
								/>
							</svg>
						</button> */}
          </div>
        </div>
        {/* Footer Actions */}
        <div className="px-6 pb-6 flex justify-between items-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full focus:outline-none"
            onClick={() => setExpanded(false)}
          >
            Cancel
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full focus:outline-none">
            Mark Complete
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailTask;
