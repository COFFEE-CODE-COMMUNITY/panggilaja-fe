import { Link, NavLink } from "react-router-dom"
import AuthLayout from "../../components/modules/layouts/AuthLayout"
import PassResetForm from "./sections/PassResetForm"

const PassReset = () => {
  return (
    <AuthLayout
        title='Lupa Kata Sandi Anda?'
        subtitle='Jangan khawatir, kami akan membantu Anda.'
        type='Reset Password'
        reset='true'
    >
        <PassResetForm/>
    </AuthLayout>
  )
}

export default PassReset