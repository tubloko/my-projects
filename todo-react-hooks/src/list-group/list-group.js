import React from "react";
import './../task-list/task-list.css';

const ListGroup = ({ toShow, checkTask, taskList, deleteTask }) => {

    const dayToShow = taskList.filter(({day}) => day === toShow);

    return (
        <ul className="list-group list-group-flush ul-task">
            {
                dayToShow.map(({ task, done, show, id }, ind) => {
                    return (
                        <li className={`list-group-item ${done ? "taskDone" 
                            : ""} d-flex justify-content-between align-items-center ${show ? "" 
                            : "dis" } tasks`}
                            key={ind}
                            value={ind}
                            onClick={() => checkTask(id)}>{task}
                            <button
                                value={id}
                                className="btn btn-outline-danger"
                                onClick={(e) => deleteTask(e)}>Delete</button>
                        </li>);
                })
            }
        </ul>
    );
}

export default ListGroup;