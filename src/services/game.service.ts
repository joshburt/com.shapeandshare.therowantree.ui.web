import { CommandOptions, RowanTreeServiceClient } from 'rowantree.game.service.typescript.sdk'
import RowanTreeAuthServiceClient from '../services/auth.service'

const commandOptions: CommandOptions = {
  tld: '<<>>',
  sleepTime: 5,
  retryCount: 3,
  timeout: 10
}
export default new RowanTreeServiceClient(RowanTreeAuthServiceClient, commandOptions, true)
