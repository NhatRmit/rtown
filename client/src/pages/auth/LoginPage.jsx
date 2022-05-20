import LoginNavbar from '../../components/Navbar/LoginNavbar'
import LoginForm from '../../components/Auth/LoginForm'
import LoginFooter from '../../components/Footer/LoginFooter'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { loadUser } from '../../actions/auth'

const Login = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadUser())
        localStorage.setItem("token", "")
    }, [dispatch])
    return(
        <>
            <LoginNavbar />
            <LoginForm />
            <LoginFooter />
        </>
    ) 
}
export default Login