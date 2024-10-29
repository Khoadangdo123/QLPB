import React, { useEffect, useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { addAssignment } from "../../redux/assignment/assignmentSlice";
import { addTaskHistory } from "../../redux/taskhistory/taskhistorySlice";
import EmployeeSelectTransfer from "./EmployeeSelect";

const AddTaskTransfer = ({
  openTransfer,
  setOpenTransfer,
  currentEmployee,
  maCongViec,
  tenCongViec,
  maPhongBan,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [transferNote, setTransferNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [selectedCurrentEmployee, setSelectedCurrentEmployee] = useState("");
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        if (currentEmployee) {
          setEmployees(currentEmployee);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhân viên:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [currentEmployee]);
  const submitHandler = async (data) => {
    // try {
    //   if (selectedEmployee) {
    //     await dispatch(addAssignment({
    //       maCongViec: maCongViec,
    //       maNhanVien: Number(selectedEmployee.maNhanVien),
    //       vaiTro: selectedEmployee.vaiTro,
    //     }));
    //     await dispatch(addTaskHistory({
    //       maCongViec: maCongViec,
    //       ngayCapNhat: new Date().toISOString(),
    //       noiDung: `${new Date().toISOString()}: Công việc ${tenCongViec} được chuyển giao từ ${currentEmployee?.tenNhanVien} sang ${selectedEmployee.tenNhanVien}. Nội dung: ${transferNote}`
    //     }));
    //   }
    //   setOpen(false);
    // } catch (e) {
    //   console.log(e);
    // }
  };
  // console.log(selectedCurrentEmployee);
  // console.log(selectedEmployees);
  return (
    <ModalWrapper open={openTransfer} setOpen={setOpenTransfer}>
      <div className="max-h-screen overflow-y-auto">
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            CHUYỂN ĐỔI CÔNG VIỆC
          </Dialog.Title>

          <div className="flex flex-col gap-6">
            {/* Select hiển thị nhân viên hiện tại */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nhân viên hiện tại
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedCurrentEmployee}
                onChange={(e) => setSelectedCurrentEmployee(e.target.value)}
              >
                <option value="">Chọn nhân viên hiện tại</option>
                {loading ? (
                  <option value="">Đang tải nhân viên...</option>
                ) : employees.length > 0 ? (
                  employees.map((item) => (
                    <option key={item.maNhanVien} value={item.maNhanVien}>
                      {item.maNhanVien}-{item.nhanVien.tenNhanVien}-
                      {item.vaiTro}
                    </option>
                  ))
                ) : (
                  <option value="">Không có nhân viên nào</option>
                )}
              </select>
            </div>

            {/* Select hiển thị toàn bộ nhân viên */}
            <EmployeeSelectTransfer
              maPhongBan={maPhongBan}
              selectedEmployees={selectedEmployees}
              setSelectedEmployees={setSelectedEmployees}
            />
            {/* Textarea để nhập nội dung chuyển đổi */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nội dung chuyển đổi
              </label>
              <textarea
                className="mt-1 block w-full rounded-md border-2 border-blue-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows="4"
                value={transferNote}
                onChange={(e) => setTransferNote(e.target.value)}
                placeholder="Nhập nội dung chuyển đổi"
              />
            </div>

            <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
              <Button
                label="Chuyển"
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
              />
              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpenTransfer(false)}
                label="Hủy"
              />
            </div>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default AddTaskTransfer;
