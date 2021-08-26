import React, { Component } from "react";
import { Alert } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";

export default class CreateChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      userMessage: "",
      placeholder: "Hi! How are you doing?",
      Email: "",
      defVal: "",
    };
  }
  //load page
  _loadPage() {
    fetch("https://alert-qc.com/mobile/chatTemp.php")
      .then((response) => response.json())
      .then((reseponseJson) => {
        this.setState({
          isLoading: false.valueOf,
          dataSource: reseponseJson,
        });
      });
    this.setState({ placeholder: "Hi! How are you doing?" });
  }

  componentDidMount() {
    AsyncStorage.getItem("userEmail").then((data) => {
      if (data) {
        //If userEmail has data -> email
        Email = JSON.parse(data);
      } else {
        console.log("error");
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
    var MSG = "";
    if (userMessage === "") {
      MSG = userMessage;
    } else {
      MSG = Email + ": " + userMessage;
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
        <Text style={styles.itemText}>{item.message + "\n"}</Text>
      </View>
    );
  };

  render() {
    let { dataSource, isLoading } = this.state;
    if (isLoading) {
      <View></View>;
    }
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.chatScreen}>
              <FlatList
                keyboardShouldPersistTaps="always"
                data={dataSource}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index.toString()}
                inverted={true}
                extraData={this.state}
              ></FlatList>
            </View>
          </View>

          <View style={styles.subButt}>
            <View style={styles.form}>
              <Text>Message:</Text>
              <View style={styles.messageView}>
                <TextInput
                style={styles.textinputstyle}
                  autoCorrect={false}
                  placeholder={this.state.placeholder}
                  defaultValue={this.state.defVal}
                  autoFocus={true}
                  keyboardType="default"
                  onChangeText={(userMessage) => this.setState({ userMessage })}
                  autoCapitalize="sentences"
                />
                <Button
                  title="Send"
                  onPress={() => {
                    this.SendMsg();
                    this.setState({ userMessage: "", defVal: ""});
                    this.componentDidMount();
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    height: Dimensions.get("window").height,
  },
  container: {
    paddingLeft: 10,
    paddingRight: 10,

  },
  form: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  formControl: {
    paddingVertical: 5,
  },
  inputTitle: {
    fontFamily: "open-sans-bold",
    fontSize: 15,
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  chatScreen: {
    height: Dimensions.get("screen").height * 0.65,
  },
  itemCard: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ffcd9c",
  },
  itemText: {
    fontSize: 15,
    color: "black",
  },
  subButt: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  messageView: {
    flexDirection: "row",
  },
  textinputstyle: {
    width: Dimensions.get("screen").width * 0.8,
  }
});
