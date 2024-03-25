import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'



let urlAtom = atom("")
let loginKeyAtom = atom("")
let userIdAtom = atomWithStorage("userId",0)
let userNameAtom = atomWithStorage("userName","")

export { urlAtom, loginKeyAtom, userIdAtom, userNameAtom }