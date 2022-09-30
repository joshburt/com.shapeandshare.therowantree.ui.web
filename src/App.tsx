import { Route, Routes } from 'react-router-dom'
import Layout from './layout'
import Home from './components/home.component'
import Login from './components/login.component'
import Register from './components/register.component'
import Game from './components/game.component'
import RedirectTest from './components/redirect.component'
import { useEffect, useState } from 'react'

export default function App (): any {
  const [userState, setUserState] = useState({
    jwt: undefined,
    guid: undefined
  })

  useEffect(() => {
    const rawState: string | null = localStorage.getItem('state')
    if (rawState !== null) {
      setUserState(JSON.parse(rawState))
    }
  }, [])

  return (<Routes>
        <Route element={<Layout userState={userState}/>}>
            <Route path='/' element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/game" element={<Game guid={userState.guid}/>}/>
            <Route path="/redirect" element={<RedirectTest/>}/>
        </Route>
    </Routes>)
}
