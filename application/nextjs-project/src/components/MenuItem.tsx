import React from "react";
import { Link } from "react-router-dom";

interface MenuItemProps {
  icon: string;
  label: string;
  to: string;
  isActive?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, to, isActive }) => {
  return (
    <Link to={to} className={`menu-item ${isActive ? "active" : ""}`}>
      <img src={icon} alt={`${label} icon`} className="menu-item-icon" />
      <span className="menu-item-label">{label}</span>
    </Link>
  );
};

export default MenuItem;
