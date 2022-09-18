import { Component, ReactNode } from 'react'
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
  notifications: UserNotification[] | undefined
}

class EventPanel extends Component<Props, State> {
  public menuBuilder: Menu

  constructor (props: Props) {
    super(props)
    this.menuBuilder = new Menu()
  }

  componentDidMount (): void {
    this.setState({
      notifications: []
    })
  }

  public buildNotifications (): UserNotification[] {
    let priorNotifications: UserNotification[] = []
    const localNotifications: string | null = localStorage.getItem('notifications')
    if (localNotifications !== null) {
      const notifications = JSON.parse(localNotifications)
      if (notifications !== undefined) {
        priorNotifications = notifications.notifications
      }
    }

    // truncate to some limit
    const newNotifications: UserNotification[] = (this.props?.model?.notifications !== undefined) ? this.props.model.notifications : []
    const completeNotifications = priorNotifications.concat(newNotifications)
    let truncatedNotifications = completeNotifications
    if (completeNotifications.length > 10) {
      truncatedNotifications = completeNotifications.splice(completeNotifications.length - 10, completeNotifications.length)
    }
    localStorage.setItem('notifications', JSON.stringify({ notifications: truncatedNotifications }))
    return truncatedNotifications
  }

  public buildEventPanel (notifications: UserNotification[]): any[] {
    const panelElements: any[] = []

    panelElements.push(this.menuBuilder.buildLabel(this.menuBuilder.buildMenuBorderTopWithLabel('events', false, 45), 'div_event_EventPanel_buildMenuBorderTop'))
    panelElements.push(this.menuBuilder.buildBreak('break_EventPanel_buildMenuBorderTop'))

    // render them
    notifications.forEach((notification) => {
      const noteId: string = crypto.randomUUID()
      const title: string = notification.event.title
      const text: Record<number, string> = notification.event.text

      let story: string = ''
      for (const key in text) {
        story = story + text[key] + '\n'
      }
      panelElements.push(this.menuBuilder.buildLabelWithTitle(this.menuBuilder.buildMenuItem(title, false, 40), story, 'div_event_title_' + noteId))
      panelElements.push(this.menuBuilder.buildBreak('break_event_text_story' + noteId))
    })

    panelElements.push(this.menuBuilder.buildLabel(this.menuBuilder.buildMenuBorderBottom(), 'div_event_EventPanel_buildMenuBorderBottom'))
    panelElements.push(this.menuBuilder.buildBreak('break_EventPanel_buildMenuBorderBottom'))

    return panelElements
  }

  public render (): ReactNode {
    const notifications = this.buildNotifications()
    const eventPanel = this.buildEventPanel(notifications)

    return (
            <div className="EventPanel" key="EventPanel">
                {eventPanel}
            </div>
    )
  }
}

export default EventPanel
