const fontStyleSetAlarm = {
  fontSize: `${30}px`,
  marginTop: `${20}px`,
  marginBottom: `${20}px`,
};
function SetAlarm({ timeRef }) {
  return (
    <div style={fontStyleSetAlarm}>
      <label htmlFor="alarmtime">Set alarm: </label>
      <input
        type="time"
        style={fontStyleSetAlarm}
        id="alarmtime"
        defaultValue={"12:00"}
        ref={timeRef}
      />
    </div>
  );
}

export default SetAlarm;
