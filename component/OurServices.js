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
} from 'native-base';
import {TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";
import Server from "./Server";
import Loader from "./Loader";

const OurServices = () => {
  let navigation = useNavigation();
  const [eventsData, setEventsData] = React.useState([]);
  const [loader, setloader] = React.useState(true);

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
      </Header>
      <Loader loading={loader} />
        <FlatList
          style={{flex:1}}
            data={eventsData}
            renderItem={ ({item}) => 
                <View style={styles.container}>
                    <Text style={styles.title}> {item.services}</Text>
                    <Text style={styles.desc}> {item.form_object}</Text>
                    <Text style={styles.desc}> status '{item.status}'</Text>
                    <Text style={styles.date}> {item.note}</Text>
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
});

export default OurServices; 
