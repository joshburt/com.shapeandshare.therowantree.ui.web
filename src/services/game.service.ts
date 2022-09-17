import { CommandOptions, RowanTreeServiceClient } from 'rowantree.service.typescript.sdk'
import RowanTreeAuthServiceClient from '../services/auth.service'

const commandOptions: CommandOptions = {
  sleepTime: 1,
  retryCount: 5,
  endpoint: 'http://localhost:8000',
  timeout: 5
}
export default new RowanTreeServiceClient(RowanTreeAuthServiceClient, commandOptions, true)
