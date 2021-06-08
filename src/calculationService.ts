import {
  onDateGestAgeChange,
  Target,
  calcDay$,
  calcTarget$,
  birthday$,
  birthGestAge$,
  dateGestAge$
} from './state'
import { LocalDate, ChronoUnit } from 'js-joda'
import { combineLatest } from 'rxjs'

export class CalculationService {

  run() {
    combineLatest([calcTarget$, birthday$, birthGestAge$, calcDay$, dateGestAge$]).subscribe(x => {
      if (x[0] === Target.GestAgeAtDate) {
        const birthday = x[1]
        const gestAgeAtBirth = x[2]
        const targetDay = x[3]
        const targetLocalDate = LocalDate.of(targetDay.getFullYear(), targetDay.getMonth(), targetDay.getDate())
        const birthdayLocalDate = LocalDate.of(birthday.getFullYear(), birthday.getMonth(), birthday.getDate())

        const daysSinceBirthday = ChronoUnit.DAYS.between(birthdayLocalDate, targetLocalDate)

        const totalDaysAtTargetDate = (gestAgeAtBirth.weeks * 7) + gestAgeAtBirth.days + daysSinceBirthday

        const targetGestAgeDays = totalDaysAtTargetDate % 7
        const targetGestAgeWeeks = (totalDaysAtTargetDate - targetGestAgeDays) / 7

        console.log(`calculated gest age: ${targetGestAgeWeeks}/${targetGestAgeDays}`)

        onDateGestAgeChange({ weeks: targetGestAgeWeeks, days: targetGestAgeDays })
      }
    })
  }
}