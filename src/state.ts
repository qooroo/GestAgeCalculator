import { Subject } from 'rxjs'
import { startWith } from 'rxjs/operators'
import { bind } from '@react-rxjs/core'

export enum Target {
    GestAgeAtDate,
    DateAtGestAge
}

export interface GestAge {
    weeks: number,
    days: number
}

export const INITIAL_BIRTH_GEST_WEEKS = 28
export const INITIAL_BIRTH_GEST_DAYS = 0

const birthGestWeeksSubject = new Subject<number>()
const birthGestWeeks$ = birthGestWeeksSubject.pipe(startWith(INITIAL_BIRTH_GEST_WEEKS))
export const onBirthGestWeeksChange = (x: number) => { birthGestWeeksSubject.next(x) }
export const [useCurrentBirthGestWeeks, currentBirthGestWeeks$] = bind(birthGestWeeks$, 0)

const birthGestDaysSubject = new Subject<number>()
const birthGestDays$ = birthGestDaysSubject.pipe(startWith(INITIAL_BIRTH_GEST_DAYS))
export const onBirthGestDaysChange = (x: number) => { birthGestDaysSubject.next(x) }
export const [useCurrentBirthGestDays, currentBirthGestDays$] = bind(birthGestDays$, 0)

const dateGestWeeksSubject = new Subject<number>()
const dateGestWeeks$ = dateGestWeeksSubject.pipe(startWith(INITIAL_BIRTH_GEST_WEEKS))
export const onDateGestWeeksChange = (x: number) => { dateGestWeeksSubject.next(x) }
export const [useCurrentDateGestWeeks, currentDateGestWeeks$] = bind(dateGestWeeks$, 0)

const dateGestDaysSubject = new Subject<number>()
const dateGestDays$ = dateGestDaysSubject.pipe(startWith(INITIAL_BIRTH_GEST_DAYS))
export const onDateGestDaysChange = (x: number) => { dateGestDaysSubject.next(x) }
export const [useCurrentDateGestDays, currentDateGestDays$] = bind(dateGestDays$, 0)

const birthdaySubject = new Subject<Date>()
const birthday$ = birthdaySubject.pipe(startWith(new Date()))
export const onBirthdayChange = (birthday: Date) => { birthdaySubject.next(birthday) }
export const [useCurrentBirthday, currentBirthday$] = bind(birthday$, new Date())

const calcDaySubject = new Subject<Date>()
const calcDay$ = calcDaySubject.pipe(startWith(new Date()))
export const onCalcDayChange = (calcDay: Date) => {
    onCalcTargetChange(Target.GestAgeAtDate)
    calcDaySubject.next(calcDay)
}

export const [useCurrentCalcDay, currentCalcDay$] = bind(calcDay$, new Date())

const calcTargetSubject = new Subject<Target>()
const calcTarget$ = calcTargetSubject.pipe(startWith(Target.GestAgeAtDate))
export const onCalcTargetChange = (calcTarget: Target) => {
    calcTargetSubject.next(calcTarget)
}
export const [useCurrentCalcTarget, currentCalcTarget$] = bind(calcTarget$, Target.GestAgeAtDate)
