import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {Snackbar} from 'material-ui'
import Theme from '~/theme'
import {Content, ContactInfo, StretchView} from '@/components'
import {AutoReload, theme} from '@/services'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.theme = getMuiTheme(Theme)
    this.refreshWindow = ::this.refreshWindow
    this.onRequestClose = ::this.onRequestClose
  }

  static propTypes = {
    children: React.PropTypes.node,
    updateAvailable: React.PropTypes.bool
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
    theme: React.PropTypes.object,
  }

  getChildContext() {
    return {
      theme,
      muiTheme: this.theme
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

export default AutoReload(App, '/admin/')
