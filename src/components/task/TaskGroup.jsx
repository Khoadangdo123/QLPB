import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import TaskListItem from "./TaskListItem";
import { useState } from "react";
const TaskGroup=({phanduan})=>{
  console.log(phanduan)
  const [hidden, setHidden] = useState(false);
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
      </button>
      <div
        className={`${hidden ? "max-h-0" : "max-h-[1000px]"} overflow-scroll duration-200 transition-all bg-slate-50 shadow-md`}
      >
        {phanduan.congViecs.map((item) => {
          return <TaskListItem congviec={item} />;
        })}
      </div>
    </div>
  );
}
export default TaskGroup;