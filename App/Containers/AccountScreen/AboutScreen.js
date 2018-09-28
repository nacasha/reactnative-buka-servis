import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/AboutScreenStyle'
import { Images } from '../../Themes';

class AboutScreen extends Component {
  static navigationOptions = {
    title: 'About'
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.logoContainer}>
            <Image source={Images.gunadarma} style={styles.logo} />
          </View>
          <Text style={styles.title}>Buka Servis</Text>
          <View style={styles.paragraph}>
            <Text>
              Aplikasi ini dikembangkan guna memenuhi persyaratan kelulusan sebagai Penulisan Ilmiah. Aplikasi ini bertujuan untuk membantu orang dalam mencari tempat - tempat servis yang tersedia di sekitar pengguna.
            </Text>
            <Text>
              Diharapkan aplikasi dapat berguna dan bermanfaat bagi orang banyak.
            </Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Izal Fathoni</Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutScreen)
