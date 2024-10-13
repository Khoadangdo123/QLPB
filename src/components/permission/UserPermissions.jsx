import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPermissionById } from "../../redux/permission/permissionSlice";

const UserPermissions = ({ role, onClose }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const data=useSelector((state)=>state.permissions.list)
  const allPermissionsData = [
    {
      function: "Quản lý tài khoản",
      actions: [
        { id: 1, action: "Xem", allowed: false },
        { id: 2, action: "Thêm", allowed: false },
        { id: 3, action: "Sửa", allowed: false },
        { id: 4, action: "Xóa", allowed: false },
      ],
    },
    {
      function: "Quản lý phòng ban",
      actions: [
        { id: 5, action: "Xem", allowed: false },
        { id: 6, action: "Thêm", allowed: false },
        { id: 7, action: "Sửa", allowed: false },
        { id: 8, action: "Xóa", allowed: false },
      ],
    },
    // Add more functions as needed
    {
      function: "Quản lý dự án",
      actions: [
        { id: 9, action: "Xem", allowed: false },
        { id: 10, action: "Thêm", allowed: false },
        { id: 11, action: "Sửa", allowed: false },
        { id: 12, action: "Xóa", allowed: false },
      ],
    },
    {
      function: "Quản lý báo cáo",
      actions: [
        { id: 13, action: "Xem", allowed: false },
        { id: 14, action: "Thêm", allowed: false },
        { id: 15, action: "Sửa", allowed: false },
        { id: 16, action: "Xóa", allowed: false },
      ],
    },
    // Continue adding other functions as necessary
  ];

  // State to manage actions for the selected role
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    // Populate permissions with all functions
    const updatedPermissions = allPermissionsData.map((perm) => {
      // Logic to determine if the action is allowed can be added here
      const actions = perm.actions.map((action) => {
        return { ...action, allowed: false }; // Set default allowed to false
      });
      return { ...perm, actions };
    });

    setPermissions(updatedPermissions);
  }, [role]);

  const handleCheckboxChange = (permissionId) => {
    const isChecked = permissions.find(perm => perm.function === permissionId)?.actions.every(action => action.allowed);
    setPermissions((prevPermissions) =>
      prevPermissions.map((perm) =>
        perm.function === permissionId
          ? {
              ...perm,
              actions: perm.actions.map((action) => ({
                ...action,
                allowed: !isChecked // Toggle all actions based on current state
              })),
            }
          : perm
      )
    );
  };

  const handleActionChange = (permissionId, actionId) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((perm) =>
        perm.function === permissionId
          ? {
              ...perm,
              actions: perm.actions.map((action) =>
                action.id === actionId
                  ? { ...action, allowed: !action.allowed }
                  : action
              ),
            }
          : perm
      )
    );
  };

  const handleSave = () => {
    // Dispatch an action to save the permissions for the role
    // dispatch(savePermissions({ roleId: role.maQuyen, permissions }));
    onClose();
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Quyền cho {role.tenQuyen}</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Chức năng</th>
            <th className="py-2 px-4 border">Xem</th>
            <th className="py-2 px-4 border">Thêm</th>
            <th className="py-2 px-4 border">Sửa</th>
            <th className="py-2 px-4 border">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <React.Fragment key={permission.function}>
              <tr>
                <td className="py-2 px-4 border">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={permission.actions.every(action => action.allowed)}
                      onChange={() => handleCheckboxChange(permission.function)}
                    />
                    <span className="ml-2">{permission.function}</span>
                  </label>
                </td>
                {permission.actions.map((action) => (
                  <td key={action.id} className="py-2 px-4 border">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={action.allowed}
                        onChange={() => handleActionChange(permission.function, action.id)}
                      />
                      <span className="ml-2">{action.allowed ? "Có" : "Không"}</span>
                    </label>
                  </td>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Lưu
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2"
          onClick={onClose}
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default UserPermissions;
