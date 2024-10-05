import { faker } from "@faker-js/faker";
import { MdKeyboardArrowDown } from "react-icons/md";
import PrioritySelection from "../Selection";
import { formatDate } from "../../utils";
import TaskGroup from "./TaskGroup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSections } from "../../redux/section/sectionSlice";
const ListView=({phanDuAn})=> {
  console.log(phanDuAn)
  return (
    <div className="w-full bg-transparent">
      {/* <button className="p-2 bg-blue-500 text-white font-bold mb-4 rounded-md">
        add task
      </button> */}
      <div className="text-xl bg-transparent">
        <div className="w-full flex border-y-2 py-2 px-4 font-bold -mb-2 bg-white shadow-sm">
          <div className="flex-1 px-4 ">Công Việc</div>
          <div className="flex-1 border-l px-4 ">Mức Độ Ưu Tiên</div>
          <div className="flex-1 border-l px-4 ">Ngày Hết Hạn</div>
          <div className="flex-1 border-l px-4 ">Nhóm</div>
          <div className="flex-1 border-l px-4 ">Giai Đoạn</div>
        </div>
        {phanDuAn.map((item) => {
          return <TaskGroup phanduan={item}/>;
          //console.log(item,1)
        })}
      </div>
    </div>
  );
}
export default ListView;
