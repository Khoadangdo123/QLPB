import { BiCalendar, BiPlus, BiTrash } from "react-icons/bi";
import Selection from "../Selection";
import { BGS, formatDate } from "../../utils";
import UserInfo from "../UserInfo";
import clsx from "clsx";

const stages = [
  { id: "todo", name: "Todo" },
  { id: "in_progress", name: "In progress" },
  { id: "done", name: "Done" },
];

export default function (props) {
  const { task } = props;
  return (
    <div className="mb-2 border rounded-lg bg-white p-2 flex flex-col ">
      <div className="flex justify-between">
        <h3 className="truncate font-semibold text-gray-500">{task.title}</h3>
        <button><BiTrash/></button>
      </div>
      <button
        className="hover:bg-gray-200 rounded-full w-fit"
        onClick={() => {
          alert("show calendar");
        }}
      >
        {task.date ? (
          <span className="text-gray-400">
            {formatDate(new Date(task.date))}
          </span>
        ) : (
          <div className="p-1 w-fit border-2 border-dashed rounded-full border-gray-400">
            <BiCalendar size={20} />
          </div>
        )}
      </button>
      <div className="flex-1 flex items-center">
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
        <button
          onClick={() => {
            alert("assign");
          }}
          className="rounded-full border-2 border-dashed size-fit p-1 ml-2 border-gray-400 text-gray-400"
        >
          <BiPlus />
        </button>
      </div>
      <Selection items={stages} selectedItem={task.stage} />
    </div>
  );
}
