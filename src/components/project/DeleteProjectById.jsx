import React from "react";
import { useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import Button from "../Button";
import ModalWrapper from "../ModalWrapper";
import { fetchProjects, deleteProjectById } from "../../redux/project/projectSlice";

const DeleteProjectById = ({ open, setOpen, projectId }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteProjectById(projectId));
      console.log("Deleted project with id: ", projectId);
      await dispatch(fetchProjects({ search: '', page: 10 }));
      setOpen(false);
    } catch (error) {
      console.error("Failed to delete project: ", error);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div className="py-4 w-full flex flex-col gap-4 items-center justify-center">
        <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
          Confirm Deletion
        </Dialog.Title>
        <p className="text-center text-gray-500">
          Are you sure you want to delete this project?
        </p>
        <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse gap-4">
          <Button
            type="button"
            className="bg-red-600 px-8 text-sm font-semibold text-white hover:bg-red-500 sm:w-auto"
            onClick={handleDelete}
            label="Delete"
          />
          <Button
            type="button"
            className="bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border"
            onClick={() => setOpen(false)}
            label="Cancel"
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DeleteProjectById;