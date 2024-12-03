import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const TaskFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    (async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
      }
    })();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data);
    } else {
      createTask(data);
    }
    navigate("/tasks");
  });

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            maxLength={100}
            className="bg-zinc-700 text-white px-4 py-2 rounded-md"
            type="text"
            placeholder="Title"
            {...register("title")}
            autoFocus
          />
          <textarea
            maxLength={300}
            className="bg-zinc-700 text-white px-4 py-2 rounded-md"
            placeholder="Description"
            {...register("description")}
          ></textarea>
          <button className="bg-blue-400 rounded-md p-2" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskFormPage;
