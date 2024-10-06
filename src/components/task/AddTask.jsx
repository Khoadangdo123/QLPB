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

const LISTS = ["Cao", "ĐANG LÀM", "HOÀN THÀNH"];
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
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORITY[2]
  );
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const submitHandler =async (data) => {
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
    try{
      await dispatch(addTask(CongViec))
      await dispatch(fetchByIdProject(Number(duAn)))
      setOpen(false)
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

            <UserList setTeam={setTeam} team={team} />

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
      </ModalWrapper>
    </>
  );
};

export default AddTask;
