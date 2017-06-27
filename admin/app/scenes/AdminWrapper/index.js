import React from 'react'
import Relay from 'react-relay'
import {Header} from '~/components'

class AdminWrapper extends React.Component {
  getChildContext() {
    return {
      viewer: this.props.viewer
    }
  }

  render() {
    const {viewer, children} = this.props
    return (
      <div>
        <Header viewer={viewer} location={this.props.location}/>
        {children}
      </div>
    )
  }
}

AdminWrapper.propTypes = {
  viewer: React.PropTypes.object,
  location: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.node
  ])
}

AdminWrapper.childContextTypes = {
  viewer: React.PropTypes.object,
}

export default Relay.createContainer(AdminWrapper, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id, name
      }
    `
  }
})
