import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";

const LISTS = ["CẦN LÀM", "ĐANG LÀM", "HOÀN THÀNH"];
const PRIORITY = ["CAO", "TRUNG BÌNH", "BÌNH THƯỜNG", "THẤP"];

const uploadedFileURLs = [];

const AddTask = ({ open, setOpen }) => {
  const task = "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORITY[2]
  );
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const submitHandler = () => {};

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
            {task ? "CẬP NHẬT CÔNG VIỆC" : "THÊM CÔNG VIỆC"}
          </Dialog.Title>

          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Tiêu đề công việc'
              type='text'
              name='title'
              label='Tiêu đề công việc'
              className='w-full rounded'
              register={register("title", { required: "Tiêu đề là bắt buộc" })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList setTeam={setTeam} team={team} />

            <div className='flex gap-4'>
              <SelectList
                label='Giai đoạn công việc'
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <div className='w-full'>
                <Textbox
                  placeholder='Ngày'
                  type='date'
                  name='date'
                  label='Ngày hoàn thành'
                  className='w-full rounded'
                  register={register("date", {
                    required: "Ngày là bắt buộc!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className='flex gap-4'>
              <SelectList
                label='Mức độ ưu tiên'
                lists={PRIORITY}
                selected={priority}
                setSelected={setPriority}
              />

              <div className='w-full flex items-center justify-center mt-4'>
                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                  htmlFor='imgUpload'
                >
                  <input
                    type='file'
                    className='hidden'
                    id='imgUpload'
                    onChange={(e) => handleSelect(e)}
                    accept='.jpg, .png, .jpeg'
                    multiple={true}
                  />
                  <BiImages />
                  <span>Thêm Tài Liệu</span>
                </label>
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
