
const handleFocus = (event: any) => event.target.select();

export const GestationalAgeForm: React.FC<{ label: string, weeksHook: () => number, onWeeksChange: any, daysHook: () => number, onDaysChange: any }> = (x) => {

  const weeks = x.weeksHook()
  const days = x.daysHook()

  const onDaysChange = (event: React.ChangeEvent<HTMLInputElement>, hook: any) => {
    const newValue = Number(event.target.value)

    if (isNaN(newValue) || newValue < 0 || newValue > 6) {
      event.target.value = days.toString()
      return;
    }
    
    hook(event)
  }

  const onWeeksChange = (event: React.ChangeEvent<HTMLInputElement>, hook: any) => {
    const newValue = Number(event.target.value)

    if (isNaN(newValue) || newValue < 0 || newValue > 99) {
      event.target.value = weeks.toString()
      return;
    }
    
    hook(event)
  }

  return (
    <div>
      <p className="label">{x.label}</p>
      <div>
        <input
          className="gest-input"
          onFocus={handleFocus}
          onChange={e => onWeeksChange(e, x.onWeeksChange)}
          value={weeks}></input>
        Weeks
        <input
          className="gest-input"
          onFocus={handleFocus}
          onChange={e => onDaysChange(e, x.onDaysChange)}
          value={days}></input>
        Days
      </div>
    </div>
  );
}