
const handleFocus = (event: { target: { select: () => any; }; }) => event.target.select();

export const GestationalAgeForm: React.FC<{ label: string, weeksHook: () => number, onWeeksChange: any, daysHook: () => number, onDaysChange: any }> = (x) => {

  const weeks = x.weeksHook()
  const days = x.daysHook()

  return (
    <div>
      <p className="label">{x.label}</p>
      <div>
        <input
          className="gest-input"
          onFocus={handleFocus}
          onChange={x.onWeeksChange}
          value={weeks}></input>
        Weeks
        <input
          className="gest-input"
          onFocus={handleFocus}
          onChange={x.onDaysChange}
          value={days}></input>
        Days
      </div>
    </div>
  );
}