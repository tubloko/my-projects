import React from "react";

import TaskList from "./task-list";

import './task-list/task-list.css';

const App = () => {
    return (
        <div className="container">
            <h1 className="text-center">ToDo,do,do...</h1>
            <TaskList />
        </div>
    );
}

export default App;