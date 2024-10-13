// import TaskListItem from "./TaskListItem";
// import { useState } from "react";
// import Button from "../Button";
// import { useParams } from "react-router-dom";
// import AddTask from "./AddTask";

import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../Button";
import AddTask from "./AddTask";
import TaskListItem from "./TaskListItem"
// const TaskGroup = ({ phanduan, duAn }) => {
//   const [open, setOpen] = useState(false);
//   const [taskRoot, setTaskRoot] = useState(false);
//   const { id } = useParams();
//   return (
//     <div className="w-full bg-transparent border-b-1">
//       <div className="p-4 w-full flex items-center justify-between font-semibold bg-white text-gray-600 mb-2 mt-4 shadow-sm border-y text-sm">
//       <span>{phanduan.tenPhan}</span>
//         <Button
//           onClick={() => setOpen(true)}
//           label="Tạo công việc"
//           className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 px-3 text-xs"
//         />
       
//       </div>
//       {/* Phần danh sách công việc luôn hiển thị */}
//       <div className="bg-slate-50 shadow-md">
//         {phanduan.congViecs.map((item) => {
//            return <TaskListItem key={item.maCongViec} duAn={duAn} congviec={item} />;
//         })}
//       </div>

//       <AddTask open={open} setOpen={setOpen} phanDuAn={phanduan.maPhanDuAn} duAn={duAn} congViecCha={taskRoot} />
//     </div>
//   );
// };

// export default TaskGroup;
const TaskGroup = ({ phanduan, duAn }) => {
  const [open, setOpen] = useState(false);
  const [taskRoot, setTaskRoot] = useState(false);
  const { id } = useParams();

  // Hàm để phân loại công việc thành công việc cha và con
  const getTasksTree = (tasks) => {
    const taskMap = new Map();

    // Tạo map để ánh xạ công việc theo maCongViec
    tasks.forEach(task => {
      taskMap.set(task.maCongViec, { ...task, subTasks: [] });
    });

    // Xây dựng cấu trúc cha-con
    tasks.forEach(task => {
      if (task.maCongViecCha) {
        const parent = taskMap.get(task.maCongViecCha);
        if (parent) {
          parent.subTasks.push(taskMap.get(task.maCongViec));
        }
      }
    });

    // Lấy các công việc cha (không có maCongViecCha)
    return [...taskMap.values()].filter(task => !task.maCongViecCha);
  };

  const tasksTree = getTasksTree(phanduan.congViecs);

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
      {/* Hiển thị danh sách công việc theo cấu trúc cây */}
      <div className="bg-slate-50 shadow-md">
        {tasksTree.map(task => (
          <TaskListItem key={task.maCongViec} duAn={duAn} congviec={task} />
        ))}
      </div>
      <AddTask open={open} setOpen={setOpen} phanDuAn={phanduan.maPhanDuAn} duAn={duAn} congViecCha={taskRoot} />
    </div>
  );
};

export default TaskGroup