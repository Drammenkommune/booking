import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Theme from '~/theme'
import {Content, ContactInfo, StretchView} from '@/components'
import {theme} from '@/services'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.theme = getMuiTheme(Theme)
  }

  static propTypes = {
    children: React.PropTypes.node
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

  render() {
    return (
      <MuiThemeProvider muiTheme={this.theme}>
        <StretchView>
          {this.props.children}
          <div style={{flex: 2}}></div>
          <Content>
            <ContactInfo />
          </Content>
        </StretchView>
      </MuiThemeProvider>
    )
  }
}

export default App
