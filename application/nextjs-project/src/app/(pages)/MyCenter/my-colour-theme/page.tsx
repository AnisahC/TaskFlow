"use client";

import React, { useState } from "react";

const MyColorThemePage: React.FC = () => {
  // State to store the selected colors
  const [primaryColor, setPrimaryColor] = useState("#ff9999"); // Darker pink
  const [secondaryColor, setSecondaryColor] = useState("#ccffcc"); // Light green
  const [accentColor, setAccentColor] = useState("#ff99cc"); // Pink

  return (
    <div className="p-8 bg-pink-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Customize Your Color Theme
      </h1>
      <p className="text-green-600 mb-4">
        Choose your color preferences to personalize the interface:
      </p>

      <div className="space-y-6">
        {/* Primary Color Section */}
        <div
          className="p-4 bg-white rounded-md shadow-sm border-2"
          style={{ borderColor: primaryColor }}
        >
          <h2
            className="text-lg font-semibold"
            style={{ color: primaryColor }}
          >
            Primary Color
          </h2>
          <p className="text-sm text-green-600">
            Select the main color that will be used throughout the interface.
          </p>
          <input
            type="color"
            className="mt-3 cursor-pointer"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            aria-label="Select primary color"
          />
        </div>

        {/* Secondary Color Section */}
        <div
          className="p-4 bg-white rounded-md shadow-sm border-2"
          style={{ borderColor: secondaryColor }}
        >
          <h2
            className="text-lg font-semibold"
            style={{ color: secondaryColor }}
          >
            Secondary Color
          </h2>
          <p className="text-sm text-green-600">
            Choose a complementary color to enhance contrast and style.
          </p>
          <input
            type="color"
            className="mt-3 cursor-pointer"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
            aria-label="Select secondary color"
          />
        </div>

        {/* Accent Color Section */}
        <div
          className="p-4 bg-white rounded-md shadow-sm border-2"
          style={{ borderColor: accentColor }}
        >
          <h2
            className="text-lg font-semibold"
            style={{ color: accentColor }}
          >
            Accent Color
          </h2>
          <p className="text-sm text-green-600">
            Add an accent color to highlight important elements.
          </p>
          <input
            type="color"
            className="mt-3 cursor-pointer"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            aria-label="Select accent color"
          />
        </div>
      </div>
    </div>
  );
};

export default MyColorThemePage;
