// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchDepartments } from '../../redux/departments/departmentSlice';

// const DepartmentSelect = ({ selected, setSelected }) => {
//     const dispatch = useDispatch();
//     const phongbans = useSelector((state) => state.departments.list);

//     useEffect(() => {
//         dispatch(fetchDepartments({ search: '', page: 10 }));
//     }, [dispatch]);

//     const handleSelectChange = (e) => {
//         const value = e.target.value;
//         if (selected.includes(value)) {
//             setSelected(selected.filter(item => item !== value));
//         } else {
//             setSelected([...selected, value]);
//         }
//         console.log(selected)
//     };

//     const handleRemoveDepartment = (value) => {
//         setSelected(selected.filter(item => item !== value));
//     };

//     return (
//         <div className='flex flex-col'>
//             <label className="block text-sm font-medium text-gray-700">Phòng Ban</label>
//             <select
//                 onChange={handleSelectChange}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             >
//                 <option value="">Chọn phòng ban</option>
//                 {phongbans.map((item) => (
//                     <option key={item.maPhongBan} value={item.maPhongBan}>
//                         {item.tenPhongBan}
//                     </option>
//                 ))}
//             </select>
//             <div className="mt-4">
//                 {selected.length > 0 && (
//                     <div className="flex flex-col gap-2">
//                         <span className="font-medium text-gray-700">Các phòng ban đã chọn:</span>
//                         <div className="flex flex-wrap gap-2">
//                             {selected.map((item) => {
//                                 const department = phongbans.find(p => p.maPhongBan === Number(item));
//                                 return (
//                                     <div key={item} className="flex items-center bg-blue-100 text-blue-800 rounded px-2 py-1">
//                                         <span>{department?.tenPhongBan}</span>
//                                         <button
//                                             className="ml-2 text-red-500"
//                                             onClick={() => handleRemoveDepartment(item)}
//                                         >
//                                             &times;
//                                         </button>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default DepartmentSelect;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from '../../redux/departments/departmentSlice';

const DepartmentSelect = ({ selected, setSelected }) => {
    const dispatch = useDispatch();
    const phongbans = useSelector((state) => state.departments.list);
    const [responsiblePerson, setResponsiblePerson] = useState('');

    useEffect(() => {
        dispatch(fetchDepartments({ search: '', page: 10 }));
    }, [dispatch]);

    const handleSelectChange = (e) => {
        const value = e.target.value;
        if (selected.includes(value)) {
            setSelected(selected.filter(item => item !== value));
        } else {
            setSelected([...selected, value]);
        }

        // Lấy trưởng phòng tương ứng với phòng ban đã chọn
        const selectedDepartment = phongbans.find(p => p.maPhongBan === Number(value));
        if (selectedDepartment && selectedDepartment.truongPhong) {
            setResponsiblePerson(selectedDepartment.truongPhong.tenNhanVien); // Đặt tên trưởng phòng
        } else {
            setResponsiblePerson(''); // Reset nếu không có trưởng phòng
        }
    };

    const handleRemoveDepartment = (value) => {
        setSelected(selected.filter(item => item !== value));
        // Xóa tên trưởng phòng khi xóa phòng ban
        if (responsiblePerson && selected.includes(value)) {
            setResponsiblePerson('');
        }
    };

    return (
        <div className='flex flex-col'>
            <label className="block text-sm font-medium text-gray-700">Phòng Ban</label>
            <select
                onChange={handleSelectChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
                <option value="">Chọn phòng ban</option>
                {phongbans.map((item) => (
                    <option key={item.maPhongBan} value={item.maPhongBan}>
                        {item.tenPhongBan}
                    </option>
                ))}
            </select>
            <div className="mt-4">
                {selected.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <span className="font-medium text-gray-700">Các phòng ban đã chọn:</span>
                        <div className="flex flex-wrap gap-2">
                            {selected.map((item) => {
                                const department = phongbans.find(p => p.maPhongBan === Number(item));
                                return (
                                    <div key={item} className="flex items-center bg-blue-100 text-blue-800 rounded px-2 py-1">
                                        <span>{department?.tenPhongBan}</span>
                                        <button
                                            className="ml-2 text-red-500"
                                            onClick={() => handleRemoveDepartment(item)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
            {responsiblePerson && (
                <div className="mt-4">
                    <span className="font-medium text-gray-700">Người chịu trách nhiệm: {responsiblePerson}</span>
                </div>
            )}
        </div>
    );
};

export default DepartmentSelect;

