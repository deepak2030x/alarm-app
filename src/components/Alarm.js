import { useEffect, useRef, useState } from "react";
import SetAlarm from "./SetAlarm";
import AlarmOnOff from "./TurnAlarmOnOff";
const centerStyle = { textAlign: "center" };
const fontStyle = { fontSize: `${40}px` };
const date = new Date();

function Alarm() {
  // console.log("times");
  const [time, setTime] = useState({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  });

  useEffect(() => {
    const showTimeInterval = setInterval(() => {
      // console.log("hello");
      setTime((prevVal) => {
        const date = new Date();
        return {
          hours: date.getHours(),
          minutes: date.getMinutes(),
          seconds: date.getSeconds(),
        };
      });
    }, 1000);
    return () => {
      clearInterval(showTimeInterval);
    };
  }, [time.seconds]);

  const timeRef = useRef();
  // console.log(timeRef.current);

  return (
    <>
      <div style={centerStyle}>
        <div style={fontStyle}>
          {time.hours}:{time.minutes}:{time.seconds}
        </div>

        <SetAlarm timeRef={timeRef} />

        <AlarmOnOff timeRef={timeRef} hrs={time.hours} mins={time.minutes} />
      </div>
    </>
  );
}

export default Alarm;
