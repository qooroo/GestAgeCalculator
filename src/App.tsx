import { ChangeEvent } from 'react';
import './App.css';
import {
  onBirthGestWeeksChange,
  onBirthGestDaysChange,
  onBirthdayChange,
  useCurrentBirthGestWeeks,
  useCurrentBirthGestDays,
  onDateGestWeeksChange,
  onDateGestDaysChange,
  useCurrentDateGestWeeks,
  useCurrentDateGestDays,
  useCurrentBirthday,
  Target,
  useCurrentCalcDay,
  onCalcDayChange,
  onCalcTargetChange,
} from './state'
import { CalculationService } from './calculationService';
import { CalculationDatePicker } from './CalculationDatePicker';
import { GestationalAgeForm } from './GestationalAgeForm';


type InputEvent = ChangeEvent<HTMLInputElement>
type ChangeHandler = (e: InputEvent) => void

new CalculationService().run()

const onBirthGestAgeWeeksChanged: ChangeHandler = (e) => {
  onBirthGestWeeksChange(Number(e.target.value))
}

const onBirthGestAgeDaysChanged: ChangeHandler = (e) => {
  onBirthGestDaysChange(Number(e.target.value))
}

const onDateGestAgeWeeksChanged: ChangeHandler = (e) => {
  onCalcTargetChange(Target.DateAtGestAge)
  onDateGestWeeksChange(Number(e.target.value))
}

const onDateGestAgeDaysChanged: ChangeHandler = (e) => {
  onCalcTargetChange(Target.DateAtGestAge)
  onDateGestDaysChange(Number(e.target.value))
}

function App() {

  const birthGestWeeks = useCurrentBirthGestWeeks()
  const birthGestDays = useCurrentBirthGestDays()
  const dateGestWeeks = useCurrentDateGestWeeks()
  const dateGestDays = useCurrentDateGestDays()
  const currentBirthday = useCurrentBirthday()
  const currentCalcDay = useCurrentCalcDay()

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
          weeks={birthGestWeeks}
          days={birthGestDays}
           />
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
          weeks={dateGestWeeks}
          days={dateGestDays} />
      </div>
    </div>
  );
}

export default App;
