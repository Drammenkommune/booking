import React from 'react'
import Checkbox from 'material-ui/Checkbox'

class CheckboxWithLink extends React.Component {
  render() {
    return (
      <label style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox
          required={this.props.required}
          onCheck={this.props.onCheck}
          style={{ width: 'initial' }}
        />
        {this.props.label}
      </label>
    )
  }
}

CheckboxWithLink.propTypes = {
  name: React.PropTypes.string,
  label: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.array,
    React.PropTypes.string
  ]),
  onCheck: React.PropTypes.func,
  required: React.PropTypes.bool
}

export default CheckboxWithLink
