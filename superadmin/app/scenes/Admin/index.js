import React from 'react'

class Admin extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default Admin
