import React, { useState } from "react";
import { useDispatch } from "react-redux";

const UserPermissions = ({ role }) => {
  const dispatch=useDispatch()
  const permissionsData = {
    Admin: [
      {
        function: "Quản lý tài khoản",
        actions: [
          { id: 1, action: "Tạo", allowed: true },
          { id: 2, action: "Đọc", allowed: true },
          { id: 3, action: "Cập nhật", allowed: true },
          { id: 4, action: "Xóa", allowed: true },
        ],
      },
      {
        function: "Quản lý phòng ban",
        actions: [
          { id: 5, action: "Tạo", allowed: true },
          { id: 6, action: "Đọc", allowed: true },
          { id: 7, action: "Cập nhật", allowed: true },
          { id: 8, action: "Xóa", allowed: true },
        ],
      },
    ],
    User: [
      {
        function: "Quản lý tài khoản",
        actions: [
          { id: 1, action: "Tạo", allowed: false },
          { id: 2, action: "Đọc", allowed: true },
          { id: 3, action: "Cập nhật", allowed: false },
          { id: 4, action: "Xóa", allowed: false },
        ],
      },
      {
        function: "Quản lý phòng ban",
        actions: [
          { id: 5, action: "Tạo", allowed: false },
          { id: 6, action: "Đọc", allowed: true },
          { id: 7, action: "Cập nhật", allowed: false },
          { id: 8, action: "Xóa", allowed: false },
        ],
      },
    ],
    Manager: [
      {
        function: "Quản lý tài khoản",
        actions: [
          { id: 1, action: "Tạo", allowed: false },
          { id: 2, action: "Đọc", allowed: true },
          { id: 3, action: "Cập nhật", allowed: true },
          { id: 4, action: "Xóa", allowed: false },
        ],
      },
      {
        function: "Quản lý phòng ban",
        actions: [
          { id: 5, action: "Tạo", allowed: false },
          { id: 6, action: "Đọc", allowed: true },
          { id: 7, action: "Cập nhật", allowed: true },
          { id: 8, action: "Xóa", allowed: false },
        ],
      },
    ],
  };

  const [permissions, setPermissions] = useState(permissionsData[role.tenQuyen] || []);

  const handlePermissionChange = (functionIndex, actionId) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((permission, index) =>
        index === functionIndex
          ? {
              ...permission,
              actions: permission.actions.map((action) =>
                action.id === actionId
                  ? { ...action, allowed: !action.allowed }
                  : action
              ),
            }
          : permission
      )
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Phân Quyền Người Dùng</h1>

      <table className="min-w-full border-collapse border border-gray-200 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-200 p-3">Chức năng</th>
            <th className="border border-gray-200 p-3">Tạo</th>
            <th className="border border-gray-200 p-3">Đọc</th>
            <th className="border border-gray-200 p-3">Cập nhật</th>
            <th className="border border-gray-200 p-3">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {permissions.length > 0 ? ( // Kiểm tra permissions có tồn tại và có phần tử
            permissions.map((permission, functionIndex) => (
              <tr key={permission.function} className="hover:bg-gray-50">
                <td className="border border-gray-200 p-3">{permission.function}</td>
                {permission.actions.map((action) => (
                  <td
                    key={action.id}
                    className="border border-gray-200 p-3 text-center"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      checked={action.allowed}
                      onChange={() =>
                        handlePermissionChange(functionIndex, action.id)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center border border-gray-200 p-3 text-red-500"
              >
                Không có quyền nào được tìm thấy cho nhóm quyền này.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserPermissions;
