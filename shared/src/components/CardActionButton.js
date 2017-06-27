import React from 'react'
import {css, StyleSheet} from 'aphrodite'
import {FlatButton} from 'material-ui'

const styles = StyleSheet.create({
  label: {
    color: 'black',
    fontSize: 18,
    '@media (max-width: 550px)': {
      display: 'none'
    }
  }
})

const style = {
  marginRight: 0,
  marginBottom: 6,
  padding: '0 10px',
  minWidth: 0,
}

const CardActionButton = ({onTouchTap, href, label, labelPosition = 'before', icon, ...props}) => {
  const labelEl = (<span className={css(styles.label)}>{label}</span>)
  return (
    <FlatButton href={href} onTouchTap={onTouchTap} style={style} aria-label="Tilbake" {...props}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        {labelPosition === 'before' && labelEl}
        {icon && (
          <div style={{overflow: 'hidden', height: 24}}>
            {icon}
          </div>
        )}
        {labelPosition === 'after' && labelEl}
      </div>
    </FlatButton>
  )
}

CardActionButton.propTypes = {
  onTouchTap: React.PropTypes.func,
  href: React.PropTypes.string,
  label: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.node,
    React.PropTypes.array
  ]),
  labelPosition: React.PropTypes.oneOf(['before', 'after']),
  icon: React.PropTypes.node
}

export default CardActionButton
