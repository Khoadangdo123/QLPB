
const mapColor = new Map()
mapColor.set("unset", "text-gray-500")
mapColor.set("low", "text-blue-500")
mapColor.set("medium", "text-amber-600")
mapColor.set("high", "text-red-500")

export default function (props) {
  const { items, selectedItem, setSelectedItem } = props;
  return (
    <select
      id="priority"
      value={selectedItem || "unset"}
      className = {`rounded-full w-fit px-2 py-1 outline-none bg-transparent border-none font-bold ${mapColor?.get(selectedItem)}`}
    >
      <option className="bg-white text-black" value="unset">Unset</option>
      {items.map((priority) => {
        return <option className="bg-white text-black" value={priority.id}>{priority.name}</option>;
      })}
    </select>
  );
}
