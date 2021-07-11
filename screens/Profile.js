import React from 'react';
import { View, Text, Button, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native';

export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      dataSource: [],
      urName: '',
      urContact: '',
      urEmail: '',
    };
  }

  componentDidMount() {
    //Get User Email From Local Storage
    AsyncStorage.getItem("userEmail").then((data) => {
      if (data) {
        //If userEmail has data -> email
        var Email = JSON.parse(data)
        fetch("https://alert-qc.com/mobile/load_Respo_user.php", {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
          respo_email: Email
        }),
        })
        .then((response) => response.json())
        .then((reseponseJson) => {
          this.setState({
            isLoading: false.valueOf,
            dataSource: reseponseJson,
          });
        });  
      }else{
        console.log("error")
      }
    });
  }
  _renderItem = ({ item, index }) => {
    const name = item.first_name +" "+ item.last_name
    const cont = item.contact
    const email = item.email
    const status = item.on_duty
    var curStat = ""
    if (status === 'True'){
      curStat = "On Duty"
      return (
        <View style={styles.itemCard}>
          <Text style={styles.itemText}>
            <Text style={styles.accHead}>Name:</Text>
            <TextInput editable={false}>{"\n"+name+"\n"}</TextInput>

            <Text style={styles.accHead}>Contact:</Text>
            <TextInput editable={false}>{"\n"+cont+"\n"}</TextInput>

            <Text style={styles.accHead}>Email:</Text>
            <TextInput editable={false}>{"\n"+email+"\n"}</TextInput>

            <Text style={styles.accHead}>Status:{"\n"}</Text>

            <Button 
            color='#87c830'
            title={curStat}
            onPress={() => Alert.alert("Update Status","testing",[
              {
                text: 'Cancel',
                style:"cancel"
              },
              {
                text: 'Go Off Duty',
                
              },
            ])}/>
          </Text>
        </View>
    );
    }else if (status === 'false') {
      curStat = "Off Duty"
      return (
        <View style={styles.itemCard}>
          <Text style={styles.itemText}>
            <Text style={styles.accHead}>Name:</Text>
            <TextInput editable={false}>{"\n"+name+"\n"}</TextInput>

            <Text style={styles.accHead}>Contact:</Text>
            <TextInput editable={false}>{"\n"+cont+"\n"}</TextInput>

            <Text style={styles.accHead}>Email:</Text>
            <TextInput editable={false}>{"\n"+email+"\n"}</TextInput>

            <Text style={styles.accHead}>Status:{"\n"}</Text>

            <Button 
            color='#660000'
            title={curStat}
            onPress={() => Alert.alert("Update Status","testing",[
              {
                text: 'Cancel',
                style:"cancel"
              },
              {
                text: 'Go On Duty',
                
              },
            ])}/>
          </Text>
        </View>
    );
    } else {
      
    }
    
    
  };

  render() {
    let { dataSource, isLoading } = this.state;
    if (isLoading) {
      <View></View>;
    }
    
    return (
      <SafeAreaView>
        <View styles={styles.container}>
          <View>
            <FlatList
              data={dataSource}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
            ></FlatList>
            

          </View>
          <View>
            <Text>Current Incident in Progress?</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingTop: 50,
  },
  itemCard: {
    padding: 25,
    borderBottomWidth: 2,
    borderBottomColor: "#ffcd9c",
  },
  itemText: {
    fontSize: 20,
    color: "black",
  },
  LogButt: {
    position: "absolute",
  },
  accHead: {
    fontSize: 15,
    color: "grey",
  },
});