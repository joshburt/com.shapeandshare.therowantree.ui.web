import { Component } from 'react'

// import UserService from "../services/user.service";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

interface State {
  content: string
}

export default class Home extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      content: ''
    }
  }

  componentDidMount (): void {
    // UserService.getPublicContent().then(
    //   response => {
    //     this.setState({
    //       content: response.data
    //     });
    //   },
    //   error => {
    //     this.setState({
    //       content:
    //         (error.response && error.response.data) ||
    //         error.message ||
    //         error.toString()
    //     });
    //   }
    // );
  }

  render (): any {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    )
  }
}
