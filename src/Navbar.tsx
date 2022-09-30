import { Link } from 'react-router-dom'
import { AuthState } from './types/AuthState'

export function Navbar (props: AuthState): any {
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

                {props.jwt !== undefined
                  ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                {/* <a href="/login" className="nav-link" onClick={this.logOut}> */}
                                {/*    Log Out */}
                                {/* </a> */}
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

                {(props.guid !== undefined && props.jwt !== undefined) && (
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
