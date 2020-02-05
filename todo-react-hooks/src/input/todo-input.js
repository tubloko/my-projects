import React, { useState } from 'react';


const ToDoInput = ({ addTask, search }) => {

    const [task, setTask] = useState('');
    const onChange = (e) => {
        setTask(e.target.value);
        search(e.target.value);
    }

    return (
        <div className="input-group input-group-lg">
            <input type="text"
                   className="form-control"
                   placeholder="Add your task"
                   value={task}
                   onChange={onChange}/>
            <div className="input-group-append">
                <button className="btn btn-outline-success"
                        type="button"
                        id="button-addon2"
                        onClick={() => {
                            if (task === '') return;
                            addTask(task);
                            setTask('');
                    }}>Add task</button>
            </div>
        </div>
    );
}

export default ToDoInput;