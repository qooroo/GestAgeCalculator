
import { GestAge } from './state'

export const GestationalAgeForm: React.FC<{ label: string, value: GestAge, onWeeksChange: any, onDaysChange: any }> = (x) => {
    return (
      <div>
        <p className="label">{x.label}</p>
        <div>
          <input className="gest-input" onChange={x.onWeeksChange} value={x.value.weeks}></input>
          Weeks
          <input className="gest-input" onChange={x.onDaysChange} value={x.value.days}></input>
          Days
        </div>
      </div>
    );
  }