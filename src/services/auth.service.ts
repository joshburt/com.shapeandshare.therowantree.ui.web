import { CommandOptions, RowanTreeAuthServiceClient } from 'rowantree.auth.typescript.sdk'

const commandOptions: CommandOptions = {
  sleepTime: 3,
  retryCount: 10,
  tld: '<<>>',
  timeout: 10
}
export default new RowanTreeAuthServiceClient(commandOptions)
