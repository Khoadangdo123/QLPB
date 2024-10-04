import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Loading from "../Loader";
import Button from "../Button";
import ModalWrapper from "../ModalWrapper";
import {fetchDepartments } from "../../redux/departments/departmentSlice";
import { addEmployee, fetchEmployees } from "../../redux/employees/employeeSlice";
import { addAccount, fetchAccounts } from "../../redux/accounts/accountSlice";
const AddAccount = ({ open, setOpen, accountData }) => {
  const defaultValues = accountData ?? {};
  const { user } = useSelector((state) => state.auth);
  const dispatch=useDispatch();
  const employees=useSelector((state)=>state.employees.list)
  useEffect(()=>{
    dispatch(fetchEmployees({search:'',page:10}))
  },[dispatch])
  const isLoading = false;
  const isUpdating = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleOnSubmit =async (data) => {
    console.log("Employee Data:",{
        maPhongBan: Number(data.maPhongBan),
        tenChucVu: data.tenChucVu,
        tenNhanVien: data.tenNhanVien,
        soDienThoai: data.soDienThoai,
        email:data.email
    });
    try {
      await dispatch(addAccount({
        maPhongBan: Number(data.maPhongBan),
        tenChucVu: data.tenChucVu,
        tenNhanVien: data.tenNhanVien,
        soDienThoai: data.soDienThoai,
        email:data.email
    })); 
      await dispatch(fetchAccounts({ search: '', page: 10 }));
      setOpen(false);
    } catch (error) {
      console.error("Failed to add employee: ", error);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="">
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          CREATE ACCOUNT
        </Dialog.Title>
        <label htmlFor="tenChucVu" className="block text-sm font-medium text-gray-700">
            
          </label>
          <select
            id="maNhanVien"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            {...register("maNhanVien", { required: "Select a head!" })}
          >
            <option value="">Select Head</option>
            {employees.map((item) => (
              <option key={item.maNhanVien} value={item.maNhanVien}>
                {item.tenNhanVien}
              </option>
            ))}
          </select>
        {errors.maNhanVien && <span className="text-red-600">{errors.maNhanVien.message}</span>}
        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Nhóm Quyền"
            type="text"
            name="maNhomQuyen"
            label="Nhóm Quyền"
            className="w-full rounded"
            register={register("maNhomQuyen", {
              required: "Nhóm Quyền is required!",
            })}
            error={errors.maNhomQuyen ? errors.maNhomQuyen.message : ""}
          />
        </div>
        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Tên Tài Khoản"
            type="text"
            name="tenTaiKhoan"
            label="Tên Tài Khoản"
            className="w-full rounded"
            register={register("tenTaiKhoan", {
              required: "Tên Tài Khoản is required!",
            })}
            error={errors.tenTaiKhoan ? errors.tenTaiKhoan.message : ""}
          />
        </div>
        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Mật Khẩu"
            type="text"
            name="matKhau"
            label="Mật khẩu"
            className="w-full rounded"
            register={register("matKhau", {
              required: "Mật Khẩu is required!",
            })}
            error={errors.matKhau ? errors.matKhau.message : ""}
          />
        </div>
        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Email"
            type="text"
            name="email"
            label="Email"
            className="w-full rounded"
            register={register("email", {
              required: "Email is required!",
            })}
            error={errors.tenNhanVien ? errors.tenNhanVien.message : ""}
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

export default AddAccount;
