import { ChangeEvent } from 'react';
import { ReplaySubject, Subject, combineLatest } from 'rxjs'
import { startWith } from 'rxjs/operators'
import { bind } from '@react-rxjs/core'

type InputEvent = ChangeEvent<HTMLInputElement>
type ChangeHandler = (e: InputEvent) => void

const v1Subject = new Subject<string>()
const v1$ = v1Subject.pipe(startWith("beef"))

const v2Subject = new Subject<string>()
const v2$ = v2Subject.pipe(startWith("cake"))

const [useCurrentV1, currentV1$] = bind(v1$)
const [useCurrentV2, currentV2$] = bind(v2$)


const onInput1Changed: ChangeHandler = (e) => {
    console.log("changed! " + e.target.value)
    v1Subject.next(e.target.value)
}

const onInput2Changed: ChangeHandler = (e) => {
    v2Subject.next(e.target.value)
}

const outputSubject = new ReplaySubject<string>(1)
const output$ = outputSubject

combineLatest([currentV1$, currentV2$]).subscribe((x) => {
    outputSubject.next(`${x[0]}-${x[1]}`)
})

const [useOutput, currentOutput$] = bind(output$, "")

function Test() {

    const currentV1 = useCurrentV1()
    const currentV2 = useCurrentV2()

    const output = useOutput()

    return (
        <div className="Test">
            <input onChange={onInput1Changed} value={currentV1}></input>
            <input onChange={onInput2Changed} value={currentV2}></input>
            <p>{output}</p>
        </div>
    );
}

export default Test;
