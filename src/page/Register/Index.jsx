import React from 'react'
import AuthLayout from '../../components/modules/layouts/AuthLayout'
import NavLink from '../../components/modules/navigation/NavLink'
import RegisterForm from './sections/RegisterForm'

const RegisterPage = () => {
  return (
    <AuthLayout
      title='Buat akun baru'
      subtitle='Daftar & Dapatkan Jasa Terbaik di Dekat Anda'
      type='Daftar'
      navAuth={
        <p className='text-h5 text-primary w-full text-center'>
          Sudah punya akun? <NavLink className="font-semibold text-primary" link='/login' text='masuk disini'/>'
        </p>
      }
    >
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, quo eligendi? Est nemo vitae possimus. Ducimus fugiat fugit architecto iusto voluptate veritatis perferendis laborum laudantium voluptates vero labore dolor deleniti qui explicabo animi non at minus, nostrum quas dicta eius repudiandae minima error. Blanditiis harum labore architecto commodi autem, laudantium excepturi necessitatibus, temporibus voluptatem aliquid officiis inventore distinctio et minima enim doloremque quo. Ratione saepe porro quisquam fugit necessitatibus totam. Unde reiciendis nulla dolorum? Voluptatum cumque, laudantium obcaecati quia porro animi suscipit! Reiciendis eum deleniti aperiam asperiores fuga eos vel, rem possimus unde voluptatem dolor voluptas expedita, iusto aut! Ut.
    </AuthLayout>
  )
}

export default RegisterPage