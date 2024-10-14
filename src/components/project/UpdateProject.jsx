import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Loading from "../Loader";
import Button from "../Button";
import ModalWrapper from "../ModalWrapper";
import { fetchProjects, updateProject } from "../../redux/project/projectSlice";

const UpdateProject = ({ open, setOpen, projectData }) => {
  const defaultValues = projectData ?? {};
  const dispatch = useDispatch();

  const isLoading = false;
  const isUpdating = false;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ defaultValues });

  useEffect(() => {
    if (projectData) {
      console.log("Project Data:", projectData);
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleOnSubmit = async (data) => {
    console.log("Project Data:", {
      maDuAn: Number(data.maDuAn),
      tenDuAn: data.tenDuAn
    });
    try {
      await dispatch(updateProject({
        id: Number(data.maDuAn), project: {
          tenDuAn: data.tenDuAn
        }
      }));
      await dispatch(fetchProjects({ search: '', page: 10 }));
      setOpen(false);
    } catch (error) {
      console.error("Failed to update project: ", error);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="">
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          UPDATE PROJECT
        </Dialog.Title>
        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Mã Dự Án"
            type="text"
            name="maDuAn"
            label="Mã Dự Án"
            className="w-full rounded"
            register={register("maDuAn", {
              required: "Mã Dự Án is required!",
            })}
            error={errors.maDuAn ? errors.maDuAn.message : ""}
          />
        </div>
        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Tên Dự Án"
            type="text"
            name="tenDuAn"
            label="Tên Dự Án"
            className="w-full rounded"
            register={register("tenDuAn", {
              required: "Tên Dự Án is required!",
            })}
            error={errors.tenDuAn ? errors.tenDuAn.message : ""}
          />
        </div>
        {isLoading || isUpdating ? (
          <div className="py-5">
            <Loading />
          </div>
        ) : (
          <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
            <Button
              type="submit"
              className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
              label="Submit"
            />

            <Button
              type="button"
              className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
              onClick={() => setOpen(false)}
              label="Cancel"
            />
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default UpdateProject;