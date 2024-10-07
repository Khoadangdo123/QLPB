import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/task/taskSlice";
import { fetchByIdProject } from "../../redux/project/projectSlice";
import DepartmentSelect from "./DepartmentTask";
import EmployeeSelect from "./EmployeeTask";
import { addAssignment } from "../../redux/assignment/assignmentSlice";
import { sendGmail } from "../../redux/sendgmail/sendgmailSlice";
const LISTS = ["CAO", "TRUNG BÌNH", "BÌNH THƯỜNG", "THẤP"];
const PRIORITY = ["CAO", "TRUNG BÌNH", "BÌNH THƯỜNG", "THẤP"];

const uploadedFileURLs = [];

const AddTask = ({ open, setOpen,phanDuAn,congViecCha,duAn }) => {
  const task = "";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [team, setTeam] = useState(task?.team || []);
  const dispatch=useDispatch();
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORITY[2]
  );
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const submitHandler =async (data) => {
    console.log(congViecCha,duAn)
    let CongViec={
      maPhanDuAn: Number(phanDuAn),
      maCongViecCha: congViecCha===false?null:congViecCha,
      tenCongViec: data.tenCongViec,
      moTa: data.moTa,
      mucDoUuTien: stage,
      thoiGianKetThuc: data.thoiGianKetThuc,
      trangThaiCongViec: false,
      mucDoHoanThanh: 0
    }
    console.log(selectedDepartment)
    console.log(selectedEmployees)
    try{
      const result=await dispatch(addTask(CongViec)).unwrap();
      if(selectedDepartment===null | selectedDepartment.length===0){
        
      }
      if(selectedEmployees!==null | selectedEmployees.length>0){
        // for (let employee of selectedEmployees) {
        //   await dispatch(addAssignment({
        //     maCongViec: result.maCongViec,
        //     maNhanVien: Number(employee.maNhanVien),
        //     vaiTro: employee.vaiTro,
        //   }));
        // }
      }
      // const assignmentPromises = selectedEmployees.map(employee => 
      //   dispatch(addAssignment({
      //     maCongViec: result.maCongViec,
      //     maNhanVien: Number(employee.maNhanVien),
      //     vaiTro: employee.vaiTro,
      //   }))
      // );
      // await Promise.all(assignmentPromises);
      // await dispatch(fetchByIdProject(Number(duAn)))
      // setOpen(false)
      // if(selectedEmployees!==null | selectedEmployees.length>0){
      //   for (let employee of selectedEmployees) {
      //     await dispatch(sendGmail({
      //       name:employee.tenNhanVien,
      //       toGmail:employee.email,
      //       subject:"Thông Tin Phân Công Dự Án",
      //       body:generateEmailTemplate(employee)
      //     }));
      //   }
      // }
    }catch(e){
      console.log(e)
    }
  };

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <div className="max-h-screen overflow-y-auto">
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            THÊM CÔNG VIỆC
          </Dialog.Title>

          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Tên công việc'
              type='text'
              name='title'
              label='Tên công việc'
              className='w-full rounded'
              register={register("tenCongViec", { required: "Tên công việc là bắt buộc" })}
              error={errors.tenCongViec ? errors.tenCongViec.message : ""}
            />
             <Textbox
              placeholder='Mô tả'
              type='text'
              name='title'
              label='Mô tả'
              className='w-full rounded'
              register={register("moTa", { required: "Mô tả công việc là bắt buộc" })}
              error={errors.moTa ? errors.moTa.message : ""}
            />

            {/* <UserList setTeam={setTeam} team={team} /> */}
            <EmployeeSelect
            selectedEmployees={selectedEmployees}
            setSelectedEmployees={setSelectedEmployees}
          />
            <DepartmentSelect
              selected={selectedDepartment}
              setSelected={setSelectedDepartment}
            />
            <div className='flex gap-4'>
              <SelectList
                label='Mức Độ Ưu Tiên'
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <div className='w-full'>
                <Textbox
                  placeholder='Ngày'
                  type='datetime-local'
                  name='date'
                  label='Ngày hoàn thành'
                  className='w-full rounded'
                  register={register("thoiGianKetThuc", {
                    required: "Ngày là bắt buộc!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
              {uploading ? (
                <span className='text-sm py-2 text-red-500'>
                  Đang tải tài liệu
                </span>
              ) : (
                <Button
                  label='Gửi'
                  type='submit'
                  className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                />
              )}

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Hủy'
              />
            </div>
          </div>
        </form>
        </div>
      </ModalWrapper>
    </>
  );
};
const generateEmailTemplate = (employee) => {
  return `
      <html>
          <head>
              <style>
                  .email-container {
                      font-family: Arial, sans-serif;
                      line-height: 1.5;
                  }
                  .email-header {
                      font-size: 18px;
                      font-weight: bold;
                      color: #333;
                  }
                  .email-body {
                      margin-top: 20px;
                      color: #555;
                  }
              </style>
          </head>
          <body>
              <div class="email-container">
                  <div class="email-header">Xin chào ${employee.tenNhanVien},</div>
                  <div class="email-body">
                      <p>Bạn đã được chọn để tham gia dự án với vai trò: ${employee.vaiTro}</p>
                      <p>Vui lòng kiểm tra lại chi tiết trong hệ thống quản lý công việc của chúng tôi.</p>
                      <p>Trân trọng,</p>
                      <p>Đội ngũ quản lý dự án</p>
                  </div>
              </div>
          </body>
      </html>
  `;
};
export default AddTask;
