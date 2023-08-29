import { useEffect, useRef, useState } from "react";
import audioFile from "../static/PhoneAlarm.mp3";
const centerStyle = { textAlign: "center" };
const fontStyle = { fontSize: `${40}px` };
const date = new Date();

const audElem = new Audio(audioFile);
console.log(audElem);

let initial = true;

function Alarm() {
  const [time, setTime] = useState({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  });
  const [alarmTime, setAlarmTime] = useState({
    hrs: 0,
    mins: 0,
  });
  const [isAlarmBtnClicked, setIsAlarmBtnClicked] = useState(false);

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

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    if (
      time.hours === alarmTime.hrs &&
      time.minutes === alarmTime.mins &&
      isAlarmBtnClicked
    ) {
      console.log("on");
      audElem.play();
      console.log(audElem.currentTime);
      // audElem.addEventListener("ended", audioContinueListener);
      audElem.loop = true;
    }
  }, [time.minutes]);

  // console.log(typeof time.hours); Number

  function alarmOnHandler(e) {
    // console.log(typeof e.target.value); String

    const timeString = timeRef.current.value;
    const timeArray = timeString.split(":");
    setAlarmTime({ hrs: Number(timeArray[0]), mins: Number(timeArray[1]) });
    setIsAlarmBtnClicked(true);
  }
  function alarmOffHandler(e) {
    // console.log(typeof e.target.value); String
    setIsAlarmBtnClicked(false);
  }

  function stopAlarmTone(e) {
    console.log("off");
    audElem.pause();
    console.log(audElem.currentTime);
    audElem.currentTime = 0;
    // audElem.load();
    console.log(audElem.currentTime);
    setIsAlarmBtnClicked(false);

    // audElem.removeEventListener("ended", audioContinueListener);
  }

  return (
    <>
      <div style={centerStyle}>
        <div style={fontStyle}>
          {time.hours}:{time.minutes}:{time.seconds}
        </div>

        <div>
          <label htmlFor="alarmtime">Set alarm: </label>
          <input
            type="time"
            id="alarmtime"
            ref={timeRef}
            defaultValue={"12:00"}
          />
        </div>
        {!isAlarmBtnClicked &&
          !(
            time.hours === alarmTime.hrs && time.minutes === alarmTime.mins
          ) && (
            <div>
              <button type="submit" onClick={alarmOnHandler}>
                Turn Alarm On
              </button>
            </div>
          )}
        {isAlarmBtnClicked &&
          !(
            time.hours === alarmTime.hrs && time.minutes === alarmTime.mins
          ) && (
            <div>
              <button type="submit" onClick={alarmOffHandler}>
                Turn Alarm Off
              </button>
            </div>
          )}
        {time.hours === alarmTime.hrs &&
          time.minutes === alarmTime.mins &&
          isAlarmBtnClicked && (
            <div>
              <h2>Alarm tuned </h2>
              <button type="submit" onClick={stopAlarmTone}>
                Stop Alarm
              </button>
            </div>
          )}
      </div>
    </>
  );
}

export default Alarm;
