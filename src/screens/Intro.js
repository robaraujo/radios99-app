import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Image, Text } from 'react-native';
import AppIntro from 'react-native-app-intro';
import { start } from '../store/actions/radio';

class Intro extends Component {

  componentWillMount() {
    if (!this.props.radio.firstTime) {
      this.close()
    }
    this.props.onStart();
  }
  close = () => {
    const hasRadios = this.props.radio.list.length;
    this.props.navigation.navigate(hasRadios ? 'Radio' : 'Playlist');
  }

  render() {

    return (
      <AppIntro
        skipBtnLabel="Pular"
        doneBtnLabel="Pronto"
        onSkipBtnClick={this.close}
        onDoneBtnClick={this.close}
        customStyles={{ btnContainer: { flex: 1 } }}>
        <View style={[styles.slide, { backgroundColor: '#1d7dd3' }]}>
        <View style={[styles.info, {flex: 2}]}>
            <View level={25}>
              <Text>
                <Text style={styles.titleHeader}>Bem-vindo ao</Text>
                <Text style={[styles.titleHeader, { fontWeight: '500' }]}> 99radios</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.header]}>
            <View level={-30}>
              <Image style={styles.imgLogo} source={require('../../assets/logo.png')} />
            </View>
          </View>
          <View style={[styles.info, {flex: 2}]}>
            <View level={25}>
              <Text style={styles.description}>
                Único aplicativo de rádios 100% gratuito, onde qualquer um pode cadastrar sua rádio rápidamente.
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#fa931d' }]}>
          <View style={[styles.header]}>
            <View style={styles.imgView}>
              <Image style={styles.imgListenBroadcaster} source={require('../../assets/intro/1/listen-user.png')} />
            </View>
            <View style={styles.imgView} level={-30}>
              <Image style={styles.img11} source={require('../../assets/intro/1/clave.png')} />
            </View>
            <View style={styles.imgView} level={30}>
              <Image style={styles.img12} source={require('../../assets/intro/1/claves.png')} />
            </View>
            <View style={styles.imgView} level={20}>
              <Image style={styles.img13} source={require('../../assets/intro/1/bluetooth.png')} />
            </View>
          </View>
          <View style={styles.info}>
            <View level={15}>
              <Text style={styles.title}>Ouvinte?</Text>
            </View>
            <View level={25}>
              <Text style={styles.description}>
                Busque suas rádios preferidas, organize-as e crie sua própria playlist!
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#a4b602' }]}>
          <View style={[styles.header]}>
            <View style={styles.imgView}>
              <Image style={styles.imgListenBroadcaster} source={require('../../assets/intro/2/broadcaster.png')} />
            </View>
            <View style={styles.imgView} level={20}>
              <Image style={styles.img21} source={require('../../assets/intro/2/claves.png')} />
            </View>
            <View style={styles.imgView} level={-20}>
              <Image style={styles.img22} source={require('../../assets/intro/2/microfone.png')} />
            </View>
            <View style={styles.imgView} level={5}>
              <Image style={styles.img23} source={require('../../assets/intro/2/radio.png')} />
            </View>
          </View>
          <View style={styles.info}>
            <View level={15}>
              <Text style={styles.title}>Possui uma Rádio?</Text>
            </View>
            <View level={25}>
              <Text style={styles.description}>
                Cadastre sua rádio em segundos e disponibilize para o mundo.
              </Text>
            </View>
          </View>
        </View>
      </AppIntro>
    );
  }
}

const imgSize = {
  width: 210,
  height: 210,
};
const imgSizeAbs = {
  ...imgSize,
  position: 'absolute'
};
const styles = StyleSheet.create({
  header: {
    flex: 0.5,
    width: '100%',
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    flex: 0.5,
    alignItems: 'center',
    padding: 30,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  imgView: {
    ...imgSizeAbs,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0
  },
  imgLogo: {
    width: 150,
    resizeMode: 'contain'
  },
  imgListenBroadcaster: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
    marginTop: 30
  },
  img11: {
    marginTop: -160,
    marginLeft: -175,
    width: 100,
    height: 120,
    resizeMode: 'contain'
  },
  img12: {
    marginTop: -60,
    marginLeft: 195,
    width: 50,
    height: 70,
    resizeMode: 'contain'
  },
  img13: {
    marginTop: 100,
    marginLeft: 185,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  img21: {
    marginTop: 0,
    marginLeft: 185,
    width: 50,
    height: 70,
    resizeMode: 'contain',
  },
  img22: {
    marginTop: -40,
    marginLeft: -145,
    width: 30,
    height: 150,
    resizeMode: 'contain',
  },
  img23: {
    marginTop: 140,
    marginLeft: 165,
    width: 100,
    height: 80,
    resizeMode: 'contain',
  },
  titleHeader: {
    color: '#fff',
    fontSize: 25,
    fontWeight: "200"
  },
  title: {
    color: '#fff',
    fontSize: 30,
    paddingBottom: 20,
  },
  description: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: "300"
  },
});


const mapStateToProps = state => {
  return {
    user: state.user,
    radio: state.radio
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onStart: () => dispatch(start())
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(Intro);