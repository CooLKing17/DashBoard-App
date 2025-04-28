const CSPM = ({ category, setIsAddWidgetOpen, setData }) => {
  console.log("Received Category:", category);

  const data = category?.CSPMwidgets || [];

  const handleRemoveWidget = (widgetId) => {
    setData((prevData) =>
      prevData.map((cat) => {
        if (cat.id === category.id) {
          return {
            ...cat,
            CSPMwidgets: cat.CSPMwidgets.filter((widget) => widget.id !== widgetId),
          };
        }
        return cat;
      })
    );
  };

  return (
    <div className="mb-6">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-4">{category?.name}</h2>

      {/* Flex container for Widgets */}
      <div className="flex flex-wrap justify-center gap-6 max-w-screen-xl mx-auto">
        {data.map((widget) => (
          <div
            key={widget.id}
            className="relative bg-white p-6 rounded-lg shadow-md max-w-sm flex-1 min-w-[250px]"
          >
            {/* Remove Button */}
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => handleRemoveWidget(widget.id)}
            >
              ✖
            </button>

            <h3 className="text-lg font-semibold mb-4">{widget.name}</h3>

            <div className="flex items-center justify-between mt-4">
              {/* Circle */}
              <div className="w-20 h-20 bg-blue-100 flex items-center justify-center rounded-full">
                <span className="text-2xl font-bold">
                  {widget.statuses.reduce((sum, status) => sum + status.count, 0)}
                </span>
              </div>

              {/* Statuses List */}
              <div className="space-y-2 ml-4">
                {widget.statuses.map((statusItem, idx) => (
                  <p key={idx} className="text-sm text-gray-600">
                    {statusItem.status} ({statusItem.count})
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Add Widget Button (Styled to Match the Widgets) */}
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

export default CSPM;
