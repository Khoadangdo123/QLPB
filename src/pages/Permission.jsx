import React, { useState } from "react";

const UserPermissions = () => {
  const roles = [
    { id: 1, name: "Admin" },
    { id: 2, name: "User" },
    { id: 3, name: "Manager" },
  ];

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
  };

  const [selectedRole, setSelectedRole] = useState(roles[0].name);
  const [permissions, setPermissions] = useState(permissionsData[roles[0].name]);

  const handleRoleChange = (event) => {
    const roleName = event.target.value;
    setSelectedRole(roleName);
    setPermissions(permissionsData[roleName]);
  };

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
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Phân Quyền Người Dùng</h1>
      <div className="mb-4">
        <label className="mr-2">Chọn nhóm quyền:</label>
        <select
          value={selectedRole}
          onChange={handleRoleChange}
          className="border p-2"
        >
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
      </div>
      <table className="min-w-full border-collapse border border-gray-300 mb-3">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Chức năng</th>
            <th className="border border-gray-300 p-2">Tạo</th>
            <th className="border border-gray-300 p-2">Đọc</th>
            <th className="border border-gray-300 p-2">Cập nhật</th>
            <th className="border border-gray-300 p-2">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission, functionIndex) => (
            <tr key={permission.function} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{permission.function}</td>
              {permission.actions.map((action) => (
                <td key={action.id} className="border border-gray-300 p-2">
                  <input
                    type="checkbox"
                    checked={action.allowed}
                    onChange={() => handlePermissionChange(functionIndex, action.id)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPermissions;
