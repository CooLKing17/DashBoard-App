import { useState } from "react";
import widgetsData from './data.json'; // Import the JSON data

const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredWidgets, setFilteredWidgets] = useState([]);

  // Function to handle the search input
  const searchHandle = (e) => {
    const query = e.target.value;
    setSearchValue(query);

    // If the query is empty, clear the filtered widgets
    if (query === "") {
      setFilteredWidgets([]); // No widgets will be shown when search input is cleared
      return;
    }

    // Filter the widgets based on the search query
    const filtered = widgetsData.categories.flatMap((category) => {
      const categoryWidgets = [
        ...(category.CSPMwidgets || []),
        ...(category.CWPPwidgets || []),
        ...(category.Registrywidgets || []),
      ];
      return categoryWidgets.filter((widget) =>
        widget.name.toLowerCase().includes(query.toLowerCase())
      );
    });

    setFilteredWidgets(filtered); // Set the filtered widgets
  };

  return (
    <>
      {/* Navbar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* Left side */}
        <div className="w-full md:w-auto text-gray-600 text-sm">
          Home &gt; <span className="text-blue-600 font-semibold">Dashboard V2</span>
        </div>

        {/* Right side */}
        <div className="w-full md:w-auto flex items-center justify-between gap-4">
          <input
            type="text"
            value={searchValue}
            onChange={searchHandle}
            placeholder="Search widgets..."
            className="border border-blue-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 rounded-md px-4 py-2 flex-1 min-w-0 outline-none"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/128/2645/2645897.png"
            aria-hidden="true"
            className="h-6 w-6 shrink-0"
          />
          <div className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
              className="h-8 w-8 rounded-full shrink-0"
              alt="Profile"
            />
            <h5 className="text-gray-700 font-medium">Name</h5>
          </div>
        </div>
      </div>

      {/* Display filtered widgets */}
      <div className="grid grid-cols-2 gap-4">
        {filteredWidgets.length > 0 ? (
          filteredWidgets.map((widget) => (
            <div key={widget.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{widget.name}</h3>
              <div className="flex flex-wrap gap-2">
                {widget.statuses.map((status, idx) => (
                  <span key={idx} className="text-sm text-gray-500">
                    {status.status}: {status.count}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};

export default NavBar;
