import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="container mx-auto px-10">
      <nav className="bg-zinc-800 my-4 flex justify-between py-5 px-10 rounded-lg relative">
        <Link to="/">
          <h1
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold hover:text-blue-300 active:scale-95"
          >
            Task Manager
          </h1>
        </Link>

        <span
          onClick={toggleMenu}
          className="flex items-center cursor-pointer text-3xl hover:text-blue-300 hover:scale-105 transition-all will-change-transform md:hidden"
        >
          &#x2630;
        </span>

        <ul
          className={`${
            isOpen ? "scale-y-100 transition-all " : "scale-y-0"
          } flex items-center gap-x-4 absolute bg-zinc-800  py-6 flex-col w-full left-0 top-3/4 text-center gap-y-4  rounded-e-lg rounded-s-lg origin-top md:static md:scale-100 md:transition-none md:flex-row md:py-0 md:w-auto will-change-transform`}
        >
          {isAuthenticated ? (
            <>
              <li>
                Welcome <span className="text-blue-400">{user.username}</span>{" "}
              </li>
              <li className="hover:text-blue-400">
                <Link onClick={() => setIsOpen(false)} to="/add-task">
                  Add Task
                </Link>
              </li>
              <li className="hover:text-blue-400">
                <Link onClick={() => setIsOpen(false)} to="/tasks">
                  Tasks
                </Link>
              </li>
              <li>
                <Link
                  className="bg-blue-500 px-4 py-1 rounded-sm"
                  to="/"
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-blue-300 active:scale-95">
                <Link onClick={() => setIsOpen(false)} to="/login">
                  Login
                </Link>
              </li>
              <li className="hover:text-blue-300  active:scale-95">
                <Link onClick={() => setIsOpen(false)} to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
