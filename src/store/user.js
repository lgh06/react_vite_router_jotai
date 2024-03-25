import { atom } from 'jotai'


let urlAtom = atom("")
let loginKeyAtom = atom("")
let userIdAtom = atom(0)
let userNameAtom = atom("")

export { urlAtom, loginKeyAtom, userIdAtom, userNameAtom }