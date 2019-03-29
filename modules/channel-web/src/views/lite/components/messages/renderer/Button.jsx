import React, { Component } from 'react'
import FileInput from './'

/**
 * A simple button, with a possibility to be used as a file upload button
 *
 * @param {object} buttons The list of buttons to display (object with a label and a payload)
 * @param {function} onButtonClicked Called when the button is clicked with the label and the payload
 * @param {function} onFileUpload This is called when a file is uploaded
 */
export class Button extends Component {
  constructor(props) {
    super(props)
  }

  handleButtonClick = e => {
    this.props.onButtonClick && this.props.onButtonClick(this.props.label, this.props.payload)
  }

  handleFileUpload = event => {
    if (!event.target.files) {
      return
    }

    this.props.onFileUpload && this.props.onFileUpload(this.props.label, this.props.payload, event.target.files[0])
  }

  renderFileUpload(accept) {
    return (
      <button className={'bpw-button'}>
        <span>{this.props.label}</span>
        <FileInput
          name="uploadField"
          accept={accept}
          className={'bpw-file-message'}
          placeholder={this.props.label}
          onChange={this.handleFileUpload}
        />
      </button>
    )
  }

  render() {
    if (this.props.payload === 'BOTPRESS.IMAGE_UPLOAD') {
      return this.renderFileUpload('image/*')
    }

    if (this.props.payload === 'BOTPRESS.FILE_UPLOAD') {
      return this.renderFileUpload('*/*')
    }

    return (
      <button className={'bpw-button'} onClick={this.handleButtonClick}>
        {this.props.label}
      </button>
    )
  }
}