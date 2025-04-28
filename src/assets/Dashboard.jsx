import { useState } from "react";
import dataInformation from './data.json';
import CSPM from "./CSPM";
import TopBar from "./TopBar";
import CWPP from "./CWPP";
import RegistryScan from "./RegistryScan";
import AddWidget from "./AddWidget";

const Dashboard = () => {
  const [data, setData] = useState(dataInformation.categories);
  const [isAddWidgetOpen, setIsAddWidgetOpen] = useState(false);
  console.log(data);

  return (
    <>
      <div className="grid gap-4 bg-gray-100 p-6">
        <TopBar setIsAddWidgetOpen={setIsAddWidgetOpen} />
        <h1 className="text-3xl font-bold text-gray-700">CNAPP Dashboard</h1>

        {data.map((category) => (
          <div key={category.id}>
            {/* Conditionally render based on which widgets are available */}
            {category?.CSPMwidgets?.length > 0 ? (
              <CSPM key={`cspm-${category.id}`} category={category} setData={setData} setIsAddWidgetOpen={setIsAddWidgetOpen} />
            ) : category?.CWPPwidgets?.length > 0 ? (
              <CWPP key={`cwpp-${category.id}`} category={category} setData={setData} setIsAddWidgetOpen={setIsAddWidgetOpen} />
            ) : category?.Registrywidgets?.length > 0 ? (
              <RegistryScan key={`registry-${category.id}`} category={category} setData={setData} setIsAddWidgetOpen={setIsAddWidgetOpen} />
            ) : null}
          </div>
        ))}
         <AddWidget
        isOpen={isAddWidgetOpen}
        onClose={() => setIsAddWidgetOpen(false)}
        setData={setData}
      />
      </div>
    </>
  );
};

export default Dashboard;
