import { CommandOptions, RowanTreeAuthServiceClient } from 'rowantree.auth.typescript.sdk'

const commandOptions: CommandOptions = {
  tld: '<<>>',
  sleepTime: 5,
  retryCount: 3,
  timeout: 10
}
export default new RowanTreeAuthServiceClient(commandOptions)
