import { useEffect, useState } from 'react'
import RowanTreeAuthServiceClient from '../services/auth.service'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Token } from 'rowantree.auth.typescript.sdk'
import { setRequestHeaders } from '../common/headers'
import { useNavigate } from 'react-router-dom'

interface LoginState {
  username: string
  password: string
  loading: boolean
  message: string
}

export default function Login (): any {
  const navigate = useNavigate()
  const [redirect, setRedirect] = useState(false)
  const [loginState, setLoginState] = useState<LoginState>({
    username: '',
    password: '',
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
      password: Yup.string().required('This field is required!')
    })
  }

  function handleLogin (formValue: { username: string, password: string }): any {
    const { username, password } = formValue
    setLoginState({ ...loginState, message: '', loading: true })

    RowanTreeAuthServiceClient.authUser(username, password).then(
      (token: Token) => {
        localStorage.setItem('state', JSON.stringify({
          jwt: token.accessToken,
          guid: RowanTreeAuthServiceClient.decodeJwt(token.accessToken).sub
        }))

        // Set headers
        setRequestHeaders()
        setRedirect(true)
      },
      error => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-optional-chain
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        setLoginState({ ...loginState, message: resMessage, loading: false })
      }
    )
  }

  const loading = loginState.loading
  const message = loginState.message

  const initialValues = {
    username: '',
    password: ''
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
                                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Login</span>
                                </button>
                            </div>

                            {message !== '' && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                        </Form>
                    </Formik>
                </div>
            </div>
  )
}
