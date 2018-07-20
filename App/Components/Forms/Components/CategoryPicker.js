import React from 'react';
import { Label } from 'native-base'
import { TouchableOpacity, View, Text } from 'react-native'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import styles from './FormStyles'
import ModalActions from '../../../Redux/ModalRedux'
import CategoryTab from '../../../Containers/HomeScreen/CategoryTab'
import R from 'ramda'
import CATEGORIES from '../../../Fixtures/categories.json'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { change } from 'redux-form'

class CategoryPicker extends React.PureComponent {
  renderModal() {
    const { input, meta: { dispatch } } = this.props

    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={this.props.modalState}
        cacheEnabled={true}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        onBackButtonPress={this.props.closeModal}
      >
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
          <CategoryTab
            onChange={(category, specialist) => {
              dispatch(change('service', 'category', category))
              input.onChange(specialist)
              this.props.closeModal()
            }}
          />
        </View>
      </Modal>
    )
  }

  render() {
    const { input, label, type, options, meta: { touched, error, warning, dispatch } } = this.props

    const filter = R.propEq('key', input.value)
    const hasSpecialist = R.any(filter)
    const category = R.find(R.compose(hasSpecialist, R.prop('data')))(CATEGORIES)
    const specialist = R.find(filter)(R.propOr({}, 'data', category))

    const { icon = 'help', title = 'Select' } = specialist || {}

    return (
      <View style={styles.item}>
        <Label style={styles.label}>{label}</Label>

        <TouchableOpacity onPress={this.props.openModal}>
          <View style={styles.categoryPicker}>
            <Icon name={icon} size={20} />
            <Text style={styles.categoryText}>
              {title}
            </Text>
          </View>
        </TouchableOpacity>

        {this.renderModal()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modalState: state.modal.categoryPicker,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: () => dispatch(ModalActions.openModal('categoryPicker')),
    closeModal: () => dispatch(ModalActions.closeModal('categoryPicker')),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPicker)
