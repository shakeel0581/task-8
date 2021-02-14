import React, {useEffect} from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Icon,
  View,
  Item,
  Input,
  Button
} from 'native-base';
import {TouchableOpacity, FlatList, StyleSheet, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";
import Server from "./Server";
import Loader from "./Loader";

const OurServices = () => {
  let navigation = useNavigation();
  const [eventsData, setEventsData] = React.useState([]);
  const [loader, setloader] = React.useState(true);
  const [modal, setModal] = React.useState(false);
  const [service, setService] = React.useState('');
  const [modalDel, setModalDel] = React.useState(false);
  const [idDel, setIdDel] = React.useState('');

    useEffect(()=>{
        AsyncStorage.getItem('Login_row').
        then(val => {
            if (val == null) {
                navigation.navigate('LoginScreen');
            } else {
                const login_row = JSON.parse(val);
                // console.log(login_row.access_token);
                Server.get('api/service',{
                    headers:{
                        'Authorization': `Bearer ${login_row.access_token}`
                    }
                }).
                then(res => {
                    console.log(login_row.access_token);
                    setEventsData(res.data.services);
                    setloader(false);
                }).
                catch(err => {
                    alert(err);
                    setloader(false);
                });
            }
        })
    },[]);

    const addService = () => {
      setloader(true);
      setModal(false);
      setService('');
      AsyncStorage.getItem('Login_row').
        then(val => {
            if (val == null) {
                navigation.navigate('LoginScreen');
            } else {
              const login_row = JSON.parse(val);
              Server.post('api/service',{
                services:service,
                form_object:"{name: 'Amjad'}",
                attachments : null
              },
              {
                headers:{
                    'Authorization': `Bearer ${login_row.access_token}`
                }
              }).
              then(res => {
                Server.get('api/service',{
                  headers:{
                      'Authorization': `Bearer ${login_row.access_token}`
                  }
                }).
                then(res => {
                    console.log(login_row.access_token);
                    setEventsData(res.data.services);
                    setloader(false);
                }).
                catch(err => {
                    alert(err);
                    setloader(false);
                });
              }).
              catch(err => {
                  alert(err);
                  setloader(false);
              });
          }
        })
    }

    const deleteService = () => {
      setloader(true);
      setModalDel(false);
      
      AsyncStorage.getItem('Login_row').
        then(val => {
            if (val == null) {
                navigation.navigate('LoginScreen');
            } else {
              const login_row = JSON.parse(val);
              Server.post('api/service',{
                services:service,
                form_object:"{name: 'Amjad'}",
                attachments : null
              },
              {
                headers:{
                    'Authorization': `Bearer ${login_row.access_token}`
                }
              }).
              then(res => {
                setIdDel('');
                Server.get('api/service',{
                  headers:{
                      'Authorization': `Bearer ${login_row.access_token}`
                  }
                }).
                then(res => {
                    console.log(login_row.access_token);
                    setEventsData(res.data.services);
                    setloader(false);
                }).
                catch(err => {
                    alert(err);
                    setloader(false);
                });
              }).
              catch(err => {
                  alert(err);
                  setloader(false);
              });
          }
        })
    }

  return (
    <Container>
      <Header
        style={{
          textAlign: 'center',
          alignItems: 'center',
          backgroundColor: '#f2f2f2',
        }}>
        <Left>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon active name="arrowleft" type="AntDesign" />
          </TouchableOpacity>
        </Left>
        <Body>
          <Text>Our Services</Text>
        </Body>
        <Right>
          <TouchableOpacity onPress={() => setModal(true)}>
            <Icon active name="plus" type="AntDesign" />
          </TouchableOpacity>
        </Right>
      </Header>
      <Loader loading={loader} />
        <FlatList
          style={{flex:1}}
            data={eventsData}
            renderItem={ ({item}) => 
                <View style={styles.container}>
                    <View style={{width:'70%'}}>
                      <Text style={styles.title}> {item.services}</Text>
                      <Text style={styles.desc}> {item.form_object}</Text>
                      <Text style={styles.desc}> status '{item.status}'</Text>
                      <Text style={styles.date}> {item.note}</Text>
                    </View>
                    
                    <View style={{width:'30%',alignItems:'flex-end',alignSelf:'center'}}>
                      {/* <Icon onPress={()=>{setModalDel(true);setIdDel(item.id)}} style={{marginBottom:15,color:'red'}} active name="delete" type="AntDesign" /> */}
                      <Icon onPress={()=>{}} style={{color:'green'}} active name="edit" type="AntDesign" />
                    </View>
                </View>
            }
            keyExtractor={(item) => item.id.toString()}
          />
    
    </Container>    
  );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        paddingHorizontal:10,
        paddingVertical:10,
        flexDirection:'row',
    },
    title: {
        fontSize:16,
        fontWeight:'bold',
        color:'gray'
    },
    desc: {
        fontSize:14,
        // fontWeight:'bold',
        color:'gray'
    },
    date: {
        fontSize:12,
        // fontWeight:'bold',
        color:'gray'
    },
    btns: {
      width: '85%',
      marginLeft: 'auto',
      marginRight: 'auto',
      justifyContent: 'center',
      marginTop: '4%',
    },
    modalBody:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'rgba(0,0,0,0.5)',
      borderRadius:5,
      padding:10,
      alignItems:'center'
    },
    modalContainer:{
      height:200,
      width:250,
      backgroundColor:'#fff',
      borderRadius:15,
      justifyContent:'space-between',
      alignItems:'center',
      alignSelf:'center'
    },
});

export default OurServices; 
