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
  onCalcTargetChange
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

const onCalcDayUserChanged = (d: Date) => {
  onCalcTargetChange(Target.GestAgeAtDate)
  onCalcDayChange(d)
}

function App() {

  const birthGestWeeks = useCurrentBirthGestWeeks()
  const birthGestDays = useCurrentBirthGestDays()
  const dateGestWeeks = useCurrentDateGestWeeks()
  const dateGestDays = useCurrentDateGestDays()

  const ageDays = ((dateGestWeeks * 7) + dateGestDays) - ((birthGestWeeks * 7) + birthGestDays)

  return (
    <div className="App">
      <div className="title">
        <p >Nicola's GA Calculator</p>
      </div>
      <div className="section">
        <CalculationDatePicker
          label="Birthday"
          valueHook={useCurrentBirthday}
          onChange={(d: Date) => onBirthdayChange(d)} />
      </div>
      <div className="section">
        <GestationalAgeForm
          label="Gestational age at birth"
          onWeeksChange={onBirthGestAgeWeeksChanged}
          onDaysChange={onBirthGestAgeDaysChanged}
          weeksHook={useCurrentBirthGestWeeks}
          daysHook={useCurrentBirthGestDays}
        />
      </div>
      <div className="section">
        <CalculationDatePicker
          label="Calculation date"
          valueHook={useCurrentCalcDay}
          onChange={onCalcDayUserChanged} />
        <p className="note">age: {ageDays} days</p>
      </div>
      <div className="section">
        <GestationalAgeForm
          label="Corrected gestational age"
          onWeeksChange={onDateGestAgeWeeksChanged}
          onDaysChange={onDateGestAgeDaysChanged}
          weeksHook={useCurrentDateGestWeeks}
          daysHook={useCurrentDateGestDays} />
      </div>
      <div className="footer">
        <p>v0.2.3</p>
        <p>Copyright 2021</p>
      </div>
    </div>
  );
}

export default App;
