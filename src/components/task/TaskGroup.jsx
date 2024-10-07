import TaskListItem from "./TaskListItem";
import { useState } from "react";
import Button from "../Button";
import { useParams } from "react-router-dom";
import AddTask from "./AddTask";

const TaskGroup = ({ phanduan, duAn }) => {
  const [open, setOpen] = useState(false);
  const [taskRoot, setTaskRoot] = useState(false);
  const { id } = useParams();
  return (
    <div className="w-full bg-transparent border-b-1">
      <div className="p-4 w-full flex items-center justify-between font-semibold bg-white text-gray-600 mb-2 mt-4 shadow-sm border-y text-sm">
      <span>{phanduan.tenPhan}</span>
        <Button
          onClick={() => setOpen(true)}
          label="Tạo công việc"
          className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 px-3 text-xs"
        />
       
      </div>

      {/* Phần danh sách công việc luôn hiển thị */}
      <div className="bg-slate-50 shadow-md">
        {phanduan.congViecs.map((item) => {
           return <TaskListItem key={item.maCongViec} duAn={duAn} congviec={item} />;
        })}
      </div>

      <AddTask open={open} setOpen={setOpen} phanDuAn={phanduan.maPhanDuAn} duAn={duAn} congViecCha={taskRoot} />
    </div>
  );
};

export default TaskGroup;
