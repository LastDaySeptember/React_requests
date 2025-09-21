import { useState, useEffect } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import styles from "./App.module.css";

// const taskListURL = "https://jsonplaceholder.typicode.com/todos";

//json-server --watch db.json
// http://localhost:3000
const taskListURL = "http://localhost:3000/tasks";

// functions
function removeTask() {}

function updateTask() {}
function searchTask() {}
function sortTasks() {}

function App() {
  const [taskList, setTaskList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addValue, setAddValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [isRefreshedTasks, setIsRefreshedTasks] = useState();

  function refreshTasks() {
    setIsRefreshedTasks(!isRefreshedTasks);
  }

  // on INPUT change
  const onInputChange = (event) => {
    const newValue = event.target.value;
    const name = event.target.name;
    if (name == "add") {
      setAddValue(newValue);
    } else {
      setSearchValue(newValue);
    }
  };

  // add task
  const addTask = () => {
    if (addValue.length == 0) {
      alert("Add valid task");
      return false;
    }
    setIsAdding(true);
    fetch(taskListURL, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: addValue,
        completed: false,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((resData) =>
        console.log(`Added ${addValue} on server with response: ${resData}`)
      )
      .catch((error) => console.log(error))
      .finally(() => {
        setIsAdding(false);
        refreshTasks();
      });
  };

  // fetch data
  useEffect(() => {
    setIsLoading(true);

    fetch(taskListURL)
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        setTaskList(resData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isRefreshedTasks]);

  // return
  return (
    <>
      <div className={styles.container}>
        <h1>Tasks</h1>

        {isLoading && <div className={styles.loader}></div>}

        {!isLoading && (
          <>
            <div className={styles.inputField}>
              <Input
                name="add"
                placeholder="Add task"
                onChange={onInputChange}
                value={addValue}
              />
              <Button onClick={addTask} disabled={isAdding}>
                Add
              </Button>
            </div>
            <div className={styles.inputField}>
              <Input
                name="search"
                placeholder="Search task"
                onChange={onInputChange}
                value={searchValue}
              />
              <Button onClick={searchTask} disabled={false}>
                Search
              </Button>
            </div>
            <div className={styles.sortingBtnContainer}>
              {!isSorted && (
                <Button className={styles.sortingBtn} onClick={sortTasks}>
                  Sort ABC
                </Button>
              )}
              {isSorted && (
                <Button className={styles.sortingBtn} onClick={sortTasks}>
                  Sort Base
                </Button>
              )}
            </div>
            <ul className={styles.taskList}>
              {taskList.map(({ id, title, completed }) => {
                return (
                  <div className={styles.taskContainer} key={id}>
                    <li
                      className={`${styles.taskItem} ${completed ? styles.completedTaskItem : styles.unCompletedTaskItem}`}
                    >
                      <span>{title}</span>
                    </li>
                    <div className={styles.buttonsContainer}>
                      <Button id={id} onClick={updateTask}>
                        Update
                      </Button>
                      <Button id={id} onClick={removeTask}>
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default App;
