import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { AuthState } from './types/AuthState'

export default function Layout (props: { authState: AuthState }): any {
  return (
        <>
            <Navbar authState={props.authState} />
            <div className="container">
                <Outlet />
            </div>
        </>
  )
}
