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
    return (
      <TouchableOpacity
        onPress={() => {
        }}
      >
        <View style={styles.itemCard}>
          <Text style={styles.itemText}>
              <Text>Responder</Text>
              <Text>{"Name:\n" + item.first_name + item.last_name}</Text>
              <Text>{"\nContact:\n" + item.contact}</Text>
              <Text>{"\nEmail:\n" + item.email}</Text>
              
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    let { dataSource, isLoading } = this.state;
    if (isLoading) {
      <View></View>;
    }
    
    return (
      <SafeAreaView>
        <View styles={styles.container}>
          <FlatList
            data={dataSource}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
          ></FlatList>
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
  NameHead: {

  },
  Contacthead: {

  },
  EmailHead: {
    
  },
});