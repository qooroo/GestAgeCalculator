import { ChangeEvent } from 'react';
import './App.css';
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
  onCalcTargetChange,
} from './state'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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

  const dateGestAge = useCurrentDateGestAge()

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

  currentGestAgeAndBirthday$.subscribe(x => {
    console.log(`onChange: \n${x.currentBirthGestAge.weeks}/${x.currentBirthGestAge.days} \n${currentBirthday} \n${currentCalcDay} \n${currentCalcTarget}`)
  })

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
      </div>
      <div className="section gest2">
        <GestationalAgeForm
          label="Gestational age at calculation date"
          onWeeksChange={onDateGestAgeWeeksChanged}
          onDaysChange={onDateGestAgeDaysChanged}
          value={dateGestAge} />
      </div>
    </div>
  );
}

export default App;
