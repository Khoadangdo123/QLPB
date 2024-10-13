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
import { HubConnectionBuilder,LogLevel } from '@microsoft/signalr';
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
  const dispatch=useDispatch()
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const [connection, setConnection] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const [timelineModalOpen, setTimelineModalOpen] = useState(false);
  const duan=useSelector((state) =>
    state.projects.list.find((project) => project.maDuAn === Number(id))
  );
  useEffect(() => {
    if (id) {
      dispatch(fetchByIdProject(id))
    }
  }, [id, dispatch]);
  useEffect(()=>{
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7131/hub").withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(newConnection);
  },[])
  useEffect(() => {
    if (connection && connection.state === "Disconnected") {
      connection.start()
        .then(() => {
          console.log("Connected!");
          connection.on("loadDuAn", () => {
            if (id) {
              dispatch(fetchByIdProject(id));
              console.log("Dự Án: "+id)
            }
          });
          connection.on("loadCongViec", () => {
            if (id) {
              dispatch(fetchByIdProject(id));
            }
          });
          connection.on("loadPhanCong", () => {
            if (id) {
              dispatch(fetchByIdProject(id));
            }
          });
          connection.on("updateCongViec", () => {
            if (id) {
              dispatch(fetchByIdProject(id));
              console.log("Dự Án: "+id)
            }
          });
        })
        .catch((error) => console.error("Connection failed: ", error));
    }
  }, [connection, id, dispatch]);
  const status = id || ""; 
  const toggleTimelineModal = () => {
    setTimelineModalOpen(!timelineModalOpen);
  };
  return loading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `Trạng thái công việc` : "Các công việc"} />

        {status && (
          <div className="flex gap-4">
            <Button
              onClick={() => setOpen(true)}
              label="Tạo phần dự án"
              icon={<IoMdAdd className="text-lg" />}
              className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
            />
            <Button
              onClick={toggleTimelineModal} 
              label="Hiển thị Timeline"
              icon={<IoMdAdd className="text-lg" />}
              className="flex flex-row-reverse gap-1 items-center bg-green-600 text-white rounded-md py-2 2xl:py-2.5"
            />
          </div>
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
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
