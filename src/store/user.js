import { atom } from 'jotai'

let userAtom = atom({
  url: '',
  loginKey: '',
  userId: 0,
  userName: "",
});

let urlAtom = atom((get) => {
  const user = get(userAtom)
  return user.url
}, (get, set, update) => {
  set(userAtom, (user) => ({ ...user, url: update }))
})

let loginKeyAtom = atom(
  (get) => {
    const user = get(userAtom)
    return user.loginKey
  },
  (get, set, update) => {
    set(userAtom, (user) => ({ ...user, loginKey: update }))
  }
)
let userIdAtom = atom((get) => {
  const user = get(userAtom)
  return user.userId
}, (get, set, update) => {
  set(userAtom, (user) => ({ ...user, userId: update }))
})
let userNameAtom = atom((get) => {
  const user = get(userAtom)
  return user.userName
}, (get, set, update) => {
  set(userAtom, (user) => ({ ...user, userName: update }))
})

export default userAtom;
export { userAtom, urlAtom, loginKeyAtom, userIdAtom, userNameAtom }