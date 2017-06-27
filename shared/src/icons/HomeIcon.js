import React from 'react'

const HomeIcon = (props) => {
  return (
    <svg
      viewBox="0 0 24 21" version="1.1" xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-211.000000, -97.000000)" fill={props.color || '#000000'}>
          <g transform="translate(200.000000, 80.000000)">
            <g transform="translate(11.000000, 15.000000)">
              <polygon points="9.6 22.4 9.6 15.2 14.4 15.2 14.4 22.4 20.4 22.4 20.4 12.8 24 12.8 12 2 0 12.8 3.6 12.8 3.6 22.4"></polygon>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

HomeIcon.propTypes = {
  color: React.PropTypes.string
}

export default HomeIcon
