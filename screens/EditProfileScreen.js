import * as React from "react";
import { Component } from "react";
import { Dimensions } from "react-native";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";

//landing

export default class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      Email: "",
      status: "",
      //responderStates
      firstName: this.props.route.params.fname,
      middleName: this.props.route.params.mname,
      lastName: this.props.route.params.lname,
      conNum: this.props.route.params.contactNum,
      emailAdd: this.props.route.params.emailAddress,
      respoAdd: this.props.route.params.respoderAddress,

      newFirstName: "",
      newMiddleName: "",
      newLastName: "",
      newContactNumber: "",
      newEmailAddress: "",
      newResponderAddress: "",
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userEmail").then((data) => {
      if (data) {
        //If userEmail has data -> email
        var uEmail = JSON.parse(data);
        this.state.Email = uEmail;
        fetch("https://alert-qc.com/mobile/load_Respo_user.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            respo_email: uEmail,
          }),
        })
          .then((response) => response.json())
          .then((reseponseJson) => {
            this.setState({
              isLoading: false.valueOf,
              dataSource: reseponseJson,
            });
          });
      } else {
        console.log("error");
      }
    });
  }

  render() {
    let { dataSource, isLoading } = this.state;
    if (isLoading) {
      <View></View>;
    }
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.mainContainer}>
            <Text>
              <View>
                <Text style={styles.headerText}>First Name:</Text>
                <TextInput
                  style={styles.inputTextF}
                  value={this.state.firstName}
                ></TextInput>
                <Text style={styles.headerText}>Middle Name:</Text>
                <TextInput
                  style={styles.inputTextF}
                  value={this.state.middleName}
                ></TextInput>
                <Text style={styles.headerText}>Last Name:</Text>
                <TextInput
                  style={styles.inputTextF}
                  value={this.state.lastName}
                ></TextInput>
                <Text style={styles.headerText}>Contact:</Text>
                <TextInput
                  style={styles.inputTextF}
                  value={this.state.conNum}
                ></TextInput>
                <Text style={styles.headerText}>Email:</Text>
                <TextInput
                  style={styles.inputTextF}
                  value={this.state.emailAdd}
                ></TextInput>
                <Text style={styles.headerText}>Address:</Text>
                <TextInput
                  style={styles.inputTextF}
                  value={this.state.respoAdd}
                ></TextInput>
              </View>
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableWithoutFeedback style={styles.buttonCancel}>
                <Button
                  color="#ff8000"
                  title="Cancel"
                  onPress={() => {
                    this.props.navigation.goBack(null);
                    console.log("CreateChat");
                  }}
                ></Button>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback style={styles.buttonUpdate}>
                <Button
                  color="#87c830"
                  title="Update"
                  onPress={() => {
                    //add update onpress
                    console.log("CreateChat");
                    console.log(this.state.firstName);
                  }}
                ></Button>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 15,
  },
  buttonContainer: {
    paddingTop: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonCancel: {
    width: Dimensions.get("screen").width * 0.45,
  },
  buttonUpdate: {
    width: Dimensions.get("screen").width * 0.45,
  },
  headerText: {
    fontSize: 20,
    color: "black",
  },
  inputTextF: {
    width: Dimensions.get("screen").width,
    borderBottomWidth: 1,
    borderColor: "#ff8000",
  },
});
