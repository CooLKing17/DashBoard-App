import React from 'react';

const RegistryScan = ({ category, setIsAddWidgetOpen, setData }) => {
  const widgets = category?.Registrywidgets || [];
  
  const handleRemoveWidget = (widgetId) => {
    setData((prevData) =>
      prevData.map((cat) => {
        if (cat.id === category.id) {
          return {
            ...cat,
            Registrywidgets: cat.Registrywidgets.filter((widget) => widget.id !== widgetId),
          };
        }
        return cat;
      })
    );
  };

  return (
    <div className="mb-6 bg-gray-100 rounded-md">
      <h2 className="text-xl font-semibold mb-4">{category?.name}</h2>

      {/* Flex container for cards + add button */}
      <div className="flex flex-wrap gap-6 max-w-screen-xl justify-center mx-auto">
        {widgets.map((widget, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-md min-w-[400px] flex flex-col justify-center relative"  // Added relative positioning
          >
            {/* Remove Button */}
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => handleRemoveWidget(widget.id)}
            >
              ✖
            </button>

            <h3 className="text-lg font-semibold">{widget.name}</h3>

            <p className="text-sm text-gray-600 mt-2">
              {widget.statuses.reduce((sum, status) => sum + status.count, 0)} Total
            </p>

            {/* Progress Bar */}
            <div className="mt-3 h-2 bg-gray-200 rounded">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-blue-500"
                style={{ width: '80%' }}
              ></div>
            </div>

            {/* Status List */}
            <div className="flex flex-wrap justify-between mt-3 text-sm">
              {widget.statuses.map((status, statusIdx) => (
                <span
                  key={statusIdx}
                  className={
                    status.status === 'Critical'
                      ? 'text-red-600'
                      : status.status === 'High'
                      ? 'text-yellow-600'
                      : status.status === 'Medium'
                      ? 'text-green-600'
                      : 'text-blue-600'
                  }
                >
                  {status.status} ({status.count})
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Add Widget Card */}
        <div className="bg-white p-6 rounded-lg shadow-md max-w-sm flex-1 min-w-[250px] flex justify-center items-center">
          <button
            className="border-2 border-dashed border-gray-300 p-8 rounded-lg text-gray-400 hover:border-blue-400 hover:text-blue-600 w-full"
            onClick={() => {
              console.log("Add Widget button clicked");
              setIsAddWidgetOpen(true);
            }}
          >
            + Add Widget
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistryScan;
