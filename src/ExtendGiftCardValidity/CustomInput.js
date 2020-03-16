import React from "react"

class CustomInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props && props.defaultValue ? props.defaultValue : "",
      errorStatus: false,
      errorMessage: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.validation = this.validation.bind(this);
  }

  validation(e) {
    let errorMessage = "", errorStatus = false;

    if (this.props.isRequired && e.target.value === "") {
      errorStatus = true;
      errorMessage = this.props.emptyMessage;
    } else if (e.target.validity.patternMismatch) {
      errorStatus = true;
      errorMessage = this.props.errorMessage;
    }

    this.setState({
      errorMessage,
      errorStatus,
      value: e.target.value
    });
  }

  handleChange(e) {
    this.validation(e);
  }
  render() {
    return (
      <div>
        <label className="label">{this.props.label}</label>
        <input
          type="text"
          className="form-text-field"
          value={this.state.value}
          ref={this.props.name}
          required={this.props.isRequired}
          maxLength={this.props.maxLength}
          pattern={this.props.pattern}
          onChange={this.handleChange} />

        {this.state.errorStatus && (
          <div className="error-message">* {this.state.errorMessage}</div>
        )}

      </div>
    )
  }
}

export default CustomInput