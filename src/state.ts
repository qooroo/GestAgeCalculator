import { Subject, merge } from 'rxjs'
import {
    startWith,
    withLatestFrom,
    map,
    pluck
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

const birthGestAge$ = new Subject<GestAge>()
export const onBirthGestAgeChange = (gestAge: GestAge) => {
    birthGestAge$.next(gestAge)
}

export const [useCurrentBirthGestAge, currentBirthGestAge$] = bind(
    birthGestAge$.pipe(
        startWith({
            weeks: INITIAL_BIRTH_GEST_WEEKS,
            days: INITIAL_BIRTH_GEST_DAYS,
        } as GestAge)
    )
)

const dateGestAge$ = new Subject<GestAge>()
export const onDateGestAgeChange = (gestAge: GestAge) => {
    dateGestAge$.next(gestAge)
}

export const [useCurrentDateGestAge, currentDateGestAge$] = bind(
    dateGestAge$.pipe(
        startWith({
            weeks: INITIAL_BIRTH_GEST_WEEKS,
            days: INITIAL_BIRTH_GEST_DAYS,
        } as GestAge)
    )
)

const birthday$ = new Subject<Date>()
export const onBirthdayChange = (birthday: Date) => {
    birthday$.next(birthday)
}

const calcDay$ = new Subject<Date>()
export const onCalcDayChange = (calcDay: Date) => {
    calcDay$.next(calcDay)
}

export const [useCurrentCalcDay] = bind(calcDay$.pipe(startWith(new Date())))

export const currentGestAgeAndBirthday$ = merge(
    currentBirthGestAge$.pipe(
        map((currentBirthGestAge) => ({
            currentBirthGestAge,
            birthday: new Date(),
        }))
    ),
    birthday$.pipe(
        withLatestFrom(currentBirthGestAge$),
        map(([birthday, currentBirthGestAge]) => ({ currentBirthGestAge, birthday }))
    )
).pipe(shareLatest())

export const [useCurrentBirthday] = bind(currentGestAgeAndBirthday$.pipe(pluck('birthday')))
