import {
  onDateGestWeeksChange,
  onDateGestDaysChange,
  Target,
  currentCalcDay$,
  currentCalcTarget$,
  currentBirthday$,
  currentBirthGestWeeks$,
  currentBirthGestDays$,
  currentDateGestWeeks$,
  currentDateGestDays$,
  GestAge
} from './state'
import { LocalDate, ChronoUnit } from 'js-joda'
import { combineLatest } from 'rxjs'

export class CalculationService {

  run() {
    combineLatest([
      currentCalcTarget$,
      currentBirthday$,
      currentBirthGestWeeks$,
      currentBirthGestDays$,
      currentCalcDay$,
      currentDateGestWeeks$,
      currentDateGestDays$])
      .subscribe(x => {
        if (x[0] === Target.GestAgeAtDate) {
          const birthday = x[1]
          const gestAgeAtBirth = {weeks: x[2], days: x[3]} as GestAge
          const targetDay = x[4]
          const targetLocalDate = LocalDate.of(targetDay.getFullYear(), targetDay.getMonth(), targetDay.getDate())
          const birthdayLocalDate = LocalDate.of(birthday.getFullYear(), birthday.getMonth(), birthday.getDate())

          const daysSinceBirthday = ChronoUnit.DAYS.between(birthdayLocalDate, targetLocalDate)

          const totalDaysAtTargetDate = (gestAgeAtBirth.weeks * 7) + gestAgeAtBirth.days + daysSinceBirthday

          const targetGestAgeDays = totalDaysAtTargetDate % 7
          const targetGestAgeWeeks = (totalDaysAtTargetDate - targetGestAgeDays) / 7

          console.log(`calculated gest age: ${targetGestAgeWeeks}/${targetGestAgeDays}`)

          if (targetGestAgeWeeks !== x[5]) {
            onDateGestWeeksChange(targetGestAgeWeeks)
          }

          if (targetGestAgeDays !== x[6]) {
            onDateGestDaysChange(targetGestAgeDays)
          }
        }
      })
  }
}