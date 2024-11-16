import { Tab } from "@headlessui/react";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs, setSelected, children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("TRUNG BÌNH");
  const [status, setStatus] = useState("Đang thực hiện");
  return (
    <div className='w-full px-1 sm:px-0'>
      <div className='mb-4 space-y-4'>
        {/* Input tìm kiếm */}
        <div className="w-full">
          <input
            type="text"
            placeholder="Tìm kiếm công việc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Chọn thời gian bắt đầu */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-1/2">
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Chọn mức độ */}
        <div className="w-full">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="CAO">CAO</option>
            <option value="TRUNG BÌNH">TRUNG BÌNH</option>
            <option value="BÌNH THƯỜNG">BÌNH THƯỜNG</option>
            <option value="THẤP">THẤP</option>
          </select>
        </div>

        {/* Chọn trạng thái */}
        <div className="w-full">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Đang thực hiện">Đang thực hiện</option>
            <option value="Đã hoàn thành">Đã hoàn thành</option>
            <option value="Trì hoãn">Trì hoãn</option>
          </select>
        </div>
      </div>

      <Tab.Group>
        <Tab.List className='flex space-x-6 rounded-xl p-1'>
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) =>
                classNames(
                  "w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white",

                  selected
                    ? "text-blue-700  border-b-2 border-blue-600"
                    : "text-gray-800  hover:text-blue-800"
                )
              }
            >
              {tab.icon}
              <span>{tab.title}</span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='w-full mt-2'>{children}</Tab.Panels>
      </Tab.Group>
    </div>
  );
}
