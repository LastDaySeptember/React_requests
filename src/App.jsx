import { useState, useEffect } from "react";
import styles from "./App.module.css";

const taskListURL = "https://jsonplaceholder.typicode.com/todos";

function App() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    fetch(taskListURL)
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        setTaskList(resData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally();
  }, []);

  return (
    <>
      <div className={styles.taskContainer}>
        <h1>Tasks</h1>
        <ul className={styles.taskList}>
          {taskList.map(({ id, title, completed }) => {
            return (
              <li
                className={`${styles.taskItem} ${completed ? styles.completedTaskItem : styles.unCompletedTaskItem}`}
                key={id}
              >
                <span>{title}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
