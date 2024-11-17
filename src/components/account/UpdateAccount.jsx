import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Loading from "../Loader";
import Button from "../Button";
import ModalWrapper from "../ModalWrapper";
import { fetchDepartments } from "../../redux/departments/departmentSlice";
import {
  addEmployee,
  fetchEmployees,
  updateEmployee,
} from "../../redux/employees/employeeSlice";
import Employees from "../../pages/Employee";
import { toast } from "react-toastify";
import { fetchPermissions } from "../../redux/permission/permissionSlice";
const UpdateAccount = ({ open, setOpen, accountData }) => {
  const defaultValues = accountData ?? {};
  //const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.permissions.list);
  useEffect(() => {
    dispatch(fetchPermissions({ search: "", page: 10 }));
  }, [dispatch]);
  const isLoading = false;
  const isUpdating = false;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });
  useEffect(() => {
    if (accountData) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);
  const handleOnSubmit = async (data) => {
    if (!data.tenNhanVien || data.tenNhanVien.trim() === "") {
      toast.warning("Vui lòng nhập tên nhân viên hợp lệ");
      return;
    }
    if (/^\d+$/.test(data.tenNhanVien)) {
      toast.warning("Tên nhân viên không được chỉ chứa số");
      return;
    }
    if (!/^\d{9,11}$/.test(data.soDienThoai)) {
      toast.warning("Số điện thoại không hợp lệ (phải từ 9-11 chữ số)");
      return;
    }
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
      data.email.trim() === ""
    ) {
      toast.warning("Email không hợp lệ");
      return;
    }
    if (isNaN(data.maPhongBan) || Number(data.maPhongBan) <= 0) {
      toast.warning("Mã phòng ban phải là số dương");
      return;
    }
    if (isNaN(data.maNhanVien) || Number(data.maNhanVien) <= 0) {
      toast.warning("Mã nhân viên phải là số dương");
      return;
    }
    try {
      await dispatch(
        updateEmployee({
          id: Number(data.maNhanVien),
          employee: {
            maPhongBan: Number(data.maPhongBan),
            tenChucVu: data.tenChucVu,
            tenNhanVien: data.tenNhanVien,
            soDienThoai: data.soDienThoai,
            email: data.email,
          },
        })
      );
      await dispatch(fetchEmployees({ search: "", page: 10 }));
      toast.success("Cập nhật thành công");
      setOpen(false);
    } catch (error) {
      toast.error("Cập nhật thất bại");
      console.error("Failed to update employee: ", error);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="">
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          CẬP NHẬT NHÓM QUYỀN
        </Dialog.Title>
        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Mã Tài Khoản"
            type="text"
            name="maTaiKhoan"
            label="Mã Tài Khoản"
            className="w-full rounded"
            register={register("maTaiKhoan", {
              required: "Mã Nhân Viên is required!",
            })}
            error={errors.maTaiKhoan ? errors.maTaiKhoan.message : ""}
          />
        </div>
        <label
          htmlFor="maNhomQuyen"
          className="block text-sm font-medium text-gray-700"
        ></label>
        <select
          id="maNhomQuyen"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          {...register("maNhomQuyen", { required: "Select a role!" })}
        >
          <option value="">Select Role</option>
          {permissions.map((item) => (
            <option key={item.maQuyen} value={item.maQuyen}>
              {item.tenQuyen}
            </option>
          ))}
        </select>
        {errors.maNhomQuyen && (
          <span className="text-red-600">{errors.maNhomQuyen.message}</span>
        )}
        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Tên Tài Khoản"
            type="text"
            name="tenTaiKhoan"
            label="Tên Tài Khoản"
            className="w-full rounded"
            register={register("tenChucVu", {
              required: "Tên tài khoản is required!",
            })}
            error={errors.tenTaiKhoan ? errors.tenTaiKhoan.message : ""}
          />
        </div>
        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Mật Khẩu"
            type="text"
            name="matKhau"
            label="Mật Khẩu"
            className="w-full rounded"
            register={register("matKhau", {
              required: "Mật Khẩu is required!",
            })}
            error={errors.matKhau ? errors.matKhau.message : ""}
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

export default UpdateAccount;
