import {
    currentGestAgeAndBirthday$,
    onDateGestAgeChange,
    Target,
    calcDay$,
    calcTarget$
  } from './state'
  import { LocalDate, ChronoUnit } from 'js-joda'
import { combineLatest } from 'rxjs'

  export class CalculationService {

    run() {
        combineLatest([currentGestAgeAndBirthday$, calcDay$, calcTarget$]).subscribe(x =>
            {
                if (x[2] == Target.GestAgeAtDate) {
                    const target = x[1]
                    const birthday = x[0].birthday
                    const gestAgeAtBirth = x[0].currentBirthGestAge
                    const targetLocalDate = LocalDate.of(target.getFullYear(), target.getMonth(), target.getDate())
                    const birthdayLocalDate = LocalDate.of(birthday.getFullYear(), birthday.getMonth(), birthday.getDate())
    
                    const daysSinceBirthday = ChronoUnit.DAYS.between(birthdayLocalDate, targetLocalDate)
    
                    const totalDaysAtTargetDate = (gestAgeAtBirth.weeks * 7) + gestAgeAtBirth.days + daysSinceBirthday
    
                    const targetGestAgeDays = totalDaysAtTargetDate % 7
                    const targetGestAgeWeeks = (totalDaysAtTargetDate - targetGestAgeDays) / 7
    
                    console.log(`calculated gest age: ${targetGestAgeWeeks}/${targetGestAgeDays}`)

                    onDateGestAgeChange({weeks: targetGestAgeWeeks, days: targetGestAgeDays})
                }
            })
    }
  }