import React from "react";
import {
  Linking,
  Dimensions,
  View,
  Text,
  Button,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native";

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      dataSource: [],
      dataSourceTwo: [],
      Email: "",
      status: "",
      //respoCreds
      respoUID: "",
      firstName: "",
      middleName: "",
      lastName: "",
      conNum: "",
      emailAdd: "",
      respoAdd: "",
    };
    setInterval(() => {
      this.componentDidMount();
    }, 1000);
  }

  _emptyList = () => {
    return (
      <View>
        <Text>No Reports For Now</Text>
      </View>
    );
  };

  _renderToComplete = ({ item, index }) => {
    if (item.id === undefined) {
      this.state.status = "Available";

    } else {
      this.state.status = "On Call";
      
    }
  };

  componentDidMount() {
    //Get User Email From Local Storage
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

    AsyncStorage.getItem("userEmail").then((data) => {
      if (data) {
        //If userEmail has data -> email
        var uEmail = JSON.parse(data);
        fetch("https://alert-qc.com/mobile/reportsToComplete.php", {
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
              dataSourceTwo: reseponseJson,
            });
          });
      } else {
        console.log("error");
      }
    });
  }
  _renderItem = ({ item, index }) => {
    this.state.respoUID = item.id + ""
    this.state.firstName = item.first_name + "";
    this.state.middleName = item.middle_name + "";
    this.state.lastName = item.last_name + "";
    this.state.conNum = item.contact + "";
    //team
    this.state.emailAdd = item.team + "";
    //dept
    this.state.respoAdd = item.department + "";

    const name = item.first_name + " " + item.last_name;
    const cont = item.contact;
    const email = item.email;
    //user id
    const ID = item.id + "";

    //update onDutyStatus
    const isDuty = item.on_duty;
    var curDuty = "";
    var butColOne = "";
    if (isDuty === "True") {
      curDuty = "On Duty";
      butColOne = "#87c830";
    } else if (isDuty === "false") {
      curDuty = "Off Duty";
      butColOne = "#660000";
    }
    //manual oncallORactivestatus
    const isActive = this.state.status;
    var isAct = "";
    var butCol = "";
    if (isActive === "Available") {
      isAct = "Available";
      butCol = "#87c830";
      var responderID = ID;
      fetch("https://alert-qc.com/mobile/respoOnActive.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          respoID: responderID,
          respoStatus: isAct,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // If the Data matched.
          if (responseJson === "Loading~") {
          } else {
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (isActive === "On Call") {
      isAct = "On Call";
      butCol = "#660000";
      var responderID = ID;
      fetch("https://alert-qc.com/mobile/respoOnActive.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          respoID: responderID,
          respoStatus: isAct,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // If the Data matched.
          if (responseJson === "Loading~") {
          } else {
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (name !== null) {
      return (
        <View style={styles.itemCard}>
          <Text style={styles.itemText}>
            <TextInput style={styles.nameHead} editable={false}>
              {"\n" + name + "\n"}
            </TextInput>
            <Text style={styles.accHead}>Department:</Text>
            <TextInput editable={false}>{item.department + "\n"}</TextInput>
            <Text style={styles.accHead}>Team: </Text>
            <TextInput editable={false}>{item.team + "\n"}</TextInput>
            
            <TouchableOpacity>
              <Button
                title="Edit Profile"
                onPress={() => {
                  console.log(this.state.respoUID)
                  this.props.navigation.navigate("EditProfile", {
                    rID: this.state.respoUID,
                    fname: this.state.firstName,
                    mname: this.state.middleName,
                    lname: this.state.lastName,
                    contactNum: this.state.conNum,
                    //team and dept
                    emailAddress: this.state.emailAdd,
                    respoderAddress: this.state.respoAdd,
                  });
                }}
              />
            </TouchableOpacity>
            <Text style={styles.accHead}>{"\n"}Status:{"\n"}</Text>
            <TouchableOpacity style={styles.buttonDuty}>
              <Button
                color={butColOne}
                title={curDuty}
                onPress={() =>
                  Alert.alert("Update Duty Status", "", [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Update",
                      onPress: () => {
                        const itemID = item.id + "";
                        fetch("https://alert-qc.com/mobile/RespoOnDuty.php", {
                          method: "POST",
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            respoID: itemID,
                            respoStatus: curDuty,
                          }),
                        })
                          .then((response) => response.json())
                          .then((responseJson) => {
                            // If the Data matched.
                            if (responseJson === "Loading~") {
                            } else {
                            }
                          })
                          .catch((err) => {
                            console.error(err);
                          });
                        this.componentDidMount();
                      },
                    },
                  ])
                }
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStatus}>
              <Button
                color={butCol}
                title={isAct}
                onPress={() =>
                  Alert.alert("Update Current Status", "testing", [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Update",
                      onPress: () => {
                        this.componentDidMount();
                      },
                    },
                  ])
                }
              />
            </TouchableOpacity>
          </Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text>FAIL LOAD</Text>
        </View>
      );
    }
  };

  render() {
    let { dataSource, dataSourceTwo, isLoading } = this.state;
    if (isLoading) {
      <View></View>;
    }

    return (
      //<SafeAreaView>
        <View style={styles.container}>
          <View>
            {/*profile data*/}
            <FlatList
              data={dataSource}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
            ></FlatList>
          </View>
          <View>
            {/*updates oncall status*/}
            <View>
              <FlatList
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={dataSourceTwo}
                renderItem={this._renderToComplete}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={this._emptyList()}
                extraData={this.state}
              ></FlatList>
            </View>
          </View>
        </View>
      //</SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  itemCard: {
    padding: 25,
    paddingTop: 0,
    width: Dimensions.get("screen").width,
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
  buttonDuty: {
    textAlign: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width * 0.436,
    paddingRight: 10,
  },
  buttonStatus: {
    textAlign: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width * 0.436,
  },
  buttonMap: {
    textAlign: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width * 0.436,
    paddingRight: 10,
  },
  buttonCall: {
    textAlign: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width * 0.436,
  },
  statusCheck: {
    width: Dimensions.get("screen").width,
    backgroundColor: "#660000",
  },
  textStatus: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
    padding: -5,
  },
  repCard: {
    padding: 25,
    width: Dimensions.get("screen").width,
  },
  nameHead: {
    fontSize: 24,
  },
});
