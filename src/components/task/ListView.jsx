import { faker } from "@faker-js/faker";
import { MdKeyboardArrowDown } from "react-icons/md";
import PrioritySelection from "../Selection";
import { formatDate } from "../../utils";
import TaskGroup from "./TaskGroup";
const createRandomUser = () => {
  return {
    _id: faker.string.uuid(),
    name: faker.internet.userName(),
    title: "Administrator",
    email: faker.internet.email(),
  };
};

const createRandomTask = () => {
  const users = faker.helpers.multiple(createRandomUser, { count: 3 });
  return {
    _id: faker.string.uuid(),
    title: faker.internet.displayName(),
    date: faker.helpers.arrayElement([null, faker.date.past()]),

    priority: faker.helpers.arrayElement([null, "low", "medium", "high"]),
    stage: faker.helpers.arrayElement(["todo", "inprogress", "done"]),
    assets: [
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707471138863original-a005132062ca5bafc505c4c74f0e1865.jpg?alt=media&token=55f909f2-7f05-42f3-af4f-dc7f87cdea1d",
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707471144712PsZch9E1_400x400.jpg?alt=media&token=7ce62c7e-c240-4032-83c6-bb6c9cdc0d4b",
    ],
    team: users,
    isTrashed: false,
    activities: [],

    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    __v: 1,
  };
};

const createRandomGroup = () => {
  const tasks = faker.helpers.multiple(createRandomTask, { count: 5 });
  return {
    title: faker.internet.displayName(),
    tasks: tasks,
  };
};

const MOCK_DATA = faker.helpers.multiple(createRandomGroup, { count: 5 });

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
