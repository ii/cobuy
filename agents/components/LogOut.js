import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import { connect as connectFela } from 'react-fela'
import { pipe } from 'ramda'

import styles from '../styles/LogOut'

function LogOut (props) {
  const { styles, actions } = props
  return (
    <FlatButton
      className={styles.container}
      backgroundColor='#ddd'
      onClick={actions.authentication.logOut}
    >
      Log Out
    </FlatButton>
  )
}

export default pipe(
  connectFela(styles)
)(LogOut)
