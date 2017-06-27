import React from 'react'
import createFocusTrap from 'focus-trap'

const style = {
  position: 'fixed',
  top: 0, bottom: 0,
  left: 0, right: 0,
  zIndex: 1101,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  height: '100%'
}

class Overlay extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      focusTrap: null
    }
    this.handleClick = ::this.handleClick
    this.handleEscClose = ::this.handleEscClose
  }

  componentWillMount() {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', this.handleEscClose)
  }

  componentWillUnmount() {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', this.handleEscClose)
    this.state.focusTrap.deactivate({returnFocus: false})
  }

  componentDidMount() {
    this.activateFocusTrap()
  }

  activateFocusTrap() {
    const FOCUS_TIMEOUT = 500
    const focusTrap = createFocusTrap(document.getElementById('clickable-overlay'))
    setTimeout(_ => {
      try {
        focusTrap.activate()
        this.setState({focusTrap})
      } catch (e) {
        this.activateFocusTrap()
      }
    }, FOCUS_TIMEOUT)
  }

  handleClick(e) {
    e.preventDefault()
    e.stopPropagation()
    if (e.target === document.getElementById('clickable-overlay')) {
      this.state.focusTrap.deactivate({returnFocus: true})
      this.props.onHandleClick(e)
    }
  }

  handleEscClose(e) {
    if (e.key === 'Escape') {
      this.state.focusTrap.deactivate({returnFocus: true})
      this.props.onHandleClick(e)
    }
  }

  render() {
    return (
      <div
        id="clickable-overlay"
        role="dialog"
        aria-labelledby="overlay-title"
        style={{...style, ...this.props.style}}
        onTouchTap={this.handleClick}>
        {this.props.children}
      </div>
    )
  }
}

Overlay.propTypes = {
  children: React.PropTypes.node,
  onHandleClick: React.PropTypes.func,
  style: React.PropTypes.object
}

export default Overlay
