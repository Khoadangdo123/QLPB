import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Loading from "../Loader";
import Button from "../Button";
import ModalWrapper from "../ModalWrapper";
import { fetchSections, updateSection } from "../../redux/section/sectionSlice";
import { fetchByIdProject } from "../../redux/project/projectSlice";

const UpdateSection = ({ open, setOpen, sectionData }) => {
  const defaultValues = sectionData ?? {};
  const dispatch = useDispatch();
  const currentProject = useSelector((state) => state.projects.current);

  useEffect(() => {
    dispatch(fetchSections({ search: "", page: 1 }))
  }, [dispatch])

  const isLoading = false;
  const isUpdating = false;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ defaultValues });

  useEffect(() => {
    if (sectionData) {
      console.log("Section Data:", sectionData)
      reset(defaultValues)
      dispatch(fetchByIdProject(sectionData.maDuAn));
    }
  }, [defaultValues, reset, dispatch]);

  useEffect(() => {
    if (currentProject) {
      reset({
        ...defaultValues,
        tenDuAn: currentProject.tenDuAn,
      });
    }
  }, [currentProject, reset, defaultValues]);

  const handleOnSubmit = async (data) => {

    console.log("Section Data 123:", {
      maPhanDuAn: Number(data.maPhanDuAn),
      maDuAn: Number(data.maDuAn),
      tenPhan: data.tenPhan,
    });

    try {
      await dispatch(updateSection({
        id: Number(data.maPhanDuAn),
        section: {
          maPhanDuAn: Number(data.maPhanDuAn),
          maDuAn: Number(data.maDuAn),
          tenPhan: data.tenPhan,
        }
      }));

      await dispatch(fetchSections({ search: "", page: 1 }));
      setOpen(false);
    }
    catch (error) {
      console.error("Failed to update Section: ", error);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="">
        <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
          Cập nhật Phần Dự Án
        </Dialog.Title>

        <div className="mt-4 flex flex-col gap-6">
          <Textbox
            placeholder="Mã Phần Dự Án"
            type="text"
            name="maPhanDuAn"
            label="Mã Phần Dự Án"
            className="w-full rounded"
            register={register("maPhanDuAn", {
              required: "Mã Phần Dự Án là bắt buộc!"
            })}
            readOnly
            error={errors.maPhanDuAn ? errors.maPhanDuAn.message : ""}
          />
        </div>

        <div className="mt-4 flex flex-col gap-6">
          <Textbox
            placeholder="Tên Phần Dự Án"
            type="text"
            name="tenPhan"
            label="Tên Phần Dự Án"
            className="w-full rounded"
            register={register("tenPhan", {
              required: "Tên Phần Dự Án là bắt buộc!"
            })}
            error={errors.tenPhan ? errors.tenPhan.message : ""}
          />
        </div>

        <div className="mt-4 flex flex-col gap-6">
          <Textbox
            placeholder="Tên Dự Án"
            type="text"
            name="tenDuAn"
            label="Dự Án"
            className="w-full rounded"
            {...register("tenDuAn")}
            readOnly
          />
        </div>

        {isLoading ? (
          <div className="py-5">
            <Loading />
          </div>
        ) : (
          <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
            <Button
              type="submit"
              className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
              label="Cập Nhật"
            />

            <Button
              type="button"
              className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
              onClick={() => setOpen(false)}
              label="Hủy"
            />
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default UpdateSection;