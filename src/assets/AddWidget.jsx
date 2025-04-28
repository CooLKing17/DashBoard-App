import React, { useState } from 'react';

const AddWidget = ({ isOpen, onClose, setData }) => {
  const [widgetType, setWidgetType] = useState(''); // Empty initially
  const [widgetId, setWidgetId] = useState(""); // Widget ID input
  const [widgetName, setWidgetName] = useState(""); // Widget Name input
  const [statuses, setStatuses] = useState([{ status: "", count: 0 }]); // Dynamic Statuses
  const [widgets, setWidgets] = useState([]); // Store multiple widgets

  const handleStatusChange = (index, field, value) => {
    const newStatuses = [...statuses];
    newStatuses[index][field] = field === "count" ? parseInt(value, 10) : value;
    setStatuses(newStatuses);
  };

  const handleAddStatusField = () => {
    setStatuses([...statuses, { status: "", count: 0 }]);
  };

  // Handle adding a new widget
  const handleAddWidget = () => {
    const newWidget = {
      id: widgetId,
      name: widgetName,
      statuses,
    };
    setWidgets([...widgets, newWidget]); // Add the new widget to the widgets array
    setWidgetId(""); // Reset input fields
    setWidgetName("");
    setStatuses([{ status: "", count: 0 }]); // Reset statuses for the next widget
  };

  const handleSubmit = () => {
    if (!widgetType) {
      alert('Please select a widget type first.');
      return;
    }
    if (!widgetName.trim()) {
      alert('Please enter a widget name.');
      return;
    }

    setData((prevData) =>
      prevData.map((category) => {
        const match =
          (widgetType === 'Registry' && category.id === 'registry-scan') ||
          (widgetType === 'CWPP' && category.id === 'cwpp-dashboard') ||
          (widgetType === 'CSPM' && category.id === 'cspm-executive');

        if (match) {
          const widgetKey =
            widgetType === 'Registry' ? 'Registrywidgets' :
            widgetType === 'CWPP' ? 'CWPPwidgets' :
            'CSPMwidgets';

          const updatedWidgets = [...(category[widgetKey] || [])];

          updatedWidgets.push({
            id: `widget-${Date.now()}`,
            name: widgetName,
            statuses: [],
          });

          return { ...category, [widgetKey]: updatedWidgets };
        }
        return category;
      })
    );

    setWidgetName(''); // Only reset widgetName, not widgetType
    // setWidgetType('');   (optional: you can also clear it if you want)
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
      <div className="bg-white h-full w-1/2 p-8 flex flex-col justify-between">
        
        {/* Top Section */}
        <div>
          {/* Widget Type Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Select Widget Type
            </label>
            <div className="flex gap-4 flex-wrap">
              {['Registry', 'CWPP', 'CSPM'].map((type) => (
                <button
                  key={type}
                  onClick={() => setWidgetType(type)}
                  className={`px-4 py-2 rounded-full border transition ${
                    widgetType === type
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Widget Type (Optional Display) */}
          {widgetType && (
            <div className="mb-4 text-blue-600 font-semibold">
              Selected: {widgetType}
            </div>
          )}

          {/* Widget ID Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Widget ID</label>
            <input
              type="text"
              value={widgetId}
              onChange={(e) => setWidgetId(e.target.value)}
              placeholder="Enter Widget ID"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Widget Name Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Widget Name</label>
            <input
              type="text"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              placeholder="Enter Widget Name"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidget;
