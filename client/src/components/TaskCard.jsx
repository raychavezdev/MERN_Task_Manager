import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useState } from "react";
import TaskCardModal from "./TaskCardModal";

const TaskCard = ({ task, isModal }) => {
  const [isOpen, setIsopen] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const openCardModal = () => setIsopen(true);
  const closeCardModal = () => setIsopen(false);

  const { deleteTask } = useTasks();
  return (
    <>
      {isOpen && <TaskCardModal close={closeCardModal} task={task} />}
      <div
        onClick={() => (!isModal ? openCardModal(task) : null)}
        className={`bg-zinc-800 rounded-md grid grid-rows-9 shadow-sm shadow-slate-950 cursor-pointer ${
          isModal ? "h-auto max-h-modal" : "h-80"
        }`}
      >
        <header
          className={`py-2 bg-black lg:py-4  px-4 line-clamp-1 flex items-center rounded-t-md ${
            isModal ? "row-span-1 overflow-auto" : "row-span-2"
          }`}
        >
          <h1
            className={`md:text-2xl text-slate-100 font-bold  ${
              isModal ? "break-words" : "truncate"
            }`}
          >
            {task.title}
          </h1>
        </header>

        <div
          className={`py-3 lg:py-6 break-words  px-4  ${
            isModal ? "overflow-auto row-span-6" : "overflow-hidden row-span-5"
          }`}
        >
          <p
            className={`text-slate-200 whitespace-pre-wrap ${
              isModal ? "line-clamp-none" : "line-clamp-6"
            }`}
          >
            {task.description}
          </p>
        </div>

        <p className="py-1 row-span-1 px-4 text-slate-500">
          {new Date(task.date).toLocaleDateString()}
        </p>
        <footer className="flex gap-2 py-1 items-center border-t border-white  row-span-1  px-4 text-center">
          <Link
            onClick={handleClick}
            className="bg-blue-500/70 rounded-sm px-1 w-14 hover:brightness-125"
            to={`/tasks/${task._id}`}
          >
            Edit
          </Link>
          <button
            className="bg-red-500/70 rounded-sm px-1 w-14 hover:brightness-125"
            onClick={(e) => {
              handleClick(e);
              deleteTask(task._id);
            }}
          >
            Delete
          </button>
        </footer>
      </div>
    </>
  );
};

export default TaskCard;
