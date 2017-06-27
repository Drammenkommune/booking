import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import ListIcon from 'material-ui/svg-icons/action/view-list'
import GridIcon from 'material-ui/svg-icons/action/view-module'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  radio: {
    opacity: 0,
    width: 0,
    height: 0,
    margin: 0,
    padding: 0
  },
  label: {
    height: 38,
    width: 40,
    marginLeft: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  selected: {
    backgroundColor: 'white'
  },
  focused: {
    outline: 'rgb(59, 143, 252) auto 5px'
  },
  icon: {
    color: '#767676',
    height: 36,
    width: 36
  }
})

class ResultMode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'grid',
      focused: null
    }
    this.onHandleChange = ::this.onHandleChange
    this.onHandleFocus = ::this.onHandleFocus
  }

  componentWillUnmount() {
    this.props.onChangeMode('grid')
  }

  onHandleChange(event) {
    const mode = event.target.value
    this.setState({ mode })
    this.props.onChangeMode(mode)
  }

  onHandleFocus(focused) {
    this.setState({ focused })
  }

  render() {
    const { mode, focused } = this.state

    return (
      <div className={css(styles.container)}>
        <label
          aria-label="Listemodus"
          className={css(
            styles.label,
            mode === 'list' ? styles.selected : null,
            focused === 'list' ? styles.focused : null
          )}
        >
          <input
            type="radio"
            name="mode"
            value="list"
            checked={mode === 'list'}
            className={css(styles.radio)}
            onFocus={() => {
              this.onHandleFocus('list')
            }}
            onBlur={() => {
              this.onHandleFocus()
            }}
            onChange={this.onHandleChange}
          />
          <ListIcon className={css(styles.icon)} />
        </label>
        <label
          aria-label="Gridmodus"
          className={css(
            styles.label,
            mode === 'grid' ? styles.selected : null,
            focused === 'grid' ? styles.focused : null
          )}
        >
          <input
            type="radio"
            name="mode"
            value="grid"
            checked={mode === 'grid'}
            className={css(styles.radio)}
            onFocus={() => {
              this.onHandleFocus('grid')
            }}
            onBlur={() => {
              this.onHandleFocus()
            }}
            onChange={this.onHandleChange}
          />
          <GridIcon className={css(styles.icon)} />
        </label>
      </div>
    )
  }
}

ResultMode.propTypes = {
  onChangeMode: React.PropTypes.func.isRequired
}

export default ResultMode
