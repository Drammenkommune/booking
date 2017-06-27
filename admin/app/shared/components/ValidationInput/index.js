import React from 'react'
import {HOC} from 'formsy-react'
import {css, StyleSheet} from 'aphrodite'

import styles from './styles'

class ValidationInput extends React.Component {

  state = {
    customValidations: false
  }

  componentWillMount() {
    const {defaultValue, setValue} = this.props
    if (defaultValue) { setValue(defaultValue) }
    if (this.props.customValidations) {
      this.setState({customValidations: true})
    }
  }

  getValidationMessages() {
    const {customValidations, getValue} = this.props
    return Object.keys(customValidations).map(key => {
      if (!customValidations[key].evaluator(getValue())) {
        return customValidations[key].message
      } else {
        return null
      }
    })
  }

  render() {
    const {
      error, errorMessage, disabled, onChange,
      style, type, required, pattern,
      placeholder, multiLine, name, autoFocus
    } = this.props

    const errorText = error && errorMessage
      ? <span className={css(styles.errorText)}>{errorMessage}</span>
      : null

    const validationMessages = this.state.customValidations
      ? this.getValidationMessages()
      : null

    const errorBorder = error || (
      validationMessages && validationMessages.filter(msg => msg !== null).length !== 0
    )

    const config = {
      required, name, disabled, pattern,
      placeholder, type: type || 'text',
      autoFocus,
      className: css(
        styles.input,
        multiLine ? styles.textarea : null,
        style ? StyleSheet.create({style}).style : null,
        errorBorder ? styles.errorInput : null,
        disabled ? styles.disabled : null
      ),
      value: this.props.getValue() || '',
      onChange: onChange ? (e) => {
        this.props.setValue(e.target.value)
        onChange(e)
      }
      : (e) => this.props.setValue(e.target.value)
    }

    return (
      <div className={css(styles.container)}>
        {
          multiLine
            ? (<textarea {...config}></textarea>)
            : (<input {...config}/>)
        }
        {errorText}
        {validationMessages}
      </div>
    )
  }
}

ValidationInput.propTypes = {
  error: React.PropTypes.bool,
  errorMessage: React.PropTypes.string,
  errorSize: React.PropTypes.number,
  disabled: React.PropTypes.bool,
  style: React.PropTypes.object,
  type: React.PropTypes.string,
  name: React.PropTypes.string,
  required: React.PropTypes.bool,
  autoFocus: React.PropTypes.bool,
  getValue: React.PropTypes.func.isRequired,
  setValue: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func,
  defaultValue: React.PropTypes.any,
  placeholder: React.PropTypes.string,
  multiLine: React.PropTypes.bool,
  customValidations: React.PropTypes.object,
  pattern: React.PropTypes.string
}

export default HOC(ValidationInput)
