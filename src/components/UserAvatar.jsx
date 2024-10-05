import { Menu, Transition } from "@headlessui/react"; // Nhập các component Menu và Transition từ thư viện Headless UI
import { Fragment, useState } from "react"; // Nhập Fragment và useState từ React
import { FaUser, FaUserLock } from "react-icons/fa"; // Nhập các biểu tượng từ react-icons
import { IoLogOutOutline } from "react-icons/io5"; // Nhập biểu tượng logout
import { useDispatch, useSelector } from "react-redux"; // Nhập các hook để quản lý state từ Redux
import { useNavigate } from "react-router-dom"; // Nhập hook để điều hướng
import { getInitials } from "../utils"; // Nhập hàm lấy chữ cái đầu tiên của tên

const UserAvatar = () => {
  const [open, setOpen] = useState(false); // Quản lý trạng thái mở của popup cho profile
  const [openPassword, setOpenPassword] = useState(false); // Quản lý trạng thái mở của popup cho thay đổi mật khẩu
  const user = useSelector((state) => state.authen.user);
  console.log(user) // Lấy thông tin người dùng từ state Redux
  const dispatch = useDispatch(); // Khởi tạo dispatch để gửi action
  const navigate = useNavigate(); // Khởi tạo hàm điều hướng

  const logoutHandler = () => {
    console.log("logout"); // Hàm xử lý đăng xuất (chưa có logic thực sự)
  };

  return (
    <>
      <div>
        <Menu as='div' className='relative inline-block text-left'>
          <div>
            <Menu.Button className='w-10 h-10 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-blue-600'>
              <span className='text-white font-semibold'>
                {getInitials(user?.refreshToken)} {/* Hiển thị chữ cái đầu của tên người dùng */}
              </span>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none'>
              <div className='p-4'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpen(true)} // Mở popup profile
                      className='text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base'
                    >
                      <FaUser className='mr-2' aria-hidden='true' />
                      Thông tin {/* Thông cá nhân */}
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpenPassword(true)} // Mở popup thay đổi mật khẩu
                      className={`text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      <FaUserLock className='mr-2' aria-hidden='true' />
                      Thay đổi mật khẩu {/* Thay đổi mật khẩu */}
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logoutHandler} // Gọi hàm đăng xuất
                      className={`text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      <IoLogOutOutline className='mr-2' aria-hidden='true' />
                      Đăng xuất {/* Đăng xuất */}
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default UserAvatar;
