import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import TaskListItem from "./TaskListItem";
import { useState } from "react";
import Button from "../Button";
import { useParams } from "react-router-dom";
import AddTask from "./AddTask";
const TaskGroup=({phanduan,duAn})=>{
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [taskRoot,setTaskRoot]=useState(false);
  const {id} = useParams();
  return (

    <div className="w-full bg-transparent border-b-1">
      <button
        onClick={() => {
          setHidden(!hidden);
        }}
        className="p-4 w-full flex items-center font-semibold bg-white text-gray-600 mb-2 mt-4 shadow-sm border-y"
      >
        <span className="">{phanduan.tenPhan}</span>{" "}
        {hidden ? <MdKeyboardArrowDown size={30} /> : <MdKeyboardArrowUp size={30} />}
        <Button
            onClick={() => setOpen(true)}
            label='Tạo công việc'
            // icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
      </button>
      <div
        className={`${hidden ? "max-h-0" : "max-h-[1000px]"} overflow-scroll duration-200 transition-all bg-slate-50 shadow-md`}
      >
        {phanduan.congViecs.map((item) => {
          return <TaskListItem congviec={item} />;
        })}
      </div>
      <AddTask open={open} setOpen={setOpen} phanDuAn={phanduan.maPhanDuAn} duAn={duAn} congViecCha={taskRoot} />
    </div>
  );
}
export default TaskGroup;