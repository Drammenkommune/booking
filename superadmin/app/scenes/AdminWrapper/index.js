import React from 'react'
import Relay from 'react-relay'
import {Header} from '~/components'

class AdminWrapper extends React.Component {
  getChildContext() {
    return {
      admin: this.props.admin
    }
  }

  render() {
    const {admin, children} = this.props
    return (
      <div>
        <Header admin={admin} location={this.props.location}/>
        {children}
      </div>
    )
  }
}

AdminWrapper.propTypes = {
  admin: React.PropTypes.object,
  location: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.node
  ])
}

AdminWrapper.childContextTypes = {
  admin: React.PropTypes.object,
}

export default Relay.createContainer(AdminWrapper, {
  fragments: {
    admin: () => Relay.QL`
      fragment on Admin {
        id, email
      }
    `
  }
})
