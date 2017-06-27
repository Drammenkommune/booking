import React from 'react'
import Relay from 'react-relay'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {Snackbar} from 'material-ui'
import Theme from '~/theme'
import Header from './Header'
import {ContactInfo, Content, StretchView} from '@/components'
import {theme, AutoReload} from '@/services'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.theme = getMuiTheme(Theme)
    this.refreshWindow = ::this.refreshWindow
    this.onRequestClose = ::this.onRequestClose
  }

  static propTypes = {
    children: React.PropTypes.node,
    location: React.PropTypes.object,
    user: React.PropTypes.object,
    updateAvailable: React.PropTypes.bool
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
    theme: React.PropTypes.object,
    user: React.PropTypes.object
  }

  getChildContext() {
    return {
      theme,
      muiTheme: this.theme,
      user: this.props.user || {}
    }
  }

  refreshWindow() {
    this.setState({updateSnackbar: false})
    window.location.reload()
  }

  onRequestClose(reason) {
    if (reason === 'timeout') {
      this.setState({updateSnackbar: false})
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.theme}>
        <StretchView>
          <Header location={this.props.location} user={this.props.user}/>
          {this.props.children}
          <div style={{flex: 2}}></div>
          <Content>
            <ContactInfo />
          </Content>
          <Snackbar
            open={this.props.updateAvailable}
            action={<span style={{color: '#6086AC'}}>Oppdater</span>}
            message="Ny versjon"
            onActionTouchTap={this.refreshWindow}
            onRequestClose={this.onRequestClose}/>
        </StretchView>
      </MuiThemeProvider>
    )
  }
}

export default Relay.createContainer(AutoReload(App, '/'), {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id, name
      }
    `
  }
})
