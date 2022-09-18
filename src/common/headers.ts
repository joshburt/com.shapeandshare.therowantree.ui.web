import { Token } from 'rowantree.auth.typescript.sdk'
import RowanTreeServiceClient from '../services/game.service'

export function setRequestHeaders (): void {
  const userState = localStorage.getItem('state')
  if (userState !== null) {
    const token: Token = {
      accessToken: JSON.parse(userState).jwt,
      tokenType: 'bearer'
    }
    RowanTreeServiceClient.setCredentials(token)
  }
}
