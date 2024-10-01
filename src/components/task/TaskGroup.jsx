import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import TaskListItem from "./TaskListItem";
import { useState } from "react";

export default function (props) {
  const { group } = props;
  const [hidden, setHidden] = useState(false);
  return (
    <div className="w-full bg-transparent border-b-1">
      <button
        onClick={() => {
          setHidden(!hidden);
        }}
        className="p-4 w-full flex items-center font-semibold bg-white text-gray-600 mb-2 mt-4 shadow-sm border-y"
      >
        <span className="">{group.title}</span>{" "}
        {hidden ? <MdKeyboardArrowDown size={30} /> : <MdKeyboardArrowUp size={30} />}
      </button>
      <div
        className={`${hidden ? "max-h-0" : "max-h-[1000px]"} overflow-scroll duration-200 transition-all bg-slate-50 shadow-md`}
      >
        {group.tasks.map((task) => {
          return <TaskListItem task={task} />;
        })}
      </div>
    </div>
  );
}
