import React from 'react'
import {CircularProgress} from 'material-ui'

const Loading = () => {
  const style = {
    textAlign: 'center',
    marginTop: 20
  }

  return (
    <div style={style}>
      <CircularProgress size={1}/>
    </div>
  )
}

const loadingHelper = ({props, element}) => {
  return props ? React.cloneElement(element, props) : <Loading/>
}

loadingHelper.propTypes = {
  props: React.PropTypes.object,
  element: React.PropTypes.node
}

export default loadingHelper
