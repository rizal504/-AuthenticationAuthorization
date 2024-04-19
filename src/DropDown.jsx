import React, { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/outline";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Logika untuk proses logout di sini
    // Misalnya, menghapus token dari localStorage dan mengarahkan pengguna ke halaman login
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown}>
        <UserCircleIcon className="h-12 w-12 text-slate-200 mr-1 pl-1 flex items-center justify-center" />
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {/* Nama profil pengguna */}
            <div className="px-4 py-2 text-sm text-gray-700">Nama Pengguna</div>
            <hr className="border-gray-200" />
            {/* Tombol logout */}
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-gray-100"
              role="menuitem"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
