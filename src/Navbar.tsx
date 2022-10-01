import { Link } from 'react-router-dom'
import { AuthState } from './types/AuthState'

export function Navbar (props: { authState: AuthState }): any {
  //  TODO: THERE HAS TO BE A BETTER WAY
  function logOut (): any {
    localStorage.removeItem('state')
  }

  return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={'/'} className="navbar-brand">
                    The Rowan Tree
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={'/'} className="nav-link">
                            Home
                        </Link>
                    </li>
                </div>

                {props.authState.jwt !== undefined
                  ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                 <a href="/login" className="nav-link" onClick={logOut}>
                                    Log Out
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

                {(props.authState.guid !== undefined && props.authState.jwt !== undefined) && (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={'/game'} className="nav-link">
                                Game
                            </Link>
                        </li>
                    </div>
                )}
            </nav>
        </>
  )
}