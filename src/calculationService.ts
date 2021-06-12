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
  GestAge,
  totalDays,
  onCalcDayChange
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
          const targetLocalDate = LocalDate.of(targetDay.getFullYear(), targetDay.getMonth() + 1, targetDay.getDate())
          const birthdayLocalDate = LocalDate.of(birthday.getFullYear(), birthday.getMonth() + 1, birthday.getDate())

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
        else if (x[0] === Target.DateAtGestAge) {
          const birthday = x[1]
          const gestAgeAtBirth = {weeks: x[2], days: x[3]} as GestAge
          const birthdayLocalDate = LocalDate.of(birthday.getFullYear(), birthday.getMonth() + 1, birthday.getDate())
          const targetGestAge = {weeks: x[5], days: x[6]} as GestAge
          const daysSinceBirthday = totalDays(targetGestAge) - totalDays(gestAgeAtBirth)

          const targetLocalDate = birthdayLocalDate.plusDays(daysSinceBirthday)
          const targetDate = new Date(targetLocalDate.year(), targetLocalDate.monthValue() - 1, targetLocalDate.dayOfMonth())

          if (targetDate.getFullYear !== x[4].getFullYear
              || targetDate.getMonth() !== x[4].getMonth()
              || targetDate.getDate() !== x[4].getDate()) {
            console.log(`calculated date at gest age: ${targetDate}`)
            onCalcDayChange(targetDate)
          }
        }
      })
  }
}