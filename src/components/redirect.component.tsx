import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function RedirectTest (): any {
  const navigate = useNavigate()

  useEffect(() => {
    return navigate('/game')
  })
}
