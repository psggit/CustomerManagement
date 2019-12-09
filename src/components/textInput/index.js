import React, { useState, forwardRef, useImperativeHandle, useRef} from "react";
import "./text-input.scss";
import PropTypes from "prop-types"

const textInput = forwardRef((props, ref) => {

  const [value, setValue] = useState("")
  const [errorMsg, setErrorMessage] = useState(false)
  const [errorStatus, setErrorStatus] = useState()
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => inputRef.current);
  

  const validation = (e) => {
    let errorMsg = "", errorStatus = false;

    if (props.isRequired && e.target.value === "") {
      errorStatus = true;
      errorMsg = props.emptyMessage;
    } else if (e.target.validity.patternMismatch) {
      errorStatus = true;
      errorMsg = props.errorMessage;
    }

    setErrorMessage(errorMsg)
    setErrorStatus(errorStatus)
    setValue(e.target.value)
  }

  const handleChange = (e) => validation(e)

  return (
    <div id="textInput">
      <input
        type="text"
        value={value}
        ref={inputRef}
        name={props.name}
        pattern={props.pattern}
        maxLength={props.maxLength}
        required={props.isRequired}
        placeholder={props.placeholder}
        onChange={handleChange}
        style={{ width: props.width }}
        disabled={props.disabled}
      />
      {errorStatus && (
        <p className="error-message">* {errorMsg}</p>
      )}
    </div>
  )
})

textInput.displayName = "textInput"

textInput.propTypes = {
  isRequired: PropTypes.bool.isRequired,
  emptyMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired,
  maxLength: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  disabled: PropTypes.string
}

export default textInput
