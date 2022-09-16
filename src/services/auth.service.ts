import { CommandOptions, RowanTreeAuthServiceClient } from 'rowantree.auth.typescript.sdk'

const commandOptions: CommandOptions = {
  sleepTime: 1,
  retryCount: 5,
  endpoint: 'http://localhost:8001',
  timeout: 5
}
export default new RowanTreeAuthServiceClient(commandOptions)
