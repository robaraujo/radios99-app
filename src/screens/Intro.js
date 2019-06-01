import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import AppIntro from 'react-native-app-intro';

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;

class Intro extends Component {
  doneBtnHandle = () => {
    this.props.navigation.navigate(this.props.radio.firstScreen);
  }

  render() {

    return (
      <AppIntro
        skipBtnLabel="Pular"
        doneBtnLabel="Pronto"
        onSkipBtnClick={this.doneBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        customStyles={{ btnContainer: { flex: 1 } }}>
        <View style={[styles.slide, { backgroundColor: '#406E9F' }]}>
          <View style={[styles.header, { width: windowsWidth }]}>
            <View style={styles.img00View} level={15}>
              <Image style={styles.img00} source={require('../../assets/intro/4/4.png')} />
            </View>
            <View style={styles.img01View}>
              <Image style={styles.img01} source={require('../../assets/intro/4/1.png')} />
            </View>
            <View style={styles.img02View} level={20}>
              <Image style={styles.img02} source={require('../../assets/intro/4/3.png')} />
            </View>
          </View>

          <View style={styles.info}>
            <View level={15}>
              <Text style={styles.title}>Quer ouvir?</Text>
            </View>
            <View level={25}>
              <Text style={styles.description}>
                Busque suas rádios preferidas, organize-as e crie sua própria playlist!
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#a4b602' }]}>
          <View style={[styles.header, { width: windowsWidth }]}>
            <View>
              <Image style={styles.img10} source={require('../../assets/intro/1/c1.png')} />
            </View>
            <View style={styles.img11View} level={20}>
              <Image style={styles.img11} source={require('../../assets/intro/1/c2.png')} />
            </View>
            <View style={styles.img12View} level={20}>
              <Image style={styles.img12} source={require('../../assets/intro/1/c5.png')} />
            </View>
            <View style={styles.img13View} level={5}>
              <Image style={styles.img13} source={require('../../assets/intro/1/c3.png')} />
            </View>
          </View>

          <View style={styles.info}>
            <View level={15}>
              <Text style={styles.title}>Quer ouvir?</Text>
            </View>
            <View level={25}>
              <Text style={styles.description}>
                Busque suas rádios preferidas, organize-as e crie sua própria playlist!
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#a4b602' }]}>
          <View style={[styles.header, { width: windowsWidth }]}>
            <View>
              <Image style={styles.img20} source={require('../../assets/intro/2/1.png')} />
            </View>
            <View style={styles.img21View} level={20}>
              <Image style={styles.img21} source={require('../../assets/intro/2/2.png')} />
            </View>
            <View style={styles.img22View} level={-20}>
              <Image style={styles.img22} source={require('../../assets/intro/2/3.png')} />
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


const styles = StyleSheet.create({
  header: {
    flex: 0.5,
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
    backgroundColor: '#9DD6EB',
    padding: 15,
  },
  img00View: {
    position: 'absolute',
    top: 25,
    left: -35,
  },
  img00: {
    width: 96 * 2.5,
    height: 69 * 2.5
  },
  img01: {
    width: 50 * 2.5,
    height: 63 * 2.5
  },
  img02View: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img02: {
    width: 46 * 2.5,
    height: 98 * 2.5 
  },
  img03View: {
    position: 'absolute',
    top: 65,
    left: 70,
  },
  img03: {
    width: 47 * 2.5,
    height: 43 * 2.5
  },
  img10: {
    width: 200, 
    height: 300,
    resizeMode: 'contain'
  },
  img11View: {
    position: 'absolute',
    top: 80,
    left: 30,
    width: windowsWidth,
    height: windowsHeight,
  },
  img11: {
    width: 46 * 2.5,
    height: 28 * 2.5
  },
  img12View: {
    position: 'absolute',
    top: 23,
    left: 25,
    width: windowsWidth,
    height: windowsHeight,
  },
  img12: {
    width: 109 * 2.5,
    height: 68 * 2.5
  },
  img13View: {
    position: 'absolute',
    top: 65,
    left: 35,
    width: windowsWidth,
    height: windowsHeight,
  },
  img13: {
    width: 23 * 2.5,
    height: 17 * 2.5
  },
  img20: {
    width: 75 * 2.5,
    height: 63 * 2.5
  },
  img21View: {
    position: 'absolute',
    top: 30,
    left: 30,
  },
  img21: {
    width: 101 * 2.5,
    height: 71 * 2.5
  },
  img22View: {
    position: 'absolute',
    top: 10,
    left: 40,
  },
  img22: {
    width: 85 * 2.5,
    height: 73 * 2.5
  },
  title: {
    color: '#fff',
    fontSize: 30,
    paddingBottom: 20,
  },
  description: {
    color: '#fff',
    fontSize: 20,
  },
});


const mapStateToProps = state => {
  return {
    user: state.user,
    radio: state.radio
  }
}


export default connect(mapStateToProps)(Intro);