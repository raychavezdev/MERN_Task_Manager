import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 my-2 rounded-md text-white" key={i}>
            {error}
          </div>
        ))}

        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            {...register("username", { required: true })}
            className="bg-zinc-700 text-white px-4 py-2 rounded-md"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            className="bg-zinc-700 text-white px-4 py-2 rounded-md"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="bg-zinc-700 text-white px-4 py-2 rounded-md"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button className="bg-blue-400 rounded-md p-2" type="submit">
            Sign Up
          </button>
        </form>
        <p className="my-2 flex justify-center">
          Already have an account?&nbsp;
          <Link className="text-sky-500" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
