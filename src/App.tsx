import { Component } from 'react'
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import EventBus from './common/EventBus'
import Home from './components/home.component'
import Login from './components/login.component'
import Register from './components/register.component'
// import { CommandFailedError, Token } from 'rowantree.auth.typescript.sdk'
// import RowanTreeAuthServiceClient from './services/auth.service'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

interface State {
  jwt: string | undefined
  guid: string | undefined
}

class App extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      jwt: undefined,
      guid: undefined
    }
  }

  render (): any {
    const localState = this.state

    return (
        <Router>
          <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <Link to={'/'} className="navbar-brand">
                The Rowan Tree
              </Link>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/home'} className="nav-link">
                    Home
                  </Link>
                </li>
              </div>

              {localState.jwt === undefined
                ? (
                      <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                          <a href="/login" className="nav-link" onClick={this.logOut}>
                            LogOut
                          </a>
                        </li>
                      </div>
                  )
                : (
                      <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                          <Link to={'/login'} className="nav-link">
                            Login
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link to={'/register'} className="nav-link">
                            Sign Up
                          </Link>
                        </li>
                      </div>
                  )}
            </nav>

            <div className="container mt-3">
              <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/home' element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
              </Routes>
            </div>

            { /* <AuthVerify logOut={this.logOut}/> */}
          </div>
        </Router>

    )
  }

  componentDidMount (): void {
    const state: string | null = localStorage.getItem('state')
    if (state !== null) {
      this.setState(JSON.parse(state))
    }
    EventBus.on('logout', this.logOut)

    // try {
    //   const state: string | null = localStorage.getItem('state')
    //   if (state !== null) {
    //     this.setState(JSON.parse(state))
    //   }
    //
    //   // const token: Token = await RowanTreeAuthServiceClient.authUser('username', 'password')
    //   // this.setState({ jwt: token.accessToken, guid: RowanTreeAuthServiceClient.decodeJwt(token.accessToken).sub })
    //   // localStorage.setItem('state', JSON.stringify(this.state))
    // } catch (error) {
    //   if (error instanceof CommandFailedError) {
    //     // Failed to auth user for some reason.
    //     this.setState({ jwt: undefined, guid: this.state.guid })
    //   } else {
    //     throw error
    //   }
    // }
    // console.log('componentDidMount')
  }

  componentWillUnmount (): void {
    EventBus.remove('logout', this.logOut)
  }

  logOut (): void {
    this.setState({
      jwt: undefined,
      guid: undefined
    })
    localStorage.removeItem('state')
  }
}

export default App
