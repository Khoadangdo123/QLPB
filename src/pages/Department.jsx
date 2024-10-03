import React, { useEffect, useState } from "react";
//import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { getInitials } from "../utils";
import clsx from "clsx";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import Title from "../components/Title";
import AddDepartment from "../components/department/AddDepartment";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../redux/departments/departmentSlice";
import PageSizeSelect from "../components/PageSizeSelect";
import UpdateDepartment from "../components/department/UpdateDepartment";
const Departments = () => {
  const [pageSize, setPageSize] = useState(10);
  const departments = useSelector((state) => state.departments.list);
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchDepartments({ search: '', page: pageSize }));
  },[dispatch,pageSize])
  const departmentActionHandler = () => {};
  const deleteHandler = () => {};

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (department) => { 
    setSelectedDepartment(department);
    setOpenUpdate(true);
  };
  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2'>Phòng Ban</th>
        <th className='py-2'>Trưởng Phòng</th>
        <th className='py-2'>Kích hoạt</th>
      </tr>
    </thead>
  );
  const TableRow = ({ department }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='p-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700'>
            <span className='text-xs md:text-sm text-center'>
              {department.tenPhongBan}
            </span>
          </div>
          {department.tenPhongBan}
        </div>
      </td>

      <td className='p-2'>{department.maTruongPhong}</td>
      <td>
        <button
          // onClick={() => userStatusClick(user)}
          className={clsx(
            "w-fit px-4 py-1 rounded-full",
            department.trangThai ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {department?.trangThai ? "Active" : "Disabled"}
        </button>
      </td>

      <td className='p-2 flex gap-4 justify-end'>
        <Button
          className='text-blue-600 hover:text-blue-500 font-semibold sm:px-0'
          label='Edit'
          type='button'
          onClick={() => editClick(department)}
        />

        <Button
          className='text-red-700 hover:text-red-500 font-semibold sm:px-0'
          label='Delete'
          type='button'
          onClick={() => deleteClick(department.maPhongBan)}
        />
      </td>
    </tr>
  );

  return (
    <>
     <PageSizeSelect pageSize={pageSize} setPageSize={setPageSize} />
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <Title title='Phòng Ban' />
          <Button
            label='Thêm Phòng Ban Mới'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5'
            onClick={() => setOpen(true)}
          />
        </div>

        <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader />
              <tbody>
                {departments?.map((department, index) => (
                  <TableRow key={index} department={department} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddDepartment
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
      />
      <UpdateDepartment
         open={openUpdate}
         setOpen={setOpenUpdate}
         departmentData={selectedDepartment} 
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={departmentActionHandler}
      />
    </>
  );
};

export default Departments;
