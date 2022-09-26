import { Component, ReactNode } from 'react'
import {
  FeatureType,
  IncomeSourceType,
  StoreType,
  UserActiveStatus,
  UserFeatureState,
  UserIncome,
  UserNotification,
  UserState,
  UserStore
} from 'rowantree.game.service.typescript.sdk'
import RowanTreeServiceClient from '../services/game.service'
import { setRequestHeaders } from '../common/headers'
import StatusPanel from '../StatusPanel'
import EventBus from '../common/EventBus'
import TravelPanel from '../TravelPanel'
import PopulationPanel from '../PopulationPanel'
import IncomePanel from '../IncomePanel'
import MerchantsPanel from '../MerchantsPanel'
import StoresPanel from '../StoresPanel'
import EventPanel from '../EventPanel'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
}

interface State {
  seconds: number
  guid: string | undefined
  userState: {
    active: boolean
    stores: Record<StoreType, UserStore> | undefined
    incomes: Record<IncomeSourceType, UserIncome> | undefined
    features: Set<FeatureType> | undefined
    activeFeatureState: UserFeatureState | undefined
    population: number | undefined
    merchants: Set<StoreType> | undefined
    notifications: UserNotification[] | undefined
  }
}

export default class Game extends Component<Props, State> {
  interval: NodeJS.Timer | undefined

  tick (): void {
    if (this.state.seconds == null) {
      this.setState({ seconds: 0 })
    }
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
  }

  componentWillUnmount (): void {
    clearInterval(this.interval)
    EventBus.remove('logout', this.logOut)
  }

  componentDidMount (): void {
    const localState = localStorage.getItem('state')
    if (localState !== null) {
      this.setState({ guid: JSON.parse(localState).guid })
      RowanTreeServiceClient.userActiveSet(true).then((status: UserActiveStatus) => {
      }, error => {
        console.log(`Failed to set active, error: (${(JSON.stringify(error))})`)
      })
      setRequestHeaders()
    } else {
      this.setState({
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
      })
    }
    this.interval = setInterval(() => this.tick(), 1000)
  }

  logOut (): void {
    localStorage.removeItem('state')
  }

  render (): ReactNode {
    return (<main>
            <div className="col themed-grid-col">[DEBUG] Seconds: {this.state?.seconds} [/DEBUG]</div>
            <div className="row">
                <div className="col themed-grid-col">
                    <div className="row">
                        <div className="col-md-6 themed-grid-col"><StatusPanel model={this.state?.userState}/></div>
                        <div className="col-md-6 themed-grid-col"><TravelPanel model={this.state?.userState}/></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 themed-grid-col"><PopulationPanel model={this.state?.userState}/></div>
                        <div className="col-md-6 themed-grid-col"><IncomePanel model={this.state?.userState}/></div>
                    </div>
                </div>
                <div className="col-lg">
                    <div className="row">
                        <div className="col"><MerchantsPanel model={this.state?.userState}/></div>
                        <div className="col"><StoresPanel model={this.state?.userState}/></div>
                    </div>
                </div>
            </div>
            <div className="col-lg"><EventPanel model={this.state?.userState}/></div>
    </main>

    )
  }
}
