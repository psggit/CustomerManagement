import React from "react"
import PropTypes from "prop-types"

function Label (props) {
  return (
    <div>
      <p className="label">{props.children}</p>
    </div>
  )
}

Label.propTypes = {
  children: PropTypes.string
}

export default Label