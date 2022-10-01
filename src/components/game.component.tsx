import { useEffect, useState } from 'react'
import {
  UserActiveStatus,
  UserState
} from 'rowantree.game.service.typescript.sdk'
import RowanTreeServiceClient from '../services/game.service'
import { setRequestHeaders } from '../common/headers'
import StatusPanel from './game/StatusPanel'
import TravelPanel from './game/TravelPanel'
import PopulationPanel from './game/PopulationPanel'
import IncomePanel from './game/IncomePanel'
import MerchantsPanel from './game/MerchantsPanel'
import StoresPanel from './game/StoresPanel'
import EventPanel from './game/EventPanel'

export default function Game (props: { guid: string }): any {
  const [seconds, setSeconds] = useState<number>(0)
  const [isActive, setIsActive] = useState(false)
  const [userState, setUserState] = useState<UserState | undefined>(undefined)

  useEffect(() => {
    if (!isActive) {
      if (props.guid !== undefined) {
        console.log('Setting user active ..')
        RowanTreeServiceClient.userActiveSet(true).then((status: UserActiveStatus) => {
        }, error => {
          console.log(`Failed to set active, error: (${(JSON.stringify(error))})`)
        })
        setRequestHeaders()
      }
      setIsActive(true)
    }

    let interval: NodeJS.Timer | undefined
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1)
        if ((props.guid !== undefined) && (seconds % 5 === 0)) {
          RowanTreeServiceClient.userStateGet(props.guid).then((newUserState: UserState) => {
            if (newUserState !== undefined) {
              setUserState(newUserState)
            }
          }, error => {
            console.log(error)
          })
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive, seconds])

  //
  // useEffect(() => {
  //   // console.log('useEffect')
  //   if (props.guid !== undefined) {
  //     console.log('Setting user active ..')
  //     RowanTreeServiceClient.userActiveSet(true).then((status: UserActiveStatus) => {
  //     }, error => {
  //       console.log(`Failed to set active, error: (${(JSON.stringify(error))})`)
  //     })
  //     setRequestHeaders()
  //   }
  // }, [seconds, isActive])
  //
  // setTimeout(() => {
  //   console.log('setTimeout')
  //   if (props.guid !== undefined) {
  //     console.log('Getting user state ..')
  //     RowanTreeServiceClient.userStateGet(props.guid).then((newUserState: UserState) => {
  //       if (newUserState !== undefined) {
  //         setUserState(newUserState)
  //         console.log('Updated')
  //       }
  //     }, error => {
  //       console.log(error)
  //     })
  //   }
  //   setSeconds(seconds + 1)
  // }, 1000)

  return (<>
            <div className="col themed-grid-col">[DEBUG] Seconds: {seconds} [/DEBUG]</div>
            <div className="row">
                <div className="col themed-grid-col">
                    <div className="row">
                        <div className="col-md-6 themed-grid-col"><StatusPanel state={userState}/></div>
                        <div className="col-md-6 themed-grid-col"><TravelPanel state={userState}/></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 themed-grid-col"><PopulationPanel state={userState}/></div>
                        <div className="col-md-6 themed-grid-col"><IncomePanel state={userState}/></div>
                    </div>
                </div>
                <div className="col-lg">
                    <div className="row">
                        <div className="col"><MerchantsPanel state={userState}/></div>
                        <div className="col"><StoresPanel state={userState}/></div>
                    </div>
                </div>
            </div>
            <div className="col-lg"><EventPanel state={userState}/></div>
        </>)
}

Game.defaultProps = {
  seconds: 0,
  guid: undefined,
  userState: undefined
}
