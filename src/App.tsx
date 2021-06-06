import React, { ChangeEvent, useState } from 'react';
import DatePicker from 'react-datepicker'
import {
  onBirthGestAgeChange,
  onBirthdayChange,
  currentGestAgeAndBirthday$,
  useCurrentBirthGestAge,
  onDateGestAgeChange,
  useCurrentDateGestAge,
  useCurrentBirthday,
  Target,
  useCurrentCalcDay,
  onCalcDayChange,
  useCurrentCalcTarget,
  onCalcTargetChange
} from './state'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { CalculationService } from './calculationService';


const CalculationDatePicker: React.FC<{selected: any, onChange: any}> = (x) => {
  return (
    <DatePicker dateFormat="dd/MM/yyyy" selected={x.selected} onChange={x.onChange} />
  );
}

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

  const dateGestAge = useCurrentDateGestAge()
  
  const currentBirthday = useCurrentBirthday()
  const currentCalcDay = useCurrentCalcDay()
  const currentCalcTarget = useCurrentCalcTarget()

  const onDateGestAgeWeeksChanged: ChangeHandler = (e) => {
    onDateGestAgeChange({ weeks: Number(e.target.value), days: dateGestAge.days })
  }

  const onDateGestAgeDaysChanged: ChangeHandler = (e) => {
    onDateGestAgeChange({ weeks: dateGestAge.weeks, days: Number(e.target.value) })
  }

  currentGestAgeAndBirthday$.subscribe(x => {
    console.log(`onChange: \n${x.currentBirthGestAge.weeks}/${x.currentBirthGestAge.days} \n${currentBirthday} \n${currentCalcDay} \n${currentCalcTarget}`)
  })

  const onCalcTargetChanged: ChangeHandler = (e) => {
    onCalcTargetChange(Number(e.target.value))
  }

  new CalculationService().run()

  return (
    <div className="App">
      <p>Gestational age at birth</p>
      <div>
        <input name="birth-gest-weeks" onChange={onBirthGestAgeWeeksChanged} value={birthGestAge.weeks}></input>
        Weeks
        <input name="birth-gest-days" onChange={onBirthGestAgeDaysChanged} value={birthGestAge.days}></input>
        Days
      </div>
      <p>Birthday</p>
      <CalculationDatePicker selected={currentBirthday} onChange={(d: Date) => onBirthdayChange(d)} />
      <p>Calculation Date</p>
      <CalculationDatePicker selected={currentCalcDay} onChange={(d: Date) => onCalcDayChange(d)} />
      <p>Gestational age at date</p>
      <div>
        <input name="date-gest-weeks" onChange={onDateGestAgeWeeksChanged} value={dateGestAge.weeks}></input>
        Weeks
        <input name="date-gest-days" onChange={onDateGestAgeDaysChanged} value={dateGestAge.days}></input>
        Days
      </div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Calculation Target</FormLabel>
        <RadioGroup aria-label="target" name="targets" value={currentCalcTarget} onChange={onCalcTargetChanged}>
          <FormControlLabel value={Target.GestAgeAtDate} control={<Radio />} label="Gestational age at date" />
          <FormControlLabel value={Target.DateAtGestAge} control={<Radio />} label="Date at gestational age" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default App;
