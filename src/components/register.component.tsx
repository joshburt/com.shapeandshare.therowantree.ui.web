import { useEffect, useState } from 'react'
import RowanTreeAuthServiceClient from '../services/auth.service'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Token, User } from 'rowantree.auth.typescript.sdk'
import { setRequestHeaders } from '../common/headers'
import RowanTreeServiceClient from '../services/game.service'
import { UserWorld } from 'rowantree.game.service.typescript.sdk'
import { useNavigate } from 'react-router-dom'
import { LoginState } from '../types/LoginState'
import { AuthState } from '../types/AuthState'

export function Register (): any {
  const navigate = useNavigate()

  const [redirect, setRedirect] = useState(false)
  const [loginState, setLoginState] = useState<LoginState>({
    username: '',
    password: '',
    email: '',
    loading: false,
    message: ''
  })

  useEffect(() => {
    if (redirect) {
      return navigate('/game')
    }
  })

  function validationSchema (): any {
    return Yup.object().shape({
      username: Yup.string().required('This field is required!'),
      password: Yup.string().required('This field is required!'),
      email: Yup.string().email().required('This field is required!')
    })
  }

  function handleLogin (formValue: { username: string, password: string, email: string }): any {
    const { username, password, email } = formValue

    setLoginState({
      ...loginState,
      message: '',
      loading: true
    })

    RowanTreeAuthServiceClient.registerUser(username, password, email).then(
      (user: User) => {
        RowanTreeAuthServiceClient.authUser(username, password).then(
          (token: Token) => {
            // Store details in local storage
            const authState: AuthState = {
              jwt: token.accessToken,
              guid: RowanTreeAuthServiceClient.decodeJwt(token.accessToken).sub
            }
            localStorage.setItem('state', JSON.stringify(authState))

            // Set headers
            setRequestHeaders()

            // Create the player within the game
            RowanTreeServiceClient.userCreate(authState.guid).then((userWorld: UserWorld) => {
              console.log(userWorld)

              // load the game
              setRedirect(true)
            }, error => {
              console.log(error)
            })
          },
          error => {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-optional-chain
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            setLoginState({
              ...loginState,
              loading: false,
              message: resMessage
            })
          }
        )
      },
      error => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-optional-chain
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        setLoginState({
          ...loginState,
          loading: false,
          message: resMessage
        })
      }
    )
  }

  // const loading: boolean = (this.state?.loading !== undefined) ? this.state.loading : false
  // const message: string = (this.state?.message !== undefined) ? this.state.message : ''
  const initialValues = {
    username: loginState.username,
    password: loginState.password,
    email: loginState.email as string
  }

  return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                        <Form>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Field name="username" type="text" className="form-control"/>
                                <ErrorMessage
                                    name="username"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className="form-control"/>
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="email" className="form-control"/>
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block" disabled={loginState.loading}>
                                    {loginState.loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Login</span>
                                </button>
                            </div>

                            {loginState.message !== '' && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {loginState.message}
                                    </div>
                                </div>
                            )}
                        </Form>
                    </Formik>
                </div>
            </div>
  )
}
