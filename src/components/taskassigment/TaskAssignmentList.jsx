import { useEffect, useState } from "react";
import { BiCalendar, BiCheck, BiPlus } from "react-icons/bi";
import clsx from "clsx";
import EmployeeInfo from "../EmployeeInfo";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchByIdTask } from "../../redux/task/taskSlice";
import DetailTask from "../task/DetailTask";
import { BGS, formatDate } from "../../utils";
import { updateAssignment } from "../../redux/assignment/assignmentSlice";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { addTaskHistory } from "../../redux/taskhistory/taskhistorySlice";
import FileUpload from "./FileUpload";
import { IoMdCloudUpload, IoMdImage } from "react-icons/io";
import FileUploadModal from "./FileUploadModal";
import { fetchAllFile } from "../../redux/file/fileSlice";
import {
  AiFillFile,
  AiOutlineFileZip,
  AiFillDelete,
  AiOutlineDownload,
} from "react-icons/ai";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFileArchive,
  FaFileCode,
  FaFileAlt,
  FaFile,
} from "react-icons/fa";
import FileViewer from "./FileViewer";
const TaskAssignmentList = ({ congviec }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [completed, setCompleted] = useState(congviec.trangThaiCongViec);
  const [connection, setConnection] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState("");
  const dispatch = useDispatch();
  const maCongViec = congviec.maCongViec;
  const vaiTro = congviec.vaiTro;
  const maPhanCong = congviec.maPhanCong;
  const phancong = useSelector((state) =>
    state.tasks.list.find((task) => task.maCongViec === maCongViec)
  );
  const file = useSelector((state) => state.file.list);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(fetchByIdTask(maCongViec));
        await dispatch(fetchAllFile());
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };

    if (maCongViec) {
      fetchData();
    }
  }, [maCongViec, dispatch]);
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7131/hub")
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    setConnection(newConnection);
  }, []);
  useEffect(() => {
    const startConnection = async () => {
      if (connection && connection.state === "Disconnected") {
        try {
          await connection.start();
          console.log("Connection started");
          connection.on("loadPhanCong", async () => {
            setLoading(true);
            await dispatch(fetchByIdTask(maCongViec));
            setLoading(false);
            console.log("Mai Văn Tài");
          });
          //
          connection.on("loadCongViec", async () => {
            setLoading(true);
            await dispatch(fetchByIdTask(maCongViec));
            setLoading(false);
            console.log("Mai Văn Tài");
          });
          //
          // connection.on("task",async (message)=>{
          //     console.log("task")
          //     alert(message)
          // })
        } catch (err) {
          console.error("Error while starting connection: ", err);
        }
      }
    };

    if (connection) {
      startConnection();
    }

    return () => {
      if (connection) {
        connection.off("loadCongViec");
      }
    };
  }, [connection, dispatch, maCongViec]);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
        }}
      >
        <div
          style={{
            border: "4px solid rgba(0, 0, 0, 0.1)",
            borderLeftColor: "#3b82f6",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            animation: "spin 1s linear infinite",
          }}
        />
      </div>
    );
  }
  if (!phancong) {
    return <p>not found</p>;
  }
  const handleToggleDetail = () => {
    setExpanded(!expanded);
  };
  const handleDownloadFile =async (filePath,fileName) => {
    try {
      const response = await fetch(filePath);
      
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  } catch (error) {
      console.error("Error downloading file:", error);
  }
  };
  const handleViewFile = (filePath) => {
    setSelectedFileUrl(filePath);
    setIsViewerOpen(true);
  };
  const handleDeleteFile = async (fileId) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa file này?");
    if (isConfirmed) {
      try {
        await dispatch(deleteFile(fileId));
        await dispatch(fetchAllFile());
        alert("Xóa file thành công");
      } catch (error) {
        console.error("Error deleting file:", error);
        alert("Có lỗi xảy ra khi xóa file");
      }
    }
  };
  const handleRemoveFile = (fileName) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  const handleCheckboxChange = async (event) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn đánh dấu công việc đã hoàn thành?"
    );
    if (isConfirmed) {
      const checked = event.target.checked;
      setCompleted(checked);
      let PhanCong = {
        maCongViec: maCongViec,
        maNhanVien: Number(localStorage.getItem("userId")),
        vaiTro: vaiTro,
        trangThaiCongViec: checked,
      };
      try {
        await dispatch(
          updateAssignment({ id: maPhanCong, assignment: PhanCong })
        );
        await dispatch(
          addTaskHistory({
            maCongViec: PhanCong.maCongViec,
            ngayCapNhat: new Date().toISOString(),
            noiDung: `${new Date().toISOString()}: Nhân Viên ${localStorage.getItem(
              "name"
            )} đã hoàn thành nhiệm vụ được giao của công việc ${
              phancong.tenCongViec
            }`,
          })
        );
        console.log("Updateeeeee");
      } catch (e) {
        console.error("Error updating assignment:", error);
        alert("Có lỗi xảy ra trong quá trình cập nhật.");
      }
    } else {
      event.target.checked = !event.target.checked;
    }
  };
  const chiuTrachNhiem = phancong?.phanCongs?.filter(
    (m) => m.vaiTro === "Người Chịu Trách Nhiệm"
  );
  const thucHien = phancong?.phanCongs?.filter(
    (m) => m.vaiTro === "Người Thực Hiện"
  );
  return (
    <div className="w-full flex items-center  px-4">
      <div className="w-full flex py-2 border-b text-sm">
        <div
          className="flex-1 w-2/12 px-4 truncate text-left cursor-pointer"
          onClick={handleToggleDetail}
        >
          <span className="line-clamp-2">{phancong.tenCongViec}</span>
        </div>
        {/* <div className="flex-1 w-2/12 px-4 text-left">
          <span>{phancong.moTa}</span>
        </div> */}
        <div className="flex-1 w-1/12 px-4 text-center">
          <span>{phancong.mucDoUuTien}</span>
        </div>
        <div className="flex-1 w-1/12 px-4 text-center">
          {phancong.thoiGianBatDau ? (
            formatDate(new Date(phancong.thoiGianBatDau))
          ) : (
            <div className="p-1 w-fit border-2 border-dashed rounded-full border-gray-400">
              <BiCalendar size={20} />
            </div>
          )}
        </div>
        <div className="flex-1 w-1/12 px-4 text-center">
          {phancong.thoiGianKetThuc ? (
            formatDate(new Date(phancong.thoiGianKetThuc))
          ) : (
            <div className="p-1 w-fit border-2 border-dashed rounded-full border-gray-400">
              <BiCalendar size={20} />
            </div>
          )}
        </div>
        <div className="flex-1 w-2/12 px-4 flex items-center justify-center">
          {chiuTrachNhiem?.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS?.length]
              )}
            >
              <EmployeeInfo employee={m} />
            </div>
          ))}
        </div>
        <div className="flex-1 w-2/12 px-4 flex items-center justify-center">
          {thucHien?.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS?.length]
              )}
            >
              <EmployeeInfo employee={m} />
            </div>
          ))}
        </div>
        <div className="flex-1 w-1/12 px-4 text-center">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleCheckboxChange}
            className="w-6 h-6"
          />
        </div>
        <div className="flex-1 w-1/12 px-4 text-center">
          <Button
            onClick={() => setIsModalOpen(true)}
            icon={<IoMdCloudUpload className="text-lg" />}
            className="flex flex-row-reverse items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Tải lên
          </Button>
          <div className="flex flex-col w-full">
            {file.length > 0 && (
              <ul className="mt-2 ml-4 list-disc">
                {file.map((file, index) => {
                  const extension = file.loaiFile;
                  const { icon, color } = getFileIcon(`.${extension}`);

                  return (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-700 text-sm"
                    >
                      <span className={`${color}`}>{icon}</span>{" "}
                      <a
                        // href={file.duongDan}
                        // target="_blank"
                        // rel="noopener noreferrer"
                        className="ml-2 w-48 overflow-hidden whitespace-nowrap text-ellipsis"
                      >
                        {file.tenFile}
                      </a>
                      <AiFillDelete
                          size={20}
                          onClick={() => handleDeleteFile(file.id)}
                          className="text-red-500 cursor-pointer ml-2"
                        />
                        <AiOutlineDownload
                        size={20}
                          onClick={() => handleDownloadFile(file.duongDan,file.tenFile)}
                          className="text-blue-500 cursor-pointer"
                        />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
      {expanded && (
        <DetailTask
          expanded={expanded}
          setExpanded={setExpanded}
          task={phancong}
          titleTask={phancong.tenCongViec}
          date={formatDate(new Date(phancong.thoiGianKetThuc))}
          roleTeam={chiuTrachNhiem}
          userTeam={thucHien}
        />
      )}
      <FileUpload
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
      {/* <FileViewer
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        fileUrl={selectedFileUrl}
      /> */}
    </div>
  );
};
const getFileIcon = (extension) => {
  const iconSize = 24;
  switch (extension.toLowerCase()) {
    case ".pdf":
      return { icon: <FaFilePdf size={iconSize} />, color: "text-red-500" };
    case ".doc":
    case ".docx":
      return { icon: <FaFileWord size={iconSize} />, color: "text-blue-600" };
    case ".xls":
    case ".xlsx":
      return { icon: <FaFileExcel size={iconSize} />, color: "text-green-500" };
    case ".jpg":
    case ".jpeg":
    case ".png":
      return {
        icon: <FaFileImage size={iconSize} />,
        color: "text-yellow-500",
      };
    case ".zip":
    case ".rar":
      return {
        icon: <FaFileArchive size={iconSize} />,
        color: "text-purple-500",
      };
    case ".txt":
      return { icon: <FaFileAlt size={iconSize} />, color: "text-gray-500" };
    case ".sql":
      return { icon: <FaFileCode size={iconSize} />, color: "text-orange-500" };
    case ".mpp":
      return { icon: <FaFile size={iconSize} />, color: "text-blue-500" };
    default:
      return { icon: <AiFillFile size={iconSize} />, color: "text-gray-500" };
  }
};

export default TaskAssignmentList;
