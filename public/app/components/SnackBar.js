import React from 'react'
import Theme from '~/theme'
import {Snackbar} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiTheme = getMuiTheme(Theme)

export default class SnackBar extends React.Component {
  static propTypes = {
    message:          React.PropTypes.string.isRequired,
    dispose:          React.PropTypes.func.isRequired,
    autoHideDuration: React.PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.state = {
      open: true,
    }
  }

  closeSnackbar() {
    this.setState({open: false})
    this.props.dispose()
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Snackbar
          open={this.state.open}
          message={this.props.message}
          autoHideDuration={this.props.autoHideDuration}
          onRequestClose={::this.closeSnackbar}
        />
      </MuiThemeProvider>
    )
  }
}
