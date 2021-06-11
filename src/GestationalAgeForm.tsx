
import { GestAge } from './state'

export const GestationalAgeForm: React.FC<{ label: string, weeks: number, onWeeksChange: any, days: number, onDaysChange: any }> = (x) => {
    return (
      <div>
        <p className="label">{x.label}</p>
        <div>
          <input className="gest-input" onChange={x.onWeeksChange} value={x.weeks}></input>
          Weeks
          <input className="gest-input" onChange={x.onDaysChange} value={x.days}></input>
          Days
        </div>
      </div>
    );
  }