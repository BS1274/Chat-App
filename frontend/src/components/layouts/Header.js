import { LogoutIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logout from "../accounts/Logout";
import ThemeToggler from "./ThemeToggler";

export default function Header() {
  // State to control the logout modal
  const [modal, setModal] = useState(false);

  // Accessing currentUser from AuthContext
  const { currentUser } = useAuth();

  return (
    <>
      {/* Navigation bar */}
      <nav className="px-2 sm:px-4 py-2.5 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-900 text-sm rounded border dark:text-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex">
            <span className="self-center text-lg font-semibold whitespace-nowrap text-gray-900 dark:text-white">
              Chat App
            </span>
          </Link>
          {/* Navigation links and user actions */}
          <div className="flex md:order-2">
            {/* Theme toggler */}
            <ThemeToggler />
            {/* Logout button and profile link */}
            {currentUser && (
              <>
                {/* Logout button */}
                <button
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5"
                  onClick={() => setModal(true)}
                >
                  <LogoutIcon className="h-8 w-8" aria-hidden="true" />
                </button>
                {/* Profile link */}
                <Link
                  to="/profile"
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-full text-sm p-2.5"
                >
                  <img
                    className="h-10 w-10 rounded-full"
                    src={currentUser.photoURL}
                    alt=""
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {/* Logout modal */}
      {modal && <Logout modal={modal} setModal={setModal} />}
    </>
  );
}
