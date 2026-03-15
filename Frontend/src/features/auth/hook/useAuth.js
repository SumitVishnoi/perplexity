import { useDispatch } from "react-redux"
import { setLoading, setUser } from "../auth.slice"
import {register, login, getMe} from "../service/auth.api"



export const useAuth = ()=> {
    const dispatch = useDispatch()

    async function handleRegister({username, email, password}) {
        dispatch(setLoading(true))
        const data = await register({username, email, password})
        dispatch(setUser(data.user))
        dispatch(setLoading(false))
    }

    async function handleLogin({email, password}) {
        dispatch(setLoading(true))
        const data = await login({email, password})
        dispatch(setUser(data.user))
        dispatch(setLoading(false))
    }

    async function handleGetMe() {
        dispatch(setLoading(true))
        const data = await getMe()
        dispatch(setUser(data.user))
        dispatch(setLoading(false))
    }

    return {
        handleRegister, handleLogin, handleGetMe
    }
}