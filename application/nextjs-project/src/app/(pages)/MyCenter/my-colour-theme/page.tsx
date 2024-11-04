import React from "react";

const MyColorThemePage: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Customize Your Color Theme</h1>
      <p className="text-gray-600 mb-4">Choose your color preferences to personalize the interface:</p>

      <div className="space-y-6">
        <div className="p-4 bg-white rounded-md shadow-sm">
          <h2 className="text-lg font-semibold text-blue-700">Primary Color</h2>
          <p className="text-sm text-gray-600">Select the main color that will be used throughout the interface.</p>
        </div>

        <div className="p-4 bg-white rounded-md shadow-sm">
          <h2 className="text-lg font-semibold text-green-700">Secondary Color</h2>
          <p className="text-sm text-gray-600">Choose a complementary color to enhance contrast and style.</p>
        </div>

        <div className="p-4 bg-white rounded-md shadow-sm">
          <h2 className="text-lg font-semibold text-purple-700">Accent Color</h2>
          <p className="text-sm text-gray-600">Add an accent color to highlight important elements.</p>
        </div>
      </div>
    </div>
  );
};

export default MyColorThemePage;
