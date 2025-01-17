import React, { useEffect, useState } from 'react'
import { Image, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import RegisterForm from '../RegisterForm/RegisterForm'
import LoginForm from '../LoginForm/LoginForm'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../apis'

const Header = () => {
  const navigate = useNavigate()

  const gotoSigninPage = () => {
    navigate('/signin')
  }
  const gotoSignupPage = () => {
    navigate('/signup')
  }

  const [isLogin, setIsLogin] = useState(false)
  const [userID, setUserID] = useState('')

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken') as string
    const username = localStorage.getItem('username') as string
    if (storedToken) {
      api.checkToken(storedToken).then(response => {
        const isTokenExpired = response.data

        if (isTokenExpired) {
          logout()
        } else {
          setIsLogin(true)
          setUserID(username)
        }
      })
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('username')
    setIsLogin(false)
    setUserID('')
  }

  return (
    <div id={'header-frame'}>
      <Link to={'/'}>
        <Image src={'/img/Logo.png'} id={'goodong-logo'} height="60" />
      </Link>
      {!isLogin && (
        <span id={'regi-span'}>
          <button
            className={'button'}
            id={'signin-button'}
            onClick={gotoSigninPage}>
            Sign in
          </button>
          <button
            className={'button'}
            id={'create-account-button'}
            onClick={gotoSignupPage}>
            Create account
          </button>
        </span>
      )}
      {isLogin && userID !== '' && (
        <span id={'user-span'}>
          <span className={'user-info'} id={'user-info-text'}>
            {userID} 님 반갑습니다!
          </span>
          <Link to={`/${userID}/repository`}>
            <button className={'button'} id={'my-repository-button'}>
              My Repository
            </button>
          </Link>
          <Link to={'/'}>
            <button className={'button'} id={'logout-button'} onClick={logout}>
              Logout
            </button>
          </Link>
        </span>
      )}
      {/* <Modal show={registerModal} onHide={hideRegisterModal}>
        <Modal.Body>
          <RegisterForm />
        </Modal.Body>
      </Modal>

      <Modal show={loginModal} onHide={hideLoginModal}>
        <Modal.Body>
          <LoginForm
            setLoginModal={setLoginModal}
            setIsLogin={setIsLogin}
            setId={setUserID}
          />
        </Modal.Body>
      </Modal> */}
    </div>
  )
}

export default Header
