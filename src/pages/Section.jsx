import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { getInitials } from "../utils";
import clsx from "clsx";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import UpdateSection from "../components/section/UpdateSection";
import PageSizeSelect from "../components/PageSizeSelect";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { fetchSections, deleteSection } from "../redux/section/sectionSlice";

const Sections = () => {
  const [pageSize, setPageSize] = useState(10);
  const sections = useSelector((state) => state.sections.list);
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [connection, setConnection] = useState(null);
  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(fetchSections({ search: "", page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
    .withUrl("https://localhost:7131/hub").withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection && connection.state === "Disconnected") {
        connection.start()
          .then(() => {
            console.log("Connected!");
            connection.on("loadSection", () => {
              dispatch(fetchSections({ search: '', page: 1 }));
            });
          })
          .catch((error) => console.error("Connection failed: ", error));
      }
  }, [dispatch,1,connection]);

  const sectionActionHandler = () => {};
  
  const deleteHandler = () => {
    console.log("Selected:", selected)
    if (selected) {
      dispatch(deleteSection(selected));
      setOpenDialog(false);
    }
  };

  const deleteClick = (id) => {
    console.log("ID:", id)
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (section) => { 
    setSelectedSection(section);
    setOpenUpdate(true);
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='p-2'>Tên phần dự án</th>
        <th className='p-2'>Dự án</th>
        <th className='p-2'>Kích hoạt</th>
        <th className="p-2">Hành động</th>
      </tr>
    </thead>
  );

  const TableRow = ({ section }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='p-2'>
        <div className='flex items-center gap-3'>
          {/* <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700'>
            <span className='text-xs md:text-sm text-center'>
              {section.tenPhan}
            </span>
          </div> */}
          {section.tenPhan}
        </div>
      </td>
      <td className='p-2'>{section.maDuAn}</td>
      <td>
        <button
          // onClick={() => userStatusClick(user)}
          className={clsx(
            "w-fit px-4 py-1 rounded-full",
            section.trangThai ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {section?.trangThai ? "Active" : "Disabled"}
        </button>
      </td>

      <td className='p-2 flex gap-4'>
        <Button
          className='text-blue-600 hover:text-blue-500 font-semibold sm:px-0'
          label='Edit'
          type='button'
          onClick={() => editClick(section)}
        />

        <Button
          className='text-red-700 hover:text-red-500 font-semibold sm:px-0'
          label='Delete'
          type='button'
          onClick={() => deleteClick(section.maPhanDuAn)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <PageSizeSelect pageSize={1} setPageSize={setPageSize} />
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between mb-8">
          <Title title="Phần Dự Án" />
        </div>

        <div className="bg-white px-2 md:px-4 py-4 shadow-md rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {sections?.map((section, index) => (
                  <TableRow key={index} section={section} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <UpdateSection
        open={openUpdate}
        setOpen={setOpenUpdate}
        sectionData={selectedSection} 
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
        title="Xác nhận xóa"
        description="Bạn có chắc chắn muốn xóa phần dự án này không?"
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={sectionActionHandler}
      />
    </>
  );
};

export default Sections;
