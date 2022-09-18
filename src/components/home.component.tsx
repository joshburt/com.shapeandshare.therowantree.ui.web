import { Component } from 'react'

// import UserService from "../services/user.service";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
}

interface State {
  content: string
}

export default class Home extends Component<Props, State> {
  componentDidMount (): void {
    this.setState({
      content: ''
    })
  }

  render (): any {
    return (
        <div className="container">
            <header className="landingPage">
                <h3>{this.state?.content}</h3>
            </header>
        </div>
    )
  }
}
