import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {

  useEffect(() => {
    getData();
  }, []);

  const [tasks, setTasks] = useState([]);
  const [tasksperpage, setTasksperpage] = useState(10);
  let numOfTotalPages = Math.ceil(tasks.length / tasksperpage);
  let pages = [...Array(numOfTotalPages + 1).keys()].slice(1);
  let [currentPage, setCurrentPage] = useState(1);

  let indexOfLastTask = currentPage * tasksperpage;
  let indexofFirstTask = indexOfLastTask - tasksperpage;

  let visibleTasks = tasks.slice(indexofFirstTask, indexOfLastTask);

  async function getData() {
    try {
      let tasks = await axios.get("https://jsonplaceholder.typicode.com/todos");
      setTasks(tasks.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="App">
        <h1>pagination</h1>
        <div>
          <select name="" id="" onClick={({ target }) => { setTasksperpage(target.value) }} >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <main>
          {visibleTasks.map((task) => {
            return <div key={task.id}>{task.title}</div>;
          })}
          <p>
            <span
              onClick={() => {
                currentPage === 1
                  ? setCurrentPage(currentPage)
                  : setCurrentPage(currentPage - 1);
              }}
            >
              prev
            </span>
            {pages.map((page) => {
              return (
                <span
                  onClick={() => {
                    setCurrentPage(page);
                  }}
                  className={currentPage === page ? `active` : ``}
                  key={page}
                >{`  ${page} `}</span>
              );
            })}
            <span
              onClick={() => {
                currentPage === numOfTotalPages
                  ? setCurrentPage(currentPage)
                  : setCurrentPage(currentPage + 1);
              }}
            >
              | next
            </span>
          </p>
        </main>
      </div>
    </>
  )
}
