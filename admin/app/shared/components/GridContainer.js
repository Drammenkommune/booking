import React from 'react'
import {StyleSheet, css} from 'aphrodite'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 1959,
    margin: 'auto',
    '@media (min-width: 760px)': {
      justifyContent: 'space-between',
    },
    '@media (min-width: 990px)': {
      justifyContent: 'center'
    },
  },
  padding: {
    padding: 16,
    '@media (min-width: 760px)': {
      padding: 20
    }
  },
  centeredContainer: {
    '@media (min-width: 760px)': {
      justifyContent: 'center'
    }
  },
  child: {
    maxWidth: 480,
    width: '100%',
    flex: '0 1 100%',
    display: 'flex',
    alignItems: 'stretch',
    '@media (min-width: 760px)': {
      ':not(:only-child)': {
        width: 'calc(50% - 10px)',
        flex: '0 1 calc(50% - 10px)',
      },
    },
    '@media (min-width: 990px)': {
      ':nth-child(odd)': {
        paddingRight: 10
      },
      ':nth-child(even)': {
        paddingLeft: 10
      },
      ':only-child': {
        paddingRight: 0
      },
    },
    '@media (min-width: 1100px)': {
      ':nth-child(odd)': {
        paddingRight: 20
      },
      ':nth-child(even)': {
        paddingLeft: 20
      },
      ':only-child': {
        paddingRight: 0
      },
    },
    '@media (min-width: 1480px)': {
      maxWidth: 640
    }
  },
  dummyChild: {
    opacity: 0
  },
  stretch: {
    flex: 1,
    width: '100%'
  }
})

function renderChildren(children) {
  const rendered = children.map((child, index) => child
    ? (
      <div className={css(styles.child)} key={`child${index}`}>
        {React.cloneElement(child, {className: css(styles.stretch)})}
      </div>
     )
    : null
  ).filter(child => child !== null)

  // If the number of children is odd,
  // we insert a dummychild to balance the view
  if (rendered.length % 2 === 1) {
    rendered.push((
      <div className={css(styles.child, styles.dummyChild)} key="dummychild"></div>
    ))
  }
  return rendered
}

// This component accepts multiple children
// and takes care of responsive styling for them
const GridContainer = ({children, padding = true}) => {
  const validChildren = children.filter ? children.filter(child => child !== null) : [children]
  const usableChildren = validChildren.length === 1 ? validChildren[0] : validChildren
  const onlyChild = React.isValidElement(usableChildren)

  return (
    <div className={css(
      styles.container,
      padding ? styles.padding : null,
      onlyChild ? styles.centeredContainer : null
    )}>
      {onlyChild
        ? (
          <div className={css(styles.child)}>
            {React.cloneElement(usableChildren, {className: css(styles.stretch)})}
          </div>
        )
        : renderChildren(usableChildren)
      }
    </div>
  )
}

GridContainer.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.node
  ]),
  padding: React.PropTypes.bool
}

export default GridContainer
