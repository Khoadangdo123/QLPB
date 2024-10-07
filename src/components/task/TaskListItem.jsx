import { BiCalendar, BiPlus } from "react-icons/bi";
import { BGS, formatDate } from "../../utils";
import Selection from "../Selection";
import UserInfo from "../UserInfo";
import clsx from "clsx";
import Button from "../Button";
import AddTask from "./AddTask";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import DetailTask from "./DetailTask";
import { useDispatch, useSelector } from "react-redux";
import { fetchByIdTask } from "../../redux/task/taskSlice";
import EmployeeInfo from "../EmployeeInfo";

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

const TaskListItem=({congviec,duAn})=> {
  const [open, setOpen] = useState(false);
  const [taskRoot,setTaskRoot]=useState(false);
  const [expanded, setExpanded] = useState(false);
  const [subTasks, setSubTasks] = useState([]);
  const dispatch=useDispatch();
  const maCongViec=congviec.maCongViec
  const phancong=useSelector((state) =>
    state.tasks.list.find((task) => task.maCongViec === maCongViec)
  );
  useEffect(()=>{
    dispatch(fetchByIdTask(maCongViec))
  },[maCongViec])
  const handleToggleDetail = () => {
    setExpanded(!expanded);
  };
  const chiuTrachNhiem = phancong?.phanCongs?.filter(m => m.vaiTro === "Người Chịu Trách Nhiệm");
  const thucHien = phancong?.phanCongs?.filter(m => m.vaiTro === "Người Thực Hiện");
  const handleAddSubTask = (newSubTask) => {
    setSubTasks([...subTasks, newSubTask]);
    setOpen(false);
  };
  return (
    <div className="w-full flex items-center  px-4">
      <div className="w-full flex py-2 border-b text-sm" >
        <div className="flex-1 w-1/4 px-4 truncate cursor-pointer"  onClick={handleToggleDetail} >{congviec.maCongViecCha ? (
            <span className="text-gray-500">🔹 {congviec.tenCongViec}</span>
          ) : (
            <span>{congviec.tenCongViec}</span>
          )}</div>
        <div className="flex-1 w-1/5 px-4 ">
          {/* <Selection items={priorities} selectedItem={congviec.mucDoUuTien} /> */}
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
            <EmployeeInfo employee={m}/>
            </div>
          ))}
          <button onClick={()=>{alert("assign")}} className="rounded-full border-2 border-dashed size-fit p-1 ml-2 border-gray-400 text-gray-400"><BiPlus/></button>
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
            <EmployeeInfo employee={m}/>
            </div>
          ))}
          <button onClick={()=>{alert("assign")}} className="rounded-full border-2 border-dashed size-fit p-1 ml-2 border-gray-400 text-gray-400"><BiPlus/></button>
        </div>
        <div className="flex-1 px-4 ">
          <Selection items={stages} selectedItem={congviec.trangThaiCongViec}/>
        </div>
        
        <div className="flex-1 px-4 flex justify-end">
          <Button
              onClick={() => {
                setTaskRoot(congviec.maCongViec);
                setOpen(true);
              }}
              label='Tạo Công Việc Con'
              icon={<IoMdAdd className='text-lg' />}
              className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-0.5 px-1 text-xs'
              style={{ height: '28px', fontSize: '12px' }}
            />
        </div>
      </div>
      <AddTask open={open} setOpen={setOpen} phanDuAn={congviec.maPhanDuAn} duAn={duAn} congViecCha={taskRoot} />
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
}
export default TaskListItem;
