import React from 'react'
import ReactDOM from 'react-dom'
import {css, StyleSheet} from 'aphrodite'
import {FlatButton, Menu, MenuItem, Popover} from 'material-ui'
import {PopoverAnimationVertical} from 'material-ui/Popover'

import {BurgerIcon} from '@/icons'

const styles = StyleSheet.create({
  menuText: {
    color: 'white',
    marginRight: 10,
    '@media (max-width: 550px)': {
      display: 'none'
    }
  }
})

class AppMenu extends React.Component {

  state = {
    open: false,
    anchor: null
  }

  constructor(props) {
    super(props)
    this.handleOnOpen = ::this.handleOnOpen
    this.handleOnRequestClose = ::this.handleOnRequestClose
    this.unFocusButton = ::this.unFocusButton
  }

  handleOnOpen(event) {
    event.preventDefault()
    this.setState({open: true})
  }

  handleOnRequestClose(ev, isKeyboardFocused, callback) {
    if (ev) {
      ev.preventDefault()
      ev.stopPropagation()
    }
    const FOCUS_TIMEOUT = 500
    this.setState({open: false}, () => {
      const menuButton = this.refs.menuButton
      const menuButtonDOM = ReactDOM.findDOMNode(menuButton)
      setTimeout(() => {
        menuButtonDOM.focus()
        menuButton.handleKeyboardFocus(ev, isKeyboardFocused)
        if (callback) {
          return callback()
        }
      }, FOCUS_TIMEOUT)
    })
  }

  unFocusButton(ev) {
    const menuButton = this.refs.menuButton
    menuButton.handleKeyboardFocus(ev, false)
  }

  render() {
    const {children, anchorId} = this.props
    const {open} = this.state

    return (
      <div style={{position: 'relative'}}>
        <FlatButton
          ref="menuButton"
          aria-label="Meny"
          style={{minWidth: 0, padding: '0 10px'}}
          onClick={this.handleOnOpen}
          onBlur={this.unFocusButton}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}>
            <span className={css(styles.menuText)}>Meny</span>
            <BurgerIcon style={{width: 24, height: 24}}/>
          </div>
        </FlatButton>
        <Popover
          open={open}
          anchorEl={document.getElementById(anchorId)}
          onRequestClose={() => this.handleOnRequestClose()}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          animation={PopoverAnimationVertical}>
          <Menu style={{padding: 0}} onEscKeyDown={(ev) => { this.handleOnRequestClose(ev, true) }}>
            {children
              .filter(child => !!child)
              .map((child, index) => {
                const originalTouchTap = child.props.onTouchTap
                return (
                  <MenuItem
                    key={index}
                    {...child.props}
                    onKeyPress={(ev) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        this.handleOnRequestClose(ev, true, () => originalTouchTap(ev))
                      }
                    }}
                    onTouchTap={(ev) => {
                      this.handleOnRequestClose(ev, false, () => originalTouchTap(ev))
                    }}
                  />
                )
              })}
          </Menu>
        </Popover>
      </div>
    )
  }
}

AppMenu.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.node
  ]),
  anchorId: React.PropTypes.string.isRequired
}

export default AppMenu
