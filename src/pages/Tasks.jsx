import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import { tasks } from "../assets/data";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import ListView from "../components/task/ListView";
import { useDispatch, useSelector } from "react-redux";
import { fetchByIdProject} from "../redux/project/projectSlice";
import AddSection from "../components/section/AddSection";
const TABS = [
  { title: "Chế độ Bảng", icon: <MdGridView /> },
  { title: "Chế độ Danh sách", icon: <FaList /> },  
];
const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks = () => {
  const {id} = useParams();
  const dispath=useDispatch()
  const duan=useSelector((state) =>
    state.projects.list.find((project) => project.maDuAn === Number(id))
  );
  useEffect(() => {
    if (id) {
      dispath(fetchByIdProject(id))
    }
  }, [id, dispath]);
  if (!duan) {
    return <div>Loading...</div>;
  }
  if (!duan) {
    return <div>Project not found</div>;
  }
  console.log(duan)
  console.log(typeof(id))
  console.log(duan.phanDuAn)
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);

  const status = id?.status || ""; 
  return loading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `Trạng thái công việc` : "Các công việc"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='Tạo phần dự án'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {/* {!status && (
          <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
            <TaskTitle label='Việc cần làm' className={TASK_TYPE.todo} />
            <TaskTitle
              label='Đang thực hiện'
              className={TASK_TYPE["in progress"]}
            />
            <TaskTitle label='Hoàn thành' className={TASK_TYPE.completed} />
          </div>
        )} */}
        {selected !== 1 ? (
          <BoardView tasks={tasks} />
        ) : (
          <ListView phanDuAn={duan.phanDuAn} duAn={id}/>
        )}
      </Tabs>

      {/* <AddTask open={open} setOpen={setOpen} /> */}
      <AddSection open={open} setOpen={setOpen} duAn={id}></AddSection>
    </div>
  );
};

export default Tasks;
