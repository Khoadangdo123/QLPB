import { useState } from "react";
import TaskRow from "./TaskRow";

export default function (props) {
  const { group } = props;
  const [groupTitle, setGroupTitle] = useState(group.title);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  return (
    <div className="w-80 p-4 shrink-0 bg-gray-200 h-fit  border-2 border-gray-200 mr-4 rounded-xl">
      <input
        type="text"
        className="outline-none bg-gray-200 border-gray-100 border-b-2 px-2 w-full"
        value={groupTitle}
        onChange={(e) => {
          setGroupTitle(e.target.value);
        }}
      />
      <div className="w-full overflow-auto max-h-[550px]">
        <div className="py-2">
          {group.tasks.map((task) => {
            return <TaskRow key={task._id} task={task} />;
          })}
        </div>
        <div className="mb-2 border rounded-lg p-2 bg-white flex flex-col ">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => {
              setNewTaskTitle(e.target.value);
            }}
            placeholder="New task"
            className="border-2 mb-2 outline-none rounded-md p-2"
          />
          {newTaskTitle != "" ? (
            <button className="w-full rounded-xl font-bold text-white bg-gray-600 py-2">
              add task
            </button>
          ) : (
            <button disabled className="bg-gray-300 w-full rounded-xl font-bold text-gray-400 py-2">
              add task
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
