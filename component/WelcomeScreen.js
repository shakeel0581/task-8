/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StatusBar, Image, StyleSheet} from 'react-native';
import {Container, Body, Title, Button, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";
import Loader from "./Loader";

const App = () => {
  let navigation = useNavigation();
  const [IsLogin, setIsLogin] = React.useState(false);
  const [loader, setloader] = React.useState(true);

  React.useEffect(() => {
    inisilization();
    navigation.addListener('focus', () => {
      inisilization();
    });
  }, []);

  const inisilization = () => {
    AsyncStorage.getItem('Login_row').
      then(val => {
        if (val == null) {
          setIsLogin(false);
        } else {
          setIsLogin(true);
        }
        setloader(false);
      });
  }

  return (
    <Container
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: '100%',
      }}>
      <StatusBar barStyle="dark-content" />
      <View>
        <Image source={require('./assets/1.png')} />
      </View>
      {loader ? 
      <Loader loading={loader} />:
      <>
        {!IsLogin ?
        <>
          <Button
          style={[styles.btns, {marginTop: '5%'}]}
          onPressIn={() => navigation.navigate('LoginScreen')}
          rounded>
          <Text style={styles.btnTxt}>Login</Text>
        </Button>
        <Button
          danger={true}
          style={styles.btns}
          onPressIn={() => navigation.navigate('Register')}
          rounded>
          <Text style={styles.btnTxt}>Become a member</Text>
        </Button>
        </>:
        <>
          <Button
            warning={true}
            style={styles.btns}
            onPressIn={() => navigation.navigate('General')}
            rounded>
            <Text style={styles.btnTxt}>general person</Text>
          </Button>
        </>
        }
      </>}
      
      <Button
        success={true}
        style={styles.btns}
        onPressIn={() => navigation.navigate('admin')}
        rounded>
        <Text style={styles.btnTxt}>Admin Login</Text>
      </Button>
      <Title style={{fontSize: 20, color: 'lightgray', marginTop: '5%'}}>
        From{' '}
      </Title>
      <Title
        style={{fontSize: 25, color: 'lightgray', textTransform: 'uppercase'}}>
        editor systima{' '}
      </Title>
    </Container>
  );
};

const styles = StyleSheet.create({
  btns: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: '4%',
  },
  btnTxt:{
    width: '100%', textAlign: 'center'
  }
});

export default App;
