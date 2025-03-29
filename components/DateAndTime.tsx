'use client'

import { useEffect, useState } from "react";

const DateAndTime = () => {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
  });

  const [date, setDate] = useState(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const dateTimeFormat = new Intl.DateTimeFormat("fa-IR", options);
    const now = new Date();
    const parts = dateTimeFormat.formatToParts(now);
    const partValues = parts.map((p) => p.value);
    return ` ${partValues[6]} ${partValues[5]} ${partValues[3]} ${partValues[4]}  ${partValues[2]} ${partValues[0]}`;
  });


  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }));
      const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        const dateTimeFormat = new Intl.DateTimeFormat("fa-IR", options);

        const parts = dateTimeFormat.formatToParts(now);
        const partValues = parts.map((p) => p.value);
        return ` ${partValues[6]} ${partValues[5]} ${partValues[3]} ${partValues[4]}  ${partValues[2]} ${partValues[0]}`;
      }

      const dateStr = formatDate(now);
      setDate(dateStr);
    }, 1000); // Update every 1 sec

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);
  return (
    <div className="flex flex-col gap-5 justify-center">
      <h1 className="text-3xl font-extrabold lg:text-7xl text-center">{time}</h1>
      <p className="text-lg font-medium text-sky-1 lg:text-2xl text-center">{date}</p>
    </div>
  )
}

export default DateAndTime