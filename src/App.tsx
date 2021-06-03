import { Subscribe } from '@react-rxjs/core';
import React, { ChangeEvent, useState } from 'react';
import DatePicker from 'react-datepicker'
import {
  INITIAL_BIRTH_GEST_WEEKS,
  INITIAL_BIRTH_GEST_DAYS,
  onBirthGestAgeChange,
  onBirthdayChange,
  currentGestAgeAndBirthday$,
  useCurrentBirthGestAge,
  useCurrentBirthday
} from './state'

const CalculationDatePicker: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  return (
    <DatePicker dateFormat="dd/MM/yyyy" selected={startDate} onChange={(d: Date | null) => setStartDate(d)} />
  );
}

type InputEvent = ChangeEvent<HTMLInputElement>
type ChangeHandler = (e: InputEvent) => void

function App() {

  const [currentBirthGestWeeks, setCurrentBirthGestWeeks] = useState(INITIAL_BIRTH_GEST_WEEKS)
  const [currentBirthGestDays, setCurrentBirthGestDays] = useState(INITIAL_BIRTH_GEST_DAYS)

  const {weeks, days} = useCurrentBirthGestAge() as any

  const onBirthGestAgeWeeksChanged: ChangeHandler = (e) => {
    onBirthGestAgeChange({weeks: Number(e.target.value), days: days})
  }

  const onBirthGestAgeDaysChanged: ChangeHandler = (e) => {
    onBirthGestAgeChange({weeks: weeks, days: Number(e.target.value)})
  }

  return (
    <div className="App">
        <p>Gestational age at birth</p>
        <div>
          <input name="birth-gest-weeks" onChange={onBirthGestAgeWeeksChanged} value={weeks}></input>
          Weeks
          <input name="birth-gest-days" onChange={onBirthGestAgeDaysChanged} value={days}></input>
          Days
        </div>
        <p>Birthday</p>
        <CalculationDatePicker />
        <p>{weeks}</p>
        <p>{days}</p>
        <p>Calculation Date</p>
        <CalculationDatePicker />
        <p>Gestational age at date</p>
        <p></p>
        <button>RESET</button>
    </div>
  );
}

export default App;
