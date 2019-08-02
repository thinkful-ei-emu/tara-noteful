import React from 'react'
import './CircleButton.css';
import PropTypes from 'prop-types';

export default function NavCircleButton(props) {
  const { tag, className, children, ...otherProps } = props

  NavCircleButton.propTypes = {
    tag: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
  }

  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

NavCircleButton.defaultProps ={
  tag: 'a',
}
