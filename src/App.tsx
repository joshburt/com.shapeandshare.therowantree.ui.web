import { Route, Routes, useNavigate } from 'react-router-dom'
import Layout from './layout'
import Home from './components/home.component'
import Login from './components/login.component'
import { Register } from './components/register.component'
import Game from './components/game.component'
import { useEffect, useState } from 'react'
import { AuthState } from './types/AuthState'
import './App.css'

export default function App (): any {
  const navigate = useNavigate()
  const [redirect, setRedirect] = useState<string | undefined>(undefined)
  const [authState, setAuthState] = useState<AuthState>({
    jwt: undefined,
    guid: undefined
  })

  setTimeout(() => {
    const rawState: string | null = localStorage.getItem('state')
    if (rawState !== null) {
      setAuthState(JSON.parse(rawState))
      setRedirect('game')
    } else {
      setAuthState({
        jwt: undefined,
        guid: undefined
      })
    }
  }, 5000)

  useEffect(() => {
    if (redirect !== undefined) {
      return navigate(`/${redirect}`)
    }
  }, [redirect])

  return (<Routes>
        <Route element={<Layout authState={authState}/>}>
            <Route path='/' element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/game" element={<Game guid={authState.guid}/>}/>
        </Route>
    </Routes>)
}
