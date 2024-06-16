import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Kalender = () => {
    const [value, onChange] = useState(new Date());

    return (
        <div className="p-4">
        <div className="mb-2 text-center">
            <strong>Date:</strong> {value.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        {/* <div className="mb-2 text-center">
            <strong>Time:</strong> {value.toLocaleTimeString()}
        </div> */}
        <div className="calendar">
            <Calendar
            onChange={onChange}
            value={value}
            locale="en-US" 
            showNavigation={true}
            />
        </div>
        </div>
    );
};

export default Kalender;
