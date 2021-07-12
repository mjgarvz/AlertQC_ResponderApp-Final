import React from 'react';
import { Linking, Dimensions, View, Text, Button, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Alert, TouchableWithoutFeedback} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';

export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      dataSource: [],
      urName: '',
      urContact: '',
      urEmail: '',
      status: 'Available',
      dataSourceTwo: [],
    };
    setInterval(() => {
      this.componentDidMount();
    }, 1000);

  }

  _renderToComplete = ({item, index}) => {
    return (
      
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            "Incident Detail",
            "Reporter: " +
              item.first_name +" "+ item.last_name +
              "\n" +
              "Location: " +
              item.location_of_incident +
              "\n" +
              "Incident: " +
              item.incident_type +
              "\n" +
              "Injuries: " +
              item.injuries +
              "\n" +
              "Date/Time Reported: " +
              item.date_time +
              "\n" +
              "Short Brief:\n\n" +
              item.short_description,
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Call",
                onPress: () =>{Linking.openURL("tel: " + item.phone);}
              },
              {
                text: "Complete",
                onPress: () => {
                  const repID = item.id + "";
                  console.log(repID)
                  fetch("https://alert-qc.com/mobile/updateToComplete.php", {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      report: repID,
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
            ]
          );
        }}
      >
        <View style={styles.repCard}>
          <Text style={styles.itemText}>
            <Text style={styles.accHead}>Reporter:</Text>
            <Text style={styles.itemVal} editable={false}>{"\n" + item.first_name +" "+ item.last_name+"\n"}</Text>

            <Text style={styles.accHead}>Contact:</Text>
            <Text style={styles.itemVal} editable={false}>{"\n" + item.phone +"\n"}</Text>

            <Text style={styles.accHead}>Barangay:</Text>
            <Text style={styles.itemVal} editable={false}>{item.barangay +"\n"}</Text>
            
            <Text style={styles.accHead}>Location:</Text>
            <Text style={styles.itemVal} editable={false}>{item.location_of_incident +"\n"}</Text>

            <Text style={styles.accHead}>Incident:</Text>
            <Text style={styles.itemVal} editable={false}>{item.incident_type +"\n"}</Text>

            <Text style={styles.accHead}>Injuries:</Text>
            <Text style={styles.itemVal} editable={false}>{item.injuries +"\n"}</Text>
            
            
          </Text>
        </View>
      </TouchableOpacity>
    );
  };


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
    
    AsyncStorage.getItem("userEmail").then((data) => {
      if (data) {
        //If userEmail has data -> email
        var Email = JSON.parse(data)
        fetch("https://alert-qc.com/mobile/reportsToComplete.php", {
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
            dataSourceTwo: reseponseJson,
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
    const isDuty = item.on_duty
    //manual oncallORactivestatus
    const isActive = item.status + ""
    var isAct = "";
    var butCol = "";
    if (isActive === 'Available') {
      isAct = "Available"
      butCol = "#87c830"
    }else if (isActive === 'On Call') {
      isAct = "On Call"
      butCol = "#660000"
    }


    var curDuty = ""
    if (isDuty === 'True'){
      curDuty = "On Duty"
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
            <TouchableOpacity style={styles.buttonDuty}>
              <Button 
              color='#87c830'
              title={curDuty}
              onPress={() => Alert.alert("Update Duty Status","testing",[
                {
                  text: 'Cancel',
                  style:"cancel"
                },
                {
                  text: 'Go Off Duty',
                  onPress: () => {
                    const itemID = item.id + "";
                    console.log(itemID)
                    console.log(curDuty)
                    fetch("https://alert-qc.com/mobile/RespoOnDuty.php", {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        respoID: itemID,
                        respoStatus : curDuty,

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
                  }
                  
                },
              ])}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStatus}>
              <Button 
              color={butCol}
              title={isAct}
              onPress={() => Alert.alert("Update Current Status","testing",[
                {
                  text: 'Cancel',
                  style:"cancel"
                },
                {
                  text: 'Update',
                  onPress: () => {
                    const itemID = item.id + "";
                    console.log(itemID)
                    console.log(isAct)
                    fetch("https://alert-qc.com/mobile/respoOnActive.php", {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        respoID: itemID,
                        respoStatus : isAct,

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
                  }
                  
                },
              ])}/>
            </TouchableOpacity>
          </Text>
        </View>
    );
    }else if (isDuty === 'false') {
      curDuty = "Off Duty"
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
            <TouchableOpacity style={styles.buttonDuty}>
              <Button 
              color='#660000'
              title={curDuty}
              onPress={() => Alert.alert("Update Duty Status","testing",[
                {
                  text: 'Cancel',
                  style:"cancel"
                },
                {
                  text: 'Go On Duty',
                  onPress: () => {
                    const itemID = item.id + "";
                    console.log(itemID)
                    console.log(curDuty)
                    fetch("https://alert-qc.com/mobile/RespoOnDuty.php", {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        respoID: itemID,
                        respoStatus : curDuty,

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
                  }
                },
              ])}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStatus}>
              <Button 
              color={butCol}
              title={isAct}
              onPress={() => Alert.alert("Update Current Status","testing",[
                {
                  text: 'Cancel',
                  style:"cancel"
                },
                {
                  text: 'Update',
                  onPress: () => {
                    const itemID = item.id + "";
                    console.log(itemID)
                    console.log(isAct)
                    fetch("https://alert-qc.com/mobile/respoOnActive.php", {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        respoID: itemID,
                        respoStatus : isAct,

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
                  }
                  
                },
              ])}/>
            </TouchableOpacity>  
          </Text>
        </View>
    );
    } else {
      return(
        <View>
          <Text>FAIL LOAD</Text>
        </View>
      );
    }

    
    
    
  };

  render() {
    let { dataSource,dataSourceTwo, isLoading } = this.state;
    if (isLoading) {
      <View></View>;
    }
    
    return (
      <SafeAreaView>
        <View>
          <View>
            <FlatList
              data={dataSource}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
            ></FlatList>
          </View>
          <View>
            <View style={styles.statusCheck}> 
              <TouchableWithoutFeedback>
                <TextInput style={styles.textStatus} editable={false}>Assigned Reports:</TextInput>
              </TouchableWithoutFeedback>
            </View>
            <View>
              <FlatList
              horizontal
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
                data={dataSourceTwo}
                renderItem={this._renderToComplete}
                keyExtractor={(item, index) => index.toString()}
              ></FlatList>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingTop: 50,
  },
  itemCard: {
    padding: 25,
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
    textAlign: 'center',
    justifyContent: 'center',
    width: Dimensions.get("screen").width * 0.436,

  },
  buttonStatus: {
    textAlign: 'center',
    justifyContent: 'center',
    width: Dimensions.get("screen").width * 0.436,

  },
  statusCheck: {
    width: Dimensions.get("screen").width,
    backgroundColor: '#660000',
  },
  textStatus: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
    paddingTop: 5,
    paddingBottom: 5
  },
  repCard: {
    padding: 25,
    width: Dimensions.get("screen").width,
  }
});