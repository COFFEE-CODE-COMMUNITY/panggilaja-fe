import { Link } from "react-router-dom"
import AuthLayout from "../../components/modules/layouts/AuthLayout"
import PassResetForm from "./sections/PassResetForm"

const PassReset = () => {
  return (
    <AuthLayout
        title='Lupa Kata Sandi Anda?'
        subtitle='Jangan khawatir, kami akan membantu Anda.'
        type='Reset Password'
        reset='true'
        navAuth={
            <Link to='/login' className='text-primary text-center'>Kembali ke login</Link>
        }
    >
        <PassResetForm/>
    </AuthLayout>
  )
}

export default PassReset