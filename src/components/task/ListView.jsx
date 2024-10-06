import { faker } from "@faker-js/faker";
import { MdKeyboardArrowDown } from "react-icons/md";
import PrioritySelection from "../Selection";
import { formatDate } from "../../utils";
import TaskGroup from "./TaskGroup";
import { MOCK_DATA } from "./mockData";

export default function () {
  return (
    <div className="w-full bg-transparent">
      <button className="p-2 bg-blue-500 text-white font-bold mb-4 rounded-md">
        add task
      </button>
      <div className="text-xl bg-transparent">
        <div className="w-full flex border-y-2 py-2 px-4 font-bold -mb-2 bg-white shadow-sm">
          <div className="flex-1 px-4 ">Task name</div>
          <div className="flex-1 border-l px-4 ">Priority</div>
          <div className="flex-1 border-l px-4 ">Due date</div>
          <div className="flex-1 border-l px-4 ">Team</div>
          <div className="flex-1 border-l px-4 ">Stage</div>
        </div>
        {MOCK_DATA.map((group) => {
          return <TaskGroup group={group} />;
        })}
      </div>
    </div>
  );
}
