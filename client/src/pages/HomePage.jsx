import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex items-center justify-center w-full">
      <div className=" bg-zinc-800 p-14 rounded-lg text-center ">
        <h1 className="text-3xl text-blue-400 mb-2">Welcome to Task Manager</h1>
        <h2 className="text-xl mb-8">Manage your tasks effortlessly</h2>

        <div className="mb-4">
          <p>Access Your Tasks:</p>
          <Link
            className="text-sky-500 text-xl hover:text-blue-400"
            to="/login"
          >
            Log In
          </Link>
        </div>

        <div>
          <p>Sign up and organize your day:</p>
          <Link
            className="text-sky-500 text-xl hover:text-blue-400"
            to="/register"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
