import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm } from 'redux-form'
import { flow } from 'lodash'
import { TextField } from 'redux-form-material-ui'

import styles from '../styles/Profile'

import Button from '../../app/components/Button'
import AvatarField from '../../app/components/AvatarField'

class Profile extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      isEditing: false
    }
  }

  toggleEdit () {
    this.setState({
      isEditing: this.state.isEditing ? false : true
    })
  }

  render () {
    const { isEditing } = this.state
    const { styles, agent, agent: { profile: { name, description } } } = this.props
    return (
      <form className={styles.container}>
        <Field
          name='avatar'
          component={AvatarField}
          isEditingProfile={isEditing}
          agent={agent}
        />
        <Field
          name='name'
          floatingLabelText='Name'
          component={TextField}
          value={name}
          disabled={!isEditing}
        />
        <Field
          name='description'
          floatingLabelText='Description'
          component={TextField}
          value={description}
          multiLine={true}
          rows={3}
          disabled={!isEditing}
        />
        <Button type='button' onClick={() => { this.toggleEdit() }}>
          {
            isEditing
            ? 'Save Profile'
            : 'Edit Profile'
          }
        </Button>
      </form>
    )
  }

}

Profile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
}

Profile.defaultProps = {
}

export default flow(
  connectFela(styles),
  connectForm({
    form: 'profile',
    initialValues: {
      avatar: 'http://dinosaur.is/images/mikey-small.jpg',
      name: 'classic nixon',
      description: "it's classic nixon"
    }
  })
)(Profile)
