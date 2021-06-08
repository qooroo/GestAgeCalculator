import { Subject, merge } from 'rxjs'
import {
    startWith,
    withLatestFrom,
    map,
    pluck,
    shareReplay
} from 'rxjs/operators'
import { bind, shareLatest } from '@react-rxjs/core'

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

const birthGestAgeSubject = new Subject<GestAge>()
export const birthGestAge$ = birthGestAgeSubject.pipe(startWith({
    weeks: INITIAL_BIRTH_GEST_WEEKS,
    days: INITIAL_BIRTH_GEST_DAYS,
} as GestAge), shareReplay(1))
export const onBirthGestAgeChange = (gestAge: GestAge) => {
    birthGestAgeSubject.next(gestAge)
}

export const [useCurrentBirthGestAge, currentBirthGestAge$] = bind(birthGestAge$)

const dateGestAgeSubject = new Subject<GestAge>()
export const dateGestAge$ = dateGestAgeSubject.pipe(startWith({
    weeks: INITIAL_BIRTH_GEST_WEEKS,
    days: INITIAL_BIRTH_GEST_DAYS,
} as GestAge, shareReplay(1)))
export const onDateGestAgeChange = (gestAge: GestAge) => {
    dateGestAgeSubject.next(gestAge)
}

export const [useCurrentDateGestAge, currentDateGestAge$] = bind(dateGestAge$)

const birthdaySubject = new Subject<Date>()
export const birthday$ = birthdaySubject.pipe(startWith(new Date()), shareReplay(1))
export const onBirthdayChange = (birthday: Date) => {
    birthdaySubject.next(birthday)
}

export const [useCurrentBirthday] = bind(birthday$)

const calcDaySubject = new Subject<Date>()
export const calcDay$ = calcDaySubject.pipe(startWith(new Date()), shareReplay(1))
export const onCalcDayChange = (calcDay: Date) => {
    onCalcTargetChange(Target.GestAgeAtDate)
    calcDaySubject.next(calcDay)
}

export const [useCurrentCalcDay] = bind(calcDay$)

const calcTargetSubject = new Subject<Target>()
export const calcTarget$ = calcTargetSubject.pipe(startWith(Target.GestAgeAtDate), shareReplay(1))
export const onCalcTargetChange = (calcTarget: Target) => {
    calcTargetSubject.next(calcTarget)
}
export const [useCurrentCalcTarget] = bind(calcTarget$)
