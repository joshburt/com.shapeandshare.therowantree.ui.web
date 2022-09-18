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

class EventPanel extends Component<Props> {
  public buildEventPanel (): any[] {
    const menuBuilder: Menu = new Menu()

    const panelElements: any[] = []

    panelElements.push(menuBuilder.buildLabel(menuBuilder.buildMenuBorderTopWithLabel('events', false, 45), 'div_event_EventPanel_buildMenuBorderTop'))
    panelElements.push(menuBuilder.buildBreak('break_EventPanel_buildMenuBorderTop'))

    this.props.model.notifications?.forEach((notification) => {
      const noteId: string = crypto.randomUUID()
      const title: string = notification.event.title
      const text: Record<number, string> = notification.event.text
      // const reward = notification.event.reward
      // const curse = notification.event.curse

      let story: string = ''
      for (const key in text) {
        story = story + key + '\n'
      }

      panelElements.push(menuBuilder.buildLabelWithTitle(menuBuilder.buildMenuItem(title, true, 40), story, 'div_event_title_' + noteId))
      panelElements.push(menuBuilder.buildBreak('break_event_text_story' + noteId))

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

    panelElements.push(menuBuilder.buildLabel(menuBuilder.buildMenuBorderBottom(), 'div_event_EventPanel_buildMenuBorderBottom'))
    panelElements.push(menuBuilder.buildBreak('break_EventPanel_buildMenuBorderBottom'))

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
