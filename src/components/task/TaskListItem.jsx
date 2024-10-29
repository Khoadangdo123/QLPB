import { BiCalendar, BiPlus } from "react-icons/bi";
import { BGS, formatDate } from "../../utils";
import Selection from "../Selection";
import UserInfo from "../UserInfo";
import clsx from "clsx";
import Button from "../Button";
import AddTask from "./AddTask";
import { useEffect, useState } from "react";
import { IoMdAdd, IoMdCreate, IoMdSwap, IoMdTime, IoMdTrash } from "react-icons/io";
import DetailTask from "./DetailTask";
import { useDispatch, useSelector } from "react-redux";
import { fetchByIdTask } from "../../redux/task/taskSlice";
import EmployeeInfo from "../EmployeeInfo";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import UpdateTask from "./UpdateTask";
import AddTaskTransfer from "../tasktransfer/AddTaskTransfer";
import TaskHistory from "./TaskHistory";
const priorities = [
  { id: "low", name: "Thấp" },
  { id: "medium", name: "Trung Bình" },
  { id: "high", name: "Cao" },
];

const stages = [
  { id: "todo", name: "Cần Làm" },
  { id: "in_progress", name: "Đang làm" },
  { id: "done", name: "Hoàn thành" },
];

const TaskListItem = ({ congviec, duAn }) => {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openTransfer, setOpenTransfer] = useState(false);
  const [openTaskHistory, setOpenTaskHistory] = useState(false);
  const [taskRoot, setTaskRoot] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [subTasks, setSubTasks] = useState([]);
  const [connection, setConnection] = useState(null);
  const dispatch = useDispatch();
  const maCongViec = congviec.maCongViec;
  const phancong = useSelector((state) =>
    state.tasks.list.find((task) => task.maCongViec === maCongViec)
  );
  useEffect(() => {
    dispatch(fetchByIdTask(maCongViec));
  }, [maCongViec]);
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7131/hub")
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    setConnection(newConnection);
  }, []);
  useEffect(() => {
    if (connection && connection.state === "Disconnected") {
      connection
        .start()
        .then(() => {
          console.log("Connected!");
          connection.on("updateCongViec", () => {
            if (maCongViec) {
              dispatch(fetchByIdTask(maCongViec));
            }
          });
          connection.on("loadPhanCong", () => {
            if (maCongViec) {
              dispatch(fetchByIdTask(maCongViec));
            }
          });
        })
        .catch((error) => console.error("Connection failed: ", error));
    }
  }, [connection, maCongViec, dispatch]);
  const handleToggleDetail = () => {
    setExpanded(!expanded);
  };
  const chiuTrachNhiem = phancong?.phanCongs?.filter(
    (m) => m.vaiTro === "Người Chịu Trách Nhiệm"
  );
  const thucHien = phancong?.phanCongs?.filter(
    (m) => m.vaiTro === "Người Thực Hiện"
  );
  const congViecHoanThanh =
    phancong?.phanCongs?.filter((task) => task.trangThaiCongViec === true)
      .length ?? 0;
  const tongCongViec = phancong?.phanCongs?.length || 1;
  const completionPercent = (congViecHoanThanh / tongCongViec) * 100;
  //
  const handleAddSubTask = (newSubTask) => {
    setSubTasks([...subTasks, newSubTask]);
    setOpen(false);
  };
  const isParentTask = (task) => {
    return !task.maCongViecCha;
  };
  const hasSubTasks = (task) => {
    return task.congViecCon && task.congViecCon.length > 0;
  };
  const getCompletionColor = (percent) => {
    if (percent < 50) {
      return "bg-red-600";
    } else if (percent >= 50 && percent < 80) {
      return "bg-yellow-500";
    } else {
      return "bg-green-500";
    }
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };
  const itemClass = isParentTask(congviec)
    ? hasSubTasks(congviec)
      ? "font-bold text-blue-600 bg-blue-100"
      : "font-bold bg-blue-200"
    : "pl-6 bg-gray-100";
    //console.log(completionPercent)
  return (
    <div
      className={`w-full flex items-center px-4 ${
        isParentTask(congviec) ? "" : "ml-4"
      }`}
    >
      <div className={`w-full flex py-1 border-b text-sm ${itemClass}`}>
        <div
          className={`flex-1 w-1/4 px-4 truncate cursor-pointer ${
            isParentTask(congviec) ? "font-bold" : "pl-4"
          }`}
          onClick={handleToggleDetail}
        >
          {isParentTask(congviec) ? (
            <span className="text-gray-500 break-words">
              🔹 {congviec.tenCongViec}
            </span>
          ) : (
            <span className="break-words">{congviec.tenCongViec}</span>
          )}
          {/* Phần trăm tiến độ */}

          <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
            <div
              className={`${getCompletionColor(
                completionPercent
              )} h-4 rounded-full`}
              style={{ width: `${completionPercent}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-500">
            {completionPercent.toFixed(2)}% Hoàn thành
          </span>
        </div>

        <div className="flex-1 w-1/5 px-4 ">
          <span>{congviec.mucDoUuTien}</span>
        </div>
        <div className="flex-1 px-4 text-gray-400 flex items-center">
          <button
            className="hover:bg-gray-200 rounded-full px-2"
            onClick={() => {
              alert("show calendar");
            }}
          >
            {congviec.thoiGianKetThuc ? (
              formatDate(new Date(congviec.thoiGianKetThuc))
            ) : (
              <div className="p-1 w-fit border-2 border-dashed rounded-full border-gray-400">
                <BiCalendar size={20} />
              </div>
            )}
          </button>
        </div>
        <div className="flex-1 px-4 flex items-center">
          {chiuTrachNhiem?.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS?.length]
              )}
            >
              {/* <UserInfo user={m} /> */}
              <EmployeeInfo employee={m} />
            </div>
          ))}
          <button
            onClick={() => {
              alert("assign");
            }}
            className="rounded-full border-2 border-dashed size-fit p-1 ml-2 border-gray-400 text-gray-400"
          >
            <BiPlus />
          </button>
        </div>
        <div className="flex-1 px-4 flex items-center">
          {thucHien?.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS?.length]
              )}
            >
              {/* <UserInfo user={m} /> */}
              <EmployeeInfo employee={m} />
            </div>
          ))}
          <button
            onClick={() => {
              alert("assign");
            }}
            className="rounded-full border-2 border-dashed size-fit p-1 ml-2 border-gray-400 text-gray-400"
          >
            <BiPlus />
          </button>
        </div>
        <div className="flex-1 px-4 ">
          <Selection items={stages} selectedItem={congviec.trangThaiCongViec} />
        </div>

        <div className="flex-1 px-4 flex flex-wrap justify-end items-center gap-2">
          <Button
            onClick={() => {
              setTaskRoot(congviec.maCongViec);
              setOpen(true);
            }}
            //label="Tạo CV" // Rút ngắn văn bản nếu cần
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse items-center bg-blue-600 text-white rounded-md py-0.5 px-1.5 text-xs h-8 gap-0.5" // Giảm padding và xác định chiều cao
          />
          <Button
            onClick={() => {
              //setTaskRoot(congviec.maCongViec);
              setOpenUpdate(true);
            }}
            //label="Sửa CV" // Rút ngắn văn bản nếu cần
            icon={<IoMdCreate className="text-lg" />}
            className="flex flex-row-reverse items-center bg-blue-600 text-white rounded-md py-0.5 px-1.5 text-xs h-8 gap-0.5" // Giảm padding và xác định chiều cao
          />
          <Button
            onClick={() => {
              //setTaskRoot(congviec.maCongViec);
              //setOpenUpdate(true);
            }}
            //label="Xóa CV" // Rút ngắn văn bản nếu cần
            icon={<IoMdTrash className="text-lg" />}
            className="flex flex-row-reverse items-center bg-blue-600 text-white rounded-md py-0.5 px-1.5 text-xs h-8 gap-0.5" // Giảm padding và xác định chiều cao
          />
          <Button
            onClick={() => {
              //setTaskRoot(congviec.maCongViec);
              //setOpenUpdate(true);
              setOpenTransfer(true)
              
            }}
            //label="Xóa CV" // Rút ngắn văn bản nếu cần
            icon={<IoMdSwap className="text-lg" />}
            className="flex flex-row-reverse items-center bg-blue-600 text-white rounded-md py-0.5 px-1.5 text-xs h-8 gap-0.5" // Giảm padding và xác định chiều cao
          />
          <Button
            onClick={() => {
              //setTaskRoot(congviec.maCongViec);
              //setOpenUpdate(true);
              setOpenTaskHistory(true)
              
            }}
            //label="Xóa CV" // Rút ngắn văn bản nếu cần
            icon={<IoMdTime className="text-lg" />}
            className="flex flex-row-reverse items-center bg-blue-600 text-white rounded-md py-0.5 px-1.5 text-xs h-8 gap-0.5" // Giảm padding và xác định chiều cao
          />
        </div>
      </div>
      <AddTask
        open={open}
        setOpen={setOpen}
        phanDuAn={congviec.maPhanDuAn}
        duAn={duAn}
        congViecCha={taskRoot}
      />
      <UpdateTask
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        phanDuAn={congviec.maPhanDuAn}
        duAn={duAn}
        maCongViec={congviec.maCongViec}
        task={congviec}
        phanCong={phancong}
      />
      <AddTaskTransfer
      openTransfer={openTransfer}
      setOpenTransfer={setOpenTransfer}
      maCongViec={maCongViec}
      tenCongViec={congviec.tenCongViec}
      maPhongBan={null}
      currentEmployee={phancong?.phanCongs}
      />
      <TaskHistory
      openTaskHistory={openTaskHistory}
      setOpenTaskHistory={setOpenTaskHistory}
      maCongViec={maCongViec}
      />
      {expanded && (
        <DetailTask
          expanded={expanded}
          setExpanded={setExpanded}
          task={congviec}
          titleTask={congviec.tenCongViec}
          date={formatDate(new Date(congviec.thoiGianKetThuc))}
          roleTeam={chiuTrachNhiem}
          userTeam={thucHien}
        />
      )}
    </div>
  );
};
export default TaskListItem;
