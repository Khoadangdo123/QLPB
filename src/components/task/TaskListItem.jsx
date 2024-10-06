import { BiCalendar, BiPlus } from "react-icons/bi";
import { BGS, formatDate } from "../../utils";
import Selection from "../Selection";
import UserInfo from "../UserInfo";
import clsx from "clsx";
import Button from "../Button";
import AddTask from "./AddTask";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

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

const TaskListItem=({congviec})=> {
  const [open, setOpen] = useState(false);
  const [taskRoot,setTaskRoot]=useState(false);
  console.log(congviec)
  return (
    <div className="w-full flex items-center  px-4">
      <div className="w-full flex py-2 border-b">
        <div className="flex-1 px-4 truncate ">{congviec.tenCongViec}</div>
        <div className="flex-1 px-4 ">
          <Selection items={priorities} selectedItem={congviec.mucDoUuTien} />
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
        {/* <div className="flex-1 px-4 flex items-center">
          {task?.team?.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS?.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
          <button onClick={()=>{alert("assign")}} className="rounded-full border-2 border-dashed size-fit p-1 ml-2 border-gray-400 text-gray-400"><BiPlus/></button>
        </div> */}
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
              className='flex flex-row-reverse gap-.5 items-center bg-blue-600 text-white rounded-md py-1 px-2 text-sm'
            />
        </div>
      </div>
      <AddTask open={open} setOpen={setOpen} phanDuAn={congviec.maPhanDuAn} congViecCha={taskRoot} />
    </div>
  );
}
export default TaskListItem;
