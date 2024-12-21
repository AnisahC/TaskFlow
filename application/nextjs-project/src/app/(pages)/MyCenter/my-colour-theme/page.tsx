"use client";

import React, { useState, useEffect } from "react";

const MyColorThemePage: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState("#ff9999");
  const [secondaryColor, setSecondaryColor] = useState("#ccffcc");
  const [accentColor, setAccentColor] = useState("#ff99cc");

  // Load saved theme from localStorage
  useEffect(() => {
    const savedPrimary = localStorage.getItem("primaryColor");
    const savedSecondary = localStorage.getItem("secondaryColor");
    const savedAccent = localStorage.getItem("accentColor");

    if (savedPrimary) setPrimaryColor(savedPrimary);
    if (savedSecondary) setSecondaryColor(savedSecondary);
    if (savedAccent) setAccentColor(savedAccent);

    applyTheme(savedPrimary || primaryColor, savedSecondary || secondaryColor, savedAccent || accentColor);
  }, []);

  // Update the theme globally
  const applyTheme = (primary: string, secondary: string, accent: string) => {
    document.documentElement.style.setProperty("--primary-color", primary);
    document.documentElement.style.setProperty("--secondary-color", secondary);
    document.documentElement.style.setProperty("--accent-color", accent);
  };

  const handleSaveTheme = () => {
    localStorage.setItem("primaryColor", primaryColor);
    localStorage.setItem("secondaryColor", secondaryColor);
    localStorage.setItem("accentColor", accentColor);

    applyTheme(primaryColor, secondaryColor, accentColor);
    alert("Theme saved successfully!");
  };

  return (
    <div className="p-8 bg-pink-50 rounded-xl shadow-lg min-h-screen">
      <h1
        className="text-3xl font-bold mb-6"
        style={{ color: "var(--primary-color)" }}
      >
        Customize Your Color Theme
      </h1>
      <div className="space-y-6">
        {/* Primary Color */}
        <div>
          <label className="block font-medium mb-2" style={{ color: "var(--primary-color)" }}>
            Primary Color:
          </label>
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="cursor-pointer"
          />
        </div>

        {/* Secondary Color */}
        <div>
          <label className="block font-medium mb-2" style={{ color: "var(--secondary-color)" }}>
            Secondary Color:
          </label>
          <input
            type="color"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
            className="cursor-pointer"
          />
        </div>

        {/* Accent Color */}
        <div>
          <label className="block font-medium mb-2" style={{ color: "var(--accent-color)" }}>
            Accent Color:
          </label>
          <input
            type="color"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            className="cursor-pointer"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveTheme}
          className="mt-6 px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
        >
          Save Theme
        </button>
      </div>
    </div>
  );
};

export default MyColorThemePage;
