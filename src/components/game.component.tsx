import { Component } from 'react'
import {
  FeatureType,
  StoreType, UserActiveStatus, UserFeatureState,
  UserNotification, UserState,
  UserStore
} from 'rowantree.service.typescript.sdk'
import RowanTreeServiceClient from '../services/game.service'
import { setRequestHeaders } from '../common/headers'
import StatusPanel from '../StatusPanel'
import EventBus from '../common/EventBus'
// import TravelPanel from '../TravelPanel'
// import PopulationPanel from '../PopulationPanel'
// import IncomePanel from '../IncomePanel'
// import MerchantsPanel from '../MerchantsPanel'
// import StoresPanel from '../StoresPanel'
// import EventPanel from '../EventPanel'

// import UserService from "../services/user.service";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

interface State {
  seconds: number
  guid: string | undefined
  userState: {
    active: boolean
    stores: Record<StoreType, UserStore> | undefined
    incomes: Record<StoreType, UserStore> | undefined
    features: Set<FeatureType> | undefined
    activeFeatureState: UserFeatureState | undefined
    population: number | undefined
    merchants: Set<StoreType> | undefined
    notifications: UserNotification[] | undefined
  }

}

export default class Game extends Component<Props, State> {
  interval: NodeJS.Timer | undefined

  constructor (props: Props) {
    super(props)

    this.state = {
      seconds: 0,
      guid: undefined,
      userState: {
        active: false,
        stores: undefined,
        incomes: undefined,
        features: undefined,
        activeFeatureState: undefined,
        population: undefined,
        merchants: undefined,
        notifications: undefined
      }
    }
  }

  tick (): void {
    if (this.state.guid !== undefined) {
      RowanTreeServiceClient.userStateGet(this.state.guid).then((userState: UserState) => {
        this.setState({ seconds: (this.state.seconds + 1), userState })
      }, error => {
        console.log(error)
        EventBus.dispatch('logout')
      })
    } else {
      this.setState({ seconds: (this.state.seconds + 1) })
    }

    // const previousState = this.state
    // if (previousState !== null) {
    //
    //   console.log(newState)
    //   this.setState(newState)
    // }
  }

  componentWillUnmount (): void {
    clearInterval(this.interval)
    EventBus.remove('logout', this.logOut)
  }

  componentDidMount (): void {
    const localState = localStorage.getItem('state')
    if (localState !== null) {
      this.setState({ guid: JSON.parse(localState).guid })
      RowanTreeServiceClient.userActiveSet(true).then((status: UserActiveStatus) => { }, error => {
        console.log(`Failed to set active, error: (${(JSON.stringify(error))})`)
      })
      setRequestHeaders()
    }
    this.interval = setInterval(() => this.tick(), 1000)
  }

  logOut (): void {
    localStorage.removeItem('state')
  }

  render (): any {
    // return (
    //   <div className="container">
    //     <header className="jumbotron">
    //       <h3>{JSON.stringify(this.state)}</h3>
    //     </header>
    //   </div>
    // )

    return (
        <table>
          <tbody>
          <tr>
            <td colSpan={4}>
              <div>
                [DEBUG] Seconds: {this.state.seconds} [/DEBUG]
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <StatusPanel model={this.state.userState} />
              {/* <TravelPanel model={this.state.userState} /> */}
            </td>
          {/*  <td> */}
          {/*    <PopulationPanel model={this.state.userState} /> */}
          {/*    <IncomePanel model={this.state.userState}/> */}
          {/*  </td> */}
          {/*  <td> */}
          {/*    <MerchantsPanel model={this.state.userState} /> */}
          {/*  </td> */}
          {/*  <td> */}
          {/*    <StoresPanel model={this.state.userState} /> */}
          {/*  </td> */}
          </tr>
          {/* <tr> */}
          {/*  <td colSpan="4"> */}
          {/*    <EventPanel model={this.state.userState} /> */}
          {/*  </td> */}
          {/* </tr> */}
          </tbody>
        </table>
    )
  }
}
