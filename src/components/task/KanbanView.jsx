import { useState } from "react";
import Column from "./Column";
import { MOCK_DATA } from "./mockData";

export default function (props) {
  const [newGroupTitle, setNewGroupTitle] = useState("");
  return (
    <div className="w-full h-full  flex flex-col">
      <button className="p-2 bg-blue-500 w-fit text-white font-bold mb-4 rounded-md">
        add task
      </button>
      <div className="w-full h-full py-2 text-xl bg-transparent flex overflow-auto">
        {MOCK_DATA.map((group) => {
          return <Column group={group} />;
        })}
        <div className="w-80 p-4 shrink-0 bg-gray-200 h-full mr-4 rounded-xl">
          <input
            type="text"
            className="outline-none border-b-2 border-white px-2 bg-gray-200 w-full mb-2"
            value={newGroupTitle}
            placeholder="New group"
            onChange={(e) => {
              setNewGroupTitle(e.target.value);
            }}
            onBlur={()=>{setNewGroupTitle("")}}
          />

          {newGroupTitle != "" ? (
            <button className="bg-gray-600 w-full rounded-xl font-bold text-white  py-2">
              Add new group
            </button>
          ) : (
            <button disabled className="bg-gray-300 w-full rounded-xl font-bold text-gray-400  py-2">
              Add new group
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
