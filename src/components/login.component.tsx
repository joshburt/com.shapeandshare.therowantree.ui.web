import { Component } from 'react'
import RowanTreeAuthServiceClient from '../services/auth.service'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Token } from 'rowantree.auth.typescript.sdk'
import { setRequestHeaders } from '../common/headers'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
}

interface State {
  username: string
  password: string
  loading: boolean
  message: string
}

export default class Login extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  componentDidMount (): void {
    this.setState({
      username: '',
      password: '',
      loading: false,
      message: ''
    })
  }

  validationSchema (): any {
    return Yup.object().shape({
      username: Yup.string().required('This field is required!'),
      password: Yup.string().required('This field is required!')
    })
  }

  handleLogin (formValue: { username: string, password: string }): any {
    const { username, password } = formValue

    this.setState({
      message: '',
      loading: true
    })

    RowanTreeAuthServiceClient.authUser(username, password).then(
      (token: Token) => {
        localStorage.setItem('state', JSON.stringify({
          jwt: token.accessToken,
          guid: RowanTreeAuthServiceClient.decodeJwt(token.accessToken).sub
        }))

        // Set headers
        setRequestHeaders()
      },
      error => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-optional-chain
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        this.setState({
          loading: false,
          message: resMessage
        })
      }
    )
  }

  render (): any {
    let loading: boolean = false
    let message: string = ''
    if (this.state != null) {
      loading = this.state.loading
      message = this.state.message
    }

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
                        validationSchema={this.validationSchema}
                        onSubmit={this.handleLogin}
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
}
