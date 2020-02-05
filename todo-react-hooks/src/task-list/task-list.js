import React, {useState} from "react";

import ToDoInput from "../input";
import DayOfTheWeek from "../day-of-the-week";
import ListGroup from "../list-group";

import './task-list.css';

const TaskList = () => {

    const [tasks, tasksList] = useState([
        {task: '10', done: false, show: true, day: 0, id: 1},
        {task: '21', done: false, show: true, day: 1, id: 2},
        {task: '32', done: false, show: true, day: 2, id: 3},
        {task: '43', done: false, show: true, day: 3, id: 4},
        {task: '54', done: false, show: true, day: 4, id: 5},
        {task: '65', done: false, show: true, day: 5, id: 6},
        {task: '76', done: false, show: true, day: 6, id: 7},
    ]);
    const [dayToShow, setDay] = useState(new Date().getDay() - 1);
    const [id, setId] = useState(100);

    const addTask = (task) => {
        const newList = [...tasks.map(({task, done, day,id}) =>
            ({task, done, day, show:true, id})),
            {task, done: false, show: true, day: dayToShow, id}];
        setId(id + 1);
        tasksList(newList);
    };
    const checkTask = (id) => {
        const newList = [...tasks];
        for (let i = 0; i < newList.length; i++) {
            if (newList[i].id === id) {
                newList[i].done = !newList[i].done;
            }
        }
        tasksList(newList);
    };
    const deleteTask = (e) => {
        const newList = tasks.filter((a, i) => a.id !== +e.target.value);
        e.stopPropagation();
        tasksList(newList);
    };
    const filter = (filteredString) => {
        const newList = tasks.map(task => {
            if (task.task.toLowerCase().startsWith(filteredString.toString().toLowerCase())) {
                return ({...task, show: true});
            } else {
                return ({...task, show: false});
            }
        });
        tasksList(newList);
    };
    const changeDay = (day) => {
        setDay(day);
    };

    return (
        <div className="row">
            <div className="col-3">
                <DayOfTheWeek changeDay={changeDay} toShow={dayToShow} />
            </div>
            <div className="col-9">
                <ToDoInput addTask={addTask} search={filter}/>
                <ListGroup toShow={dayToShow} checkTask={checkTask} taskList={tasks} deleteTask={deleteTask}/>
            </div>
        </div>
    );
}

export default TaskList;