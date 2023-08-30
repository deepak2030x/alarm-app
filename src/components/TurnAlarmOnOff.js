import { useState, useEffect, useRef } from "react";
import audioFile from "../static/PhoneAlarm.mp3";
import carFile from "../static/caralarm.mp3";
import whistleFile from "../static/whistle.mp3";
import normalFile from "../static/commonalarm.mp3";
const fontStyleSetSong = {
  fontSize: `${25}px`,
  marginTop: `${20}px`,
  marginBottom: `${20}px`,
};

let initial = true;
let audioElem = { currentTime: 0 };

function AlarmOnOff(props) {
  const [alarmTime, setAlarmTime] = useState({
    hrs: -1,
    mins: -1,
  });
  const [isAlarmBtnClicked, setIsAlarmBtnClicked] = useState(false);
  const selectRef = useRef();

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    // console.log(selectRef.current.value);
    if (
      props.hrs === alarmTime.hrs &&
      props.mins === alarmTime.mins &&
      isAlarmBtnClicked
    ) {
      // console.log("on");
      const selectedSong = selectRef.current.value;
      audioElem = new Audio(selectedSong);
      audioElem.play();
      audioElem.loop = true;
    }
  }, [props.mins, isAlarmBtnClicked, props.hrs, alarmTime.hrs, alarmTime.mins]);

  function alarmOnHandler(e) {
    // console.log(typeof e.target.value); String
    // console.log(props.timeRef.current);
    const timeString = props.timeRef.current.value;
    const timeArray = timeString.split(":");
    setAlarmTime({ hrs: Number(timeArray[0]), mins: Number(timeArray[1]) });
    setIsAlarmBtnClicked(true);
  }

  function alarmOffHandler(e) {
    // console.log(typeof e.target.value); String
    setIsAlarmBtnClicked(false);
    setAlarmTime({ hrs: -1, mins: -1 });
  }
  function stopAlarmTone(e) {
    // console.log("off");
    audioElem.pause();
    audioElem.currentTime = 0;

    // audElem.load();
    // console.log(audElem.currentTime);
    setIsAlarmBtnClicked(false);
    setAlarmTime({ hrs: -1, mins: -1 });

    // audElem.removeEventListener("ended", audioContinueListener);
  }
  return (
    <>
      <label htmlFor="simple" style={fontStyleSetSong}>
        Select alarm tone:{" "}
      </label>
      <select
        id="simple"
        name="tone"
        ref={selectRef}
        defaultValue="Phone"
        style={fontStyleSetSong}
      >
        <option value={carFile}>Car Music</option>
        <option value={whistleFile}>Whistle</option>
        <option value={audioFile}>Phone</option>
        <option value={normalFile}>Alarm Tone</option>
      </select>
      {!isAlarmBtnClicked &&
        !(props.hrs === alarmTime.hrs && props.mins === alarmTime.mins) && (
          <div>
            <button
              type="submit"
              onClick={alarmOnHandler}
              style={fontStyleSetSong}
            >
              Turn Alarm On
            </button>
          </div>
        )}
      {isAlarmBtnClicked &&
        !(props.hrs === alarmTime.hrs && props.mins === alarmTime.mins) && (
          <div>
            <button
              type="submit"
              onClick={alarmOffHandler}
              style={fontStyleSetSong}
            >
              Turn Alarm Off
            </button>
          </div>
        )}
      {audioElem.currentTime > 0 && (
        <div>
          <h2>Alarm tuned </h2>
          <button
            type="submit"
            onClick={stopAlarmTone}
            style={fontStyleSetSong}
          >
            Stop Alarm
          </button>
        </div>
      )}
    </>
  );
}

export default AlarmOnOff;

// props.hrs === alarmTime.hrs &&
//   props.mins === alarmTime.mins &&
//   isAlarmBtnClicked;
