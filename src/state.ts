import { Subject, merge, EMPTY } from 'rxjs'
import {
    startWith,
    withLatestFrom,
    map,
    pluck,
    filter,
    switchMap,
    switchMapTo,
    catchError,
} from 'rxjs/operators'
import { bind, shareLatest, SUSPENSE } from '@react-rxjs/core'

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
        })
    )
)

const birthday$ = new Subject<Date>()
export const onBirthdayChange = (birthday: Date) => {
    birthday$.next(birthday)
}

export const currentGestAgeAndBirthday$ = merge(
    currentBirthGestAge$.pipe(
        map((currentBirthGestAge) => ({
            ...currentBirthGestAge,
            birthday: Date.now,
        }))
    ),
    birthday$.pipe(
        withLatestFrom(currentBirthGestAge$),
        map(([birthday, currentBirthGestAge]) => ({ ...currentBirthGestAge, birthday }))
    )
).pipe(shareLatest())

export const [useCurrentBirthday] = bind(currentGestAgeAndBirthday$.pipe(pluck('birthday')))
