import { CommandOptions, RowanTreeAuthServiceClient } from 'rowantree.auth.typescript.sdk'

const commandOptions: CommandOptions = {
  sleepTime: 5,
  retryCount: 3,
  tld: 'sandbox.rowantree.shapeandshare.net',
  timeout: 10
}
export default new RowanTreeAuthServiceClient(commandOptions)
