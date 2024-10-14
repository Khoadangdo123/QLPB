import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import PageSizeSelect from "../components/PageSizeSelect";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import AddProject from "../components/project/AddProject";
import { fetchProjects } from "../redux/project/projectSlice";
import UpdateProject from "../components/project/UpdateProject";
import DeleteProjectById from "../components/project/DeleteProjectById";

const Projects = () => {
  const [pageSize, setPageSize] = useState(10);
  const projects = useSelector((state) => state.projects.list);
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);
  const [connection, setConnection] = useState(null);
  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(fetchProjects({ search: "", page: pageSize }));
  }, [dispatch, pageSize]);

  useEffect(()=>{
    if (connection && connection.state === "Disconnected") {
        connection.start()
          .then(() => {
            console.log("Connected!");
            connection.on("loadProject", () => {
              dispatch(fetchProjects({ search: '', page: pageSize }));
            
            });
          })
          .catch((error) => console.error("Connection failed: ", error));
      }
  },[dispatch,pageSize,connection])
  const projectActionHandler = () => {};
  const deleteHandler = () => {};

  const deleteClick = (id) => {
    setProjectIdToDelete(id);
    console.log("id", id);
    setOpenDelete(true);
  };

  const editClick = (project) => { 
    setSelectedProject(project);
    console.log("project", project);
    setOpenUpdate(true);
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2">Mã Dự Án</th>
        <th className="py-2">Tên Dự Án</th>
      </tr>
    </thead>
  );

  const TableRow = ({ project }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="p-2">{project.maDuAn}</td>
      <td className="p-2">{project.tenDuAn}</td>
      <td className="p-2 flex gap-4 justify-end">
        <Button
          className="text-blue-600 hover:text-blue-500 font-semibold sm:px-0"
          label="Edit"
          type="button"
          onClick={() => editClick(project)}
        />
        <Button
          className="text-red-600 hover:text-red-500 font-semibold sm:px-0"
          label="Delete"
          type="button"
          onClick={() => deleteClick(project.maDuAn)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <PageSizeSelect pageSize={pageSize} setPageSize={setPageSize} />
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold">Projects</h2>
          <Button
            label="Thêm Dự Án Mới"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5"
            onClick={() => setOpen(true)}
          />
        </div>

        <div className="bg-white px-2 md:px-4 py-4 shadow-md rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {projects?.filter(project => project.trangThai === true).map((project, index) => (
                  <TableRow key={index} project={project} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddProject open={open} setOpen={setOpen} projectData={null} />
      <UpdateProject open={openUpdate} setOpen={setOpenUpdate} projectData={selectedProject} />
      <DeleteProjectById open={openDelete} setOpen={setOpenDelete} projectId={projectIdToDelete} />
      {/* <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      /> */}

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={projectActionHandler}
      />
    </>
  );
};

export default Projects;
