import { Component } from 'react'
import {
  FeatureDetailsType,
  FeatureType,
  StoreType, UserActiveStatus,
  UserNotification, UserState,
  UserStore
} from 'rowantree.service.typescript.sdk'
import RowanTreeServiceClient from '../services/game.service'
import { setRequestHeaders } from '../common/headers'

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
    activeFeatureState: FeatureDetailsType | undefined
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
    if (this.state.guid !== null) {
      RowanTreeServiceClient.userStateGet(this.state.guid).then((userState: UserState) => {
        this.setState({ seconds: (this.state.seconds + 1), userState })
      }, error => {
        console.log(error)
      })
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
  }

  componentDidMount (): void {
    const localState = localStorage.getItem('state')
    if (localState !== null) {
      this.setState({ guid: JSON.parse(localState).guid })
      RowanTreeServiceClient.userActiveSet(true).then((status: UserActiveStatus) => { console.log(status) }, error => { console.log(error) })
    }

    setRequestHeaders()
    this.interval = setInterval(() => this.tick(), 1000)
  }

  render (): any {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{JSON.stringify(this.state)}</h3>
        </header>
      </div>
    )
  }
}
