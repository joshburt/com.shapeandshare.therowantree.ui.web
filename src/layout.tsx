import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export default function Layout (props: any): any {
  return (
        <>
            <Navbar jwt={props.userState.jwt} guid={props.userState.guid} />
            <div className="container">
                <Outlet />
            </div>
        </>
  )
}
