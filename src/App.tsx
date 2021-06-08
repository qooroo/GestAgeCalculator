import { ChangeEvent } from 'react';
import './App.css';
import {
  onBirthGestAgeChange,
  onBirthdayChange,
  useCurrentBirthGestAge,
  onDateGestAgeChange,
  useCurrentDateGestAge,
  useCurrentBirthday,
  Target,
  useCurrentCalcDay,
  onCalcDayChange,
  useCurrentCalcTarget,
  onCalcTargetChange,
  GestAge
} from './state'
import { CalculationService } from './calculationService';
import { CalculationDatePicker } from './CalculationDatePicker';
import { GestationalAgeForm } from './GestationalAgeForm';


type InputEvent = ChangeEvent<HTMLInputElement>
type ChangeHandler = (e: InputEvent) => void

function App() {

  const birthGestAge = useCurrentBirthGestAge()

  const onBirthGestAgeWeeksChanged: ChangeHandler = (e) => {
    onBirthGestAgeChange({ weeks: Number(e.target.value), days: birthGestAge.days })
  }

  const onBirthGestAgeDaysChanged: ChangeHandler = (e) => {
    onBirthGestAgeChange({ weeks: birthGestAge.weeks, days: Number(e.target.value) })
  }

  const dateGestAge = useCurrentDateGestAge() as GestAge

  const currentBirthday = useCurrentBirthday()
  const currentCalcDay = useCurrentCalcDay()
  const currentCalcTarget = useCurrentCalcTarget()

  const onDateGestAgeWeeksChanged: ChangeHandler = (e) => {
    onCalcTargetChange(Target.DateAtGestAge)
    onDateGestAgeChange({ weeks: Number(e.target.value), days: dateGestAge.days })
  }

  const onDateGestAgeDaysChanged: ChangeHandler = (e) => {
    onCalcTargetChange(Target.DateAtGestAge)
    onDateGestAgeChange({ weeks: dateGestAge.weeks, days: Number(e.target.value) })
  }

  new CalculationService().run()

  return (
    <div className="App">
      <div className="section birthday">
        <CalculationDatePicker
          label="Birthday"
          selected={currentBirthday}
          onChange={(d: Date) => onBirthdayChange(d)} />
      </div>
      <div className="section gest1">
        <GestationalAgeForm
          label="Gestational age at birth"
          onWeeksChange={onBirthGestAgeWeeksChanged}
          onDaysChange={onBirthGestAgeDaysChanged}
          value={birthGestAge} />
      </div>
      <div className="section calcday">
        <CalculationDatePicker
          label="Calculation date"
          selected={currentCalcDay}
          onChange={(d: Date) => onCalcDayChange(d)} />
          <p>total days old: </p>
      </div>
      <div className="section gest2">
        <GestationalAgeForm
          label="Corrected gestational age"
          onWeeksChange={onDateGestAgeWeeksChanged}
          onDaysChange={onDateGestAgeDaysChanged}
          value={dateGestAge} />
      </div>
    </div>
  );
}

export default App;
