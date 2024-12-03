import { useState } from "react";
import TaskCard from "./TaskCard";

const TaskCardModal = ({ task, close }) => {
  return (
    <div className="bg-black/50 p-8 absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="relative container">
        <button
          onClick={close}
          className="absolute right-0 px-4 py-1 text-2xl hover:text-blue-400"
        >
          X
        </button>
        <TaskCard
          isModal={true}
          task={task}
          descriptionClasses="line-clamp-none overflow-auto"
        />
      </div>
    </div>
  );
};

export default TaskCardModal;
