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
  Alert,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";
import { disableExpoCliLogging } from "expo/build/logs/Logs";

//landing

export default class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      Email: "",
      status: "",
      repoID: this.props.route.params.rID,
      //responderStates
      firstName: this.props.route.params.fname,
      middleName: this.props.route.params.mname,
      lastName: this.props.route.params.lname,
      conNum: this.props.route.params.contactNum,
      emailAdd: this.props.route.params.emailAddress,
      respoAdd: this.props.route.params.respoderAddress,

      newFirstName: this.props.route.params.fname,
      newMiddleName: this.props.route.params.mname,
      newLastName: this.props.route.params.lname,
      newContactNumber: this.props.route.params.contactNum,
      newEmailAddress: this.props.route.params.emailAddress,
      newResponderAddress: this.props.route.params.respoderAddress,
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
                  defaultValue={this.state.firstName}
                  onChangeText={(data) => this.setState({ newFirstName: data })}
                ></TextInput>
                <Text style={styles.headerText}>Middle Name:</Text>
                <TextInput
                  style={styles.inputTextF}
                  defaultValue={this.state.middleName}
                  onChangeText={(data) =>
                    this.setState({ newMiddleName: data })
                  }
                ></TextInput>
                <Text style={styles.headerText}>Last Name:</Text>
                <TextInput
                  style={styles.inputTextF}
                  defaultValue={this.state.lastName}
                  onChangeText={(data) => this.setState({ newLastName: data })}
                ></TextInput>
                <Text style={styles.headerText}>Contact:</Text>
                <TextInput
                  style={styles.inputTextF}
                  defaultValue={this.state.conNum}
                  onChangeText={(data) =>
                    this.setState({ newContactNumber: data })
                  }
                ></TextInput>
                <Text style={styles.headerText}>Email:</Text>
                <TextInput
                  style={styles.inputTextF}
                  defaultValue={this.state.emailAdd}
                  onChangeText={(data) =>
                    this.setState({ newEmailAddress: data })
                  }
                ></TextInput>
                <Text style={styles.headerText}>Address:</Text>
                <TextInput
                  style={styles.inputTextF}
                  defaultValue={this.state.respoAdd}
                  onChangeText={(data) =>
                    this.setState({ newResponderAddress: data })
                  }
                ></TextInput>
              </View>
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableWithoutFeedback style={styles.buttonCancel}>
                <Button
                  color="#ff8000"
                  title="Cancel"
                  onPress={() => {
                    Alert.alert(
                      "Cancel?",
                      "Canceling will discard all changes made",
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                        {
                          text: "Discard",
                          onPress: () => {
                            this.props.navigation.goBack(null);
                          },
                        },
                      ]
                    );

                    console.log("CreateChat");
                  }}
                ></Button>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback style={styles.buttonUpdate}>
                <Button
                  title="update"
                  color="#87c830"
                  onPress={() => {
                    fetch("https://alert-qc.com/mobile/updateRespoUser.php", {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        phpRID: this.state.repoID,
                        phpFname: this.state.newFirstName,
                        phpMname: this.state.newMiddleName,
                        phpLname: this.state.newLastName,
                        phpCPnum: this.state.newContactNumber,
                        phpEadd: this.state.newEmailAddress,
                        phpRadd: this.state.newResponderAddress,
                      }),
                    })
                      .then((response) => response.json())
                      .then((responseJson) => {
                        // If the Data matched.
                        if (responseJson === "Updated!") {
                          Alert.alert(
                            responseJson + "",
                            "Do you wish to continue making changes?",
                            [
                              {
                                text: "Yes",
                                style: "cancel",
                              },
                              {
                                text: "No",
                                onPress: () => {
                                  this.props.navigation.goBack(null);
                                },
                              },
                            ]
                          );
                        } else {
                          Alert.alert(responseJson);
                        }
                      })
                      .catch((err) => {
                        console.error(err);
                      });

                    console.log(this.state.repoID);
                  }}
                >
                  <Text>Update</Text>
                </Button>
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
