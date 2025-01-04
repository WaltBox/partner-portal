import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Overview from "../components/Overview";
import APIKeys from "../components/APIKeys";
import PlayBook from "../components/PlayBook";
import SpecialButton from "../components/SpecialButton";

const Developers = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <Overview />;
      case "API Keys":
        return <APIKeys />;
      case "Special Button":
        return <SpecialButton />;
      case "PlayBook":
        return <PlayBook />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex">
      <Sidebar active="Developers" partnerName="Sample Partner" />
      <div className="flex-grow p-8 bg-teal-50 min-h-screen">
        <h1 className="text-2xl font-bold text-teal-700 mb-6">Developers</h1>

        <div className="flex space-x-6 border-b-2 border-gray-300 mb-8">
          {["Overview", "API Keys", "Special Button", "PlayBook"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 ${
                activeTab === tab
                  ? "text-teal-700 border-b-4 border-teal-700 font-bold"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Developers;
