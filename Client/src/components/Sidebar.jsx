 import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-52 bg-gradient-to-b from-gray-800 to-gray-700 text-white sticky top-0">
      <div className="p-4 font-bold text-lg border-b border-gray-600">
        Admin Panel
      </div>
      <nav className="mt-4 px-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"
              }
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/product"
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"
              }
            >
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
