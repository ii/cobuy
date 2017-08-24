import h from 'react-hyperscript'
import { createStructuredSelector } from 'reselect'
import { pipe, values, map, merge, propOr, length, gte, __ } from 'ramda'
import { withState, compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { reduxForm as connectForm, Field, FieldArray } from 'redux-form'
import { SelectField, TextField, Toggle } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/ResourceTypeEditor'

const ResourceTypeEditor = compose(
  connectFela(styles)
)(props => {
  const { resourceType = {} } = props
  const { id = 'tmp' } = resourceType
  const nextProps = merge(props, {
    form: `resourceType-${id}`,
    initialValues: resourceType
  })
  return h(ResourceTypeForm, nextProps)
})

export default ResourceTypeEditor

const ResourceTypeForm = compose(
  connectForm({}),
)(props => {
  const { styles, handleSubmit } = props

  return h('form', {
    className: styles.container,
    onSubmit: handleSubmit
  }, [
    h(Field, {
      name: 'name',
      floatingLabelText: (
        h(FormattedMessage, {
          id: 'resources.resourceTypeName',
          className: styles.labelText
        })
      ),
      component: TextField
    }),
    h(ResourceTypeContains, props),
    h(RaisedButton, {
      type: 'submit',
      className: styles.submitButton
    }, [
      h(FormattedMessage, {
        id: 'resources.saveResourceType',
        className: styles.buttonText
      })
    ])
  ])
})

const ResourceTypeContains = compose(
  // an atom is not reducible
  // a tree is reducible (is composed of atoms)
  withState('isReducible', 'setReducible', pipe(
    propOr({}, 'initialValues'),
    propOr([], 'items'),
    length,
    gte(__, 1)
  ))
)(props => {
  const { styles, setReducible, isReducible, resourceTypes } = props

  return h('div', {
    className: styles.contains
  }, [
    h('div', {
      className: styles.switchContainer
    }, [
      h(FormattedMessage, {
        id: 'resources.isResourceTypeReducible',
        className: styles.paragraphText
      }),
      h(RadioButtonGroup, {
        name: 'isReducible',
        onChange: (ev, value) => setReducible(value),
        labelPosition: 'left',
        defaultSelected: false,
        value: isReducible
      }, [
        h(RadioButton, {
          value: false,
          label: (
            h(FormattedMessage, {
              id: 'resources.resourceTypeIsNotReducible',
              className: styles.labelText
            })
          )
        }),
        h(RadioButton, {
          value: true,
          label: (
            h(FormattedMessage, {
              id: 'resources.resourceTypeIsReducible',
              className: styles.labelText
            })
          ),
        })
      ])
    ]),
    isReducible && (
      h(FieldArray, {
        name: 'items',
        component: ResourceTypeItemList,
        styles,
        resourceTypes
      })
    )
  ])
})

const ResourceTypeItemList = (props) => {
  const { styles, fields, resourceTypes } = props

  return h('div', {
    className: styles.itemListContainer
  }, [
    fields.map((field, index) => (
      h(ResourceTypeItem, {
        key: index,
        styles,
        field,
        resourceTypes,
        removeField: () => fields.remove(index)
      })
    )),
    h('div', {
      className: styles.addItemButtonContainer,
    }, [
      h(RaisedButton, {
        className: styles.button,
        type: 'button',
        onClick: () => fields.push({})
      }, [
        h(FormattedMessage, {
          id: 'resources.addResourceTypeItem',
          className: styles.buttonText
        })
      ])
    ])
  ])
}

function ResourceTypeItem (props) {
  const { styles, field, removeField } = props

  return h('div', {
    className: styles.itemContainer
  }, [
    h(Field, {
      name: `${field}.quantity.value`,
      component: TextField,
      floatingLabelText: (
        h(FormattedMessage, {
          id: 'supply.quantity',
          className: styles.labelText
        })
      )
    }),
    h(Field, {
      name: `${field}.quantity.unit`,
      component: SelectField,
      floatingLabelText: (
        h(FormattedMessage, {
          id: 'supply.unit',
          className: styles.labelText
        })
      )
    }, [
      h(MenuItem, {
        value: 'kg',
        primaryText: (
          h(FormattedMessage, {
            id: 'unit.kg',
            className: styles.labelText
          })
        )
      }),
      h(MenuItem, {
        value: 'litres',
        primaryText: (
          h(FormattedMessage, {
            id: 'unit.litres',
            className: styles.labelText
          })
        )
      }),
      h(MenuItem, {
        value: 'each',
        primaryText: (
          h(FormattedMessage, {
            id: 'unit.each',
            className: styles.labelText
          })
        )
      })
    ]),
    h(ResourceTypeItemSelectField, props),
    h('div', {
      className: styles.removeItemButtonContainer,
    }, [
      h(RaisedButton, {
        className: styles.button,
        type: 'button',
        onClick: () => removeItem() 
      }, [
        h(FormattedMessage, {
          id: 'resources.removeResourceTypeItem',
          className: styles.buttonText
        })
      ])
    ])
  ])
}

const ResourceTypeItemSelectField = props => {
  const { field, styles, resourceTypes } = props

  return (
    h(Field, {
      name: `${field}.resourceTypeId`,
      component: SelectField,
      floatingLabelText: (
        h(FormattedMessage, {
          id: 'resource.resourceType',
          className: styles.labelText
        })
      )
    }, [
      renderResourceTypeMenuItems(resourceTypes)
    ])
  )
}

const renderResourceTypeMenuItems = pipe(
  values,
  map(({ id, name }) => (
    h(MenuItem, {
      key: id,
      value: id,
      primaryText: name
    })
  ))
)
