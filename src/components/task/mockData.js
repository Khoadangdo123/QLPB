import { faker } from "@faker-js/faker";

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

  const tasks = faker.helpers.multiple(createRandomTask, { count: Math.floor(Math.random() * 5) +1 });
  return {
    title: faker.internet.displayName(),
    tasks: tasks,
  };
};

export const MOCK_DATA = faker.helpers.multiple(createRandomGroup, { count: 3 });
