import React, { Component, useState } from "react";
import { Alert } from "react-native";
import { KeyboardAvoidingView, View, Text, StyleSheet, TextInput, Dimensions, Button, ScrollView, SafeAreaView, FlatList,TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class CreateChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      userMessage: "",
      placeholder: "Hi! How are you doing?",
      Email : '',
    };
  }
    //load page
    _loadPage(){
      fetch("https://alert-qc.com/mobile/chatTemp.php")
        .then((response) => response.json())
        .then((reseponseJson) => {
          this.setState({
            isLoading: false.valueOf,
            dataSource: reseponseJson,
          });
        });
        this.setState({placeholder:"Hi! How are you doing?" })
    }
  

  componentDidMount() {

    AsyncStorage.getItem("userEmail").then((data) => {
      if (data) {
        //If userEmail has data -> email
        Email = JSON.parse(data) 
      }else{
        console.log("error")
      }
    });

    fetch("https://alert-qc.com/mobile/chatTemp.php")
      .then((response) => response.json())
      .then((reseponseJson) => {
        this.setState({
          isLoading: false.valueOf,
          dataSource: reseponseJson,
        });
      });

  }
  SendMsg = () => {
    const { userMessage } = this.state;
    console.log(userMessage);
    var MSG = ""
    if (userMessage === ""){
      MSG = userMessage;
    }else{
      MSG = Email +": "+userMessage;
    }
    

    fetch("https://alert-qc.com/mobile/chatSend.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: MSG,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // If the Data matched.
        if (responseJson === "Loading~") {
          this._loadPage();
          Alert.alert(responseJson);
        } else {
          this._loadPage();
          Alert.alert(responseJson);
        }
      })
      .catch((err) => {
        console.error(err);
      });
      
  };
  //INIDENT CARD

  _renderItem = ({ item, index }) => {
    return (
        <View style={styles.itemCard}>
          <Text style={styles.itemText}>
            {
              item.message +
              "\n" }
          </Text>
        </View>
    );
  };

  render() {
    let { dataSource, isLoading } = this.state;
    if (isLoading) {
      <View></View>;
    }
    return (
      <SafeAreaView>

        <View style={styles.container}>
          <View style={styles.chatScreen}>
          <FlatList keyboardShouldPersistTaps='always'
            data={dataSource}  
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            inverted={true}
            extraData={this.state}
          ></FlatList>
          </View>
        </View>
        <View style={styles.subButt} keyboardShouldPersistTaps='always'>
        <View style={styles.form}>
           <Text >Message:</Text>
           <TextInput
            autoCorrect={false}
            placeholder={this.state.placeholder}
            autoFocus={true}
            keyboardType="default"
            onChangeText={(userMessage) => this.setState({ userMessage })}
            autoCapitalize="sentences"
            multiline={true}
             
           />
         </View>
         <Button title="Send Chat" onPress={() => {this.SendMsg(); this.setState({ userMessage: ""})}}/>
       </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    height: Dimensions.get('window').height
  },
  container:{
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
  },
  form: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  formControl: {
      paddingVertical: 5
  },
  inputTitle: {
      fontFamily: 'open-sans-bold',
      fontSize: 15
  },
  input: {
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      paddingVertical: 5
  },
  chatScreen:{
    height: Dimensions.get("screen").height * 0.30,

    
  },
  itemCard:{
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffcd9c',
  },
  itemText:{
    fontSize: 17,
    color: 'black',
  },
  subButt:{
    paddingLeft: 10,
    paddingRight: 10
  }
});

