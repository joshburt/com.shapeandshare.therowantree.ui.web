import { CommandOptions, RowanTreeServiceClient } from 'rowantree.game.service.typescript.sdk'
import RowanTreeAuthServiceClient from '../services/auth.service'

const commandOptions: CommandOptions = {
  sleepTime: 5,
  retryCount: 3,
  tld: 'sandbox.rowantree.shapeandshare.net',
  timeout: 10
}
export default new RowanTreeServiceClient(RowanTreeAuthServiceClient, commandOptions, true)
