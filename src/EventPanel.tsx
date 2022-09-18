import { Component } from 'react'
import './EventPanel.css'
import {
  FeatureType,
  IncomeSourceType,
  StoreType,
  UserFeatureState, UserIncome,
  UserNotification,
  UserStore
} from 'rowantree.service.typescript.sdk'
import Menu from './Menu'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  model: {
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

interface State {
  notifications: UserNotification[]
}

class EventPanel extends Component<Props, State> {
  public menuBuilder: Menu

  constructor (props: Props) {
    super(props)

    this.menuBuilder = new Menu()
    this.state = {
      notifications: []
    }
  }

  public buildEventPanel (): any[] {
    // console.log(this.props.model.notifications)

    const panelElements: any[] = []

    panelElements.push(this.menuBuilder.buildLabel(this.menuBuilder.buildMenuBorderTopWithLabel('events', false, 45), 'div_event_EventPanel_buildMenuBorderTop'))
    panelElements.push(this.menuBuilder.buildBreak('break_EventPanel_buildMenuBorderTop'))
    // console.log(JSON.stringify(this.props.model.notifications))
    const priorNotifications: UserNotification[] = this.state.notifications
    const newNotifications: UserNotification[] = (this.props.model.notifications != null) ? this.props.model.notifications : []
    const completeNotifications = priorNotifications.concat(newNotifications)
    let truncatedNotifications = completeNotifications
    if (completeNotifications.length > 10) {
      truncatedNotifications = completeNotifications.splice(completeNotifications.length - 10, completeNotifications.length)
    }

    this.state = { notifications: truncatedNotifications }

    // this.setState({ notifications: (this.props.model.notifications != null) ? this.props.model.notifications : [] })
    // // merge notifications
    // this.props.model.notifications?.forEach((notification) => {
    //   const newNotifications = this.state.notifications
    //   newNotifications.push(notification)
    //   this.setState({ notifications: newNotifications })
    // })

    // truncate to some limit
    // TODO

    // render them
    truncatedNotifications.forEach((notification) => {
    // this.props.model.notifications?.forEach((notification) => {
      const noteId: string = crypto.randomUUID()
      const title: string = notification.event.title
      const text: Record<number, string> = notification.event.text
      // const reward = notification.event.reward
      // const curse = notification.event.curse

      let story: string = ''
      for (const key in text) {
        story = story + text[key] + '\n'
      }
      panelElements.push(this.menuBuilder.buildLabelWithTitle(this.menuBuilder.buildMenuItem(title, false, 40), story, 'div_event_title_' + noteId))
      panelElements.push(this.menuBuilder.buildBreak('break_event_text_story' + noteId))

      // TODO: add more reward/boon info to the hover text
      //                    if (reward !== undefined){
      //                        panelElements.push(this.buildLabel('| ' + JSON.stringify(reward), 'div_event_reward_' + noteId));
      //                        panelElements.push(this.buildBreak('break_event_reward_' + noteId))
      //                    }
      //                    if (curse !== undefined) {
      //                        panelElements.push(this.buildLabel('| ' + JSON.stringify(curse), 'div_event_curse_' + noteId));
      //                        panelElements.push(this.buildBreak('break_event_curse_' + noteId))
      //                    }
    })

    panelElements.push(this.menuBuilder.buildLabel(this.menuBuilder.buildMenuBorderBottom(), 'div_event_EventPanel_buildMenuBorderBottom'))
    panelElements.push(this.menuBuilder.buildBreak('break_EventPanel_buildMenuBorderBottom'))

    return panelElements
  }

  public render (): any {
    return (
            <div className="EventPanel" key="EventPanel">
                {this.buildEventPanel()}
            </div>
    )
  }
}

export default EventPanel
