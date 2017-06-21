import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-fela'
import AvatarEditorCanvas from 'react-avatar-editor'
import Slider from 'material-ui/Slider'

import styles from '../styles/AvatarField'

import Button from './Button'

// TODO move somewhere better
class FileInput extends React.Component {
  render () {
    return (
      <input
        type='file'
        accept='image/*'
        onChange={(ev) => this.handleFile(ev)}
      />
    )
  }

  handleFile (ev) {
    var reader = new FileReader()
    var file = ev.target.files[0]

    if (!file) return

    reader.onload = (img) => {
      this.props.onChange(img.target.result)
    }
    reader.readAsDataURL(file)
  }
}

class AvatarEditor extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      image: props.image,
      scale: 1
    }
  }

  componentWillReceiveProps (nextProps) {
    const { image: nextImage } = nextProps
    const { image: prevImage } = this.state
    if (nextImage !== prevImage) {
      this.setState({ image: nextImage })
    }
  }

  handleFileChange (image) {
    this.setState({ image })
  }

  handleScaleChange (scale) {
    this.setState({ scale })
  }

  handleSaveImage () {
    const { onChange } = this.props
    const nextImage = this.editor.getImage().toDataURL()
    onChange(nextImage)
  }

  setEditorRef = (editor) => {
    this.editor = editor
  }

  render () {
    const canvasStyle = styles.canvas(this.props) // we can't use special fela magic here
    const { editor } = this.props
    const { image, scale } = this.state

    return (
      <div>
        <AvatarEditorCanvas
          ref={this.setEditorRef}
          style={canvasStyle}
          {...editor}
          image={image}
          scale={scale}
          crossOrigin={'anonymous'}
        />
        <Slider
          name='zoom'
          value={scale}
          defaultValue={scale}
          min={0}
          max={2}
          onChange={(evt, newVal) => this.handleScaleChange(newVal)}
        />
        <FileInput
          onChange={dataUrl => this.handleFileChange(dataUrl)}
        />
        <Button
          onClick={() => { this.handleSaveImage() }}
          type='button'
        >
          Save
        </ Button>
      </div>
    )
  }
}

// http://redux-form.com/6.8.0/examples/fieldLevelValidation/
function AvatarField (props) {
  const { input, label, type, meta, editor } = props
  const { name, value, onChange } = input
  const { touched, error, warning } = meta

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {label}
      </label>
      <AvatarEditor
        editor={editor}
        image={value}
        onChange={onChange}
      />
      {
        touched
        ? error
          ? <span className={styles.error}>{error}</span>
          : warning
            ? <span className={styles.warning}>{warning}</span>
            : null
        : null
      }
    </div>
  )
}

export default connect(styles)(AvatarField)
