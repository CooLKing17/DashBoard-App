const TopBar = ({ setIsAddWidgetOpen }) => {
  return (
    <>
      <div className="flex justify-end mb-6 space-x-2">
        <button className="bg-white border px-4 py-2 rounded-md shadow text-sm font-semibold hover:bg-gray-50"
         onClick={() => {
          console.log("Add Widget button clicked");
          setIsAddWidgetOpen(true);
        }}
        >
          Add Widget
        </button>
        <button className="bg-white border px-2 py-2 rounded-md shadow hover:bg-gray-50">
          ⚙️
        </button>
        <select className="border px-4 py-2 rounded-md shadow text-sm font-semibold">
          <option>Last 2 days</option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>
      </div>
    </>
  );
}

export default TopBar;
