import { useEffect, useState } from 'react'
import {
  UserActiveStatus,
  UserState
} from 'rowantree.game.service.typescript.sdk'
import RowanTreeServiceClient from '../services/game.service'
import { setRequestHeaders } from '../common/headers'
import StatusPanel from '../StatusPanel'
import TravelPanel from '../TravelPanel'
import PopulationPanel from '../PopulationPanel'
import IncomePanel from '../IncomePanel'
import MerchantsPanel from '../MerchantsPanel'
import StoresPanel from '../StoresPanel'
import EventPanel from '../EventPanel'

export default function Game (props: any): any {
  const [seconds, setSeconds] = useState<number>(0)
  const [userState, setUserState] = useState<UserState | undefined>(undefined)

  useEffect(() => {
    console.log('useEffect')
    if (props.guid !== undefined) {
      console.log('Setting user active ..')
      RowanTreeServiceClient.userActiveSet(true).then((status: UserActiveStatus) => {
      }, error => {
        console.log(`Failed to set active, error: (${(JSON.stringify(error))})`)
      })
      setRequestHeaders()
    }
  }, [])

  setTimeout(() => {
    console.log('setTimeout')
    if (props.guid !== undefined) {
      console.log('Getting user state ..')
      RowanTreeServiceClient.userStateGet(props.guid).then((newUserState: UserState) => {
        if (newUserState !== undefined) {
          setUserState(newUserState)
          console.log('Updated')
        }
      }, error => {
        console.log(error)
      })
    }
    setSeconds(seconds + 10)
  }, 10000)

  return (<>
            <div className="col themed-grid-col">[DEBUG] Seconds: {seconds} [/DEBUG]</div>
            <div className="row">
                <div className="col themed-grid-col">
                    <div className="row">
                        <div className="col-md-6 themed-grid-col"><StatusPanel model={userState as any}/></div>
                        <div className="col-md-6 themed-grid-col"><TravelPanel model={userState as any}/></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 themed-grid-col"><PopulationPanel model={userState as any}/></div>
                        <div className="col-md-6 themed-grid-col"><IncomePanel model={userState as any}/></div>
                    </div>
                </div>
                <div className="col-lg">
                    <div className="row">
                        <div className="col"><MerchantsPanel model={userState as any}/></div>
                        <div className="col"><StoresPanel model={userState as any}/></div>
                    </div>
                </div>
            </div>
            <div className="col-lg"><EventPanel model={userState as any}/></div>
        </>)
}

Game.defaultProps = {
  seconds: 0,
  guid: undefined,
  userState: undefined
}
