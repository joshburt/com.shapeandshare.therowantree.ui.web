import { CommandOptions, RowanTreeServiceClient } from 'rowantree.game.service.typescript.sdk'
import RowanTreeAuthServiceClient from '../services/auth.service'

const commandOptions: CommandOptions = {
  sleepTime: 3,
  retryCount: 10,
  tld: '<<>>',
  timeout: 10
}
export default new RowanTreeServiceClient(RowanTreeAuthServiceClient, commandOptions, true)
