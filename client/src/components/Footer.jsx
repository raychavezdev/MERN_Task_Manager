const TaskCard = () => {
  return (
    <footer className="container mx-auto px-10">
      <div className="bg-zinc-800 my-4 text-center py-5 px-10 rounded-lg">
        <p>
          Created by{" "}
          <a
            className="text-indigo-400 hover:text-blue-400 transition-colors"
            target="_blank"
            href="https://raymundodev.com/"
          >
            Raymundo Chavez
          </a>{" "}
        </p>
      </div>
    </footer>
  );
};

export default TaskCard;
