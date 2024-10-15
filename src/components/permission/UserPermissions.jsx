import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPermissionById, updatePermission } from "../../redux/permission/permissionSlice";
import { fetchFunctions } from "../../redux/function/functionSlice";
import { addPermissionDetail } from "../../redux/permissiondetail/permissionDetailSlice";

const UserPermissions = ({ role, onClose }) => {
  const maQuyen = role.maQuyen;
  const [permissions, setPermissions] = useState([]);
  const dispatch = useDispatch();

  const functions = useSelector((state) => state.functions.list);
  const permissionsByRole = useSelector((state) =>
    state.permissions.list.find((nhomquyen) => nhomquyen.maQuyen === maQuyen)
  );
  useEffect(() => {
    dispatch(fetchFunctions({ search: "", page: 10 }));
    dispatch(fetchPermissionById(maQuyen));
  }, [dispatch, maQuyen]);
  // console.log(functions);
  // console.log(permissionsByRole);
  useEffect(() => {
    if (!permissionsByRole || !permissionsByRole.chiTietQuyens) return;

    const updatedPermissions = functions.map((func) => {
      const actions = ["Xem", "Thêm", "Sửa", "Xóa"].map((action, index) => {
        const chiTietQuyen = permissionsByRole.chiTietQuyens.find(
          (perm) =>
            perm.maChucNang === func.maChucNang && perm.hanhDong === action
        );
        const allowed = !!chiTietQuyen;

        return {
          id: index + 1,
          action,
          allowed,
          maChiTietQuyen: chiTietQuyen ? chiTietQuyen.maChiTietQuyen : null,
        };
      });

      return {
        function: func.tenChucNang,
        functionId: func.maChucNang,
        actions,
      };
    });

    setPermissions(updatedPermissions);
  }, [functions, permissionsByRole]);

  const handleCheckboxChange = (permissionId) => {
    console.log("-----------");
    const permission = permissions.find(
      (perm) => perm.function === permissionId
    );
    const maChucNang = permission.functionId;
    const maQuyen = role.maQuyen;
    const isChecked = permission.actions.every((action) => action.allowed);
    console.log("maQuyen:", maQuyen);
    console.log("maChucNang:", maChucNang);
    console.log("Chọn toàn bộ hành động:", !isChecked);

    permission.actions.forEach((action) => {
      console.log("Action:", action.action);
      console.log(
        "maChiTietQuyen:",
        action.maChiTietQuyen || "Chưa có quyền chi tiết"
      );
    });
    setPermissions((prevPermissions) =>
      prevPermissions.map((perm) =>
        perm.function === permissionId
          ? {
              ...perm,
              actions: perm.actions.map((action) => ({
                ...action,
                allowed: !isChecked,
              })),
            }
          : perm
      )
    );
  };

  const handleActionChange = (permissionId, actionId) => {
    const permission = permissions.find(
      (perm) => perm.function === permissionId
    );
    const action = permission.actions.find((action) => action.id === actionId);
    const maChucNang = permission.functionId;
    const actionName = action.action;
    const maChiTietQuyen = action.maChiTietQuyen;
    const maQuyen = role.maQuyen;
    const status=!action.allowed;
    console.log("maQuyen:", maQuyen);
    console.log("maChucNang:", maChucNang);
    console.log("Action Name:", actionName);
    console.log("maChiTietQuyen:", maChiTietQuyen);
    console.log("status:",status)
    let chitietquyen={
      maQuyen:maQuyen,
      maChucNang:maChucNang,
      hanhDong:actionName
    }
    //
    try{
      if(maChiTietQuyen===null){
        console.log(chitietquyen)
        //dispatch(addPermissionDetail(chitietquyen))
      }else{
        if(maChiTietQuyen!==null && status===true){
          //dispatch(updatePermission(chitietquyen))
          console.log(chitietquyen)
        }
        if(maChiTietQuyen!==null && status===false){
          chitietquyen.hanhDong="x";
          console.log(chitietquyen)
          //dispatch(updatePermission(chitietquyen))
        }
      }
    }catch(e){

    }
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
    const selectedPermissions = permissions
      .map((perm) => {
        const selectedActions = perm.actions
          .filter((action) => action.allowed)
          .map((action) => ({
            action: action.action,
            maChiTietQuyen: action.maChiTietQuyen,
          }));

        return selectedActions.length > 0
          ? {
              role: maQuyen,
              functionName: perm.function,
              functionId: perm.functionId,
              actions: selectedActions,
            }
          : null;
      })
      .filter((perm) => perm !== null);

    selectedPermissions.forEach((item) => {
      console.log("-----------");
      console.log("Function ID:", item.functionId, "Role:", item.role);
      item.actions.forEach((actionItem) => {
        console.log(
          "Action:",
          actionItem.action,
          "maChiTietQuyen:",
          actionItem.maChiTietQuyen
        );
      });
      console.log("-----------");
    });
    // onClose();
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
                      checked={permission.actions.every(
                        (action) => action.allowed
                      )}
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
                        onChange={() =>
                          handleActionChange(permission.function, action.id)
                        }
                      />
                      <span className="ml-2">
                        {action.allowed ? "Có" : "Không"}
                      </span>
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
