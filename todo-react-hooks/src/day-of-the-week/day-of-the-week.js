import React, { useState } from "react";

import './../task-list/task-list.css';

const DayOfTheWeek = ({ toShow, changeDay }) => {

    const [days, getDays] = useState([
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ]);

    return (
        <ul className="list-group" onClick={(e) => changeDay(e.target.value)}>
            {
                days.map((a, ind) => <li
                    key={ind}
                    value={ind}
                    className={`dayOfWeek list-group-item ${toShow === ind ? "activeCurr" : ""}`}>{a}</li>)
            }
        </ul>
    );
}

export default DayOfTheWeek;