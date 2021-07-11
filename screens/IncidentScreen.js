import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  Linking,
  TextInput,
  TouchableOpacity,
  Clipboard,
  ToastAndroid,
  AlertIos,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OpenMapDirections } from 'react-native-navigation-directions';
import { showLocation } from 'react-native-map-link'

export default class IncidentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      Email : '',
    };
    setInterval(() => {
      this._loadPage();
    }, 5000);
  }
  //MAP NAV
  _callShowDirections = () => {


    const endPoint = {
      longitude: 121.0493,
      latitude: 14.6516
    }

    console.log(endPoint)

		const transportPlan = 'd';

    OpenMapDirections(null, endPoint , transportPlan).then(res => {
      console.log(res)
    });
  }
  //load page
  _loadPage(){
    fetch("https://alert-qc.com/mobile/reportsOnProc.php")
      .then((response) => response.json())
      .then((reseponseJson) => {
        this.setState({
          isLoading: false.valueOf,
          dataSource: reseponseJson,
        });
      });
  }
  
 //PAGE LOAD
  componentDidMount() {
    AsyncStorage.getItem("userEmail").then((data) => {
      if (data) {
        //If userEmail has data -> email
        Email = JSON.parse(data) 
      }else{
        console.log("error")
      }
    });

    fetch("https://alert-qc.com/mobile/reportsOnProc.php")
      .then((response) => response.json())
      .then((reseponseJson) => {
        this.setState({
          isLoading: false.valueOf,
          dataSource: reseponseJson,
        });
      });

  }
  //INCIDENT CARD

  _renderItem = ({ item, index }) => {
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
                text: "Respond",
                onPress: () => {
                  console.log(Email)
                  Alert.alert("Assignment Update","This incident is now assigned to you",
                  [
                    {
                      text: 'Cancel',
                      style:"cancel"
                    },
                    {
                      text: "Go To Navigation",
                      onPress: () => {
                        Clipboard.setString(item.location_of_incident);
                        if (Platform.OS === "android") {
                          ToastAndroid.show(
                            "Location Copied to Clipboard",
                            ToastAndroid.SHORT
                          );
                        } else {
                          AlertIOS.alert("Location Copied to Clipboard");
      
                        }
                        const desti = item.location_of_incident +", " + item.barangay+ ", Quezon City, Metro Manila"
                        const end = desti.toString()
                        const start = "My Location"
                        const travelType = 'drive';

                        console.log(end)

                        showLocation({
                          longitude: 0,
                          latitude: 0,
                          title: end
                        })
                      },
                    }
                  ]
                );
              },
              },
            ]
          );
        }}
      >
        <View style={styles.itemCard}>
          <Text style={styles.itemText}>
            <Text style={styles.accHead}>Reporter:</Text>
            <TextInput style={styles.itemVal} editable={false}>{item.first_name +" "+ item.last_name+"\n"}</TextInput>

            <Text style={styles.accHead}>Barangay:</Text>
            <TextInput style={styles.itemVal} editable={false}>{item.barangay+"\n"}</TextInput>

            <Text style={styles.accHead}>Location:</Text>
            <TextInput style={styles.itemVal} editable={false}>{item.location_of_incident+"\n"}</TextInput>

            <Text style={styles.accHead}>Incident:</Text>
            <TextInput style={styles.itemVal} editable={false}>{item.incident_type+"\n"}</TextInput>

            <Text style={styles.accHead}>Contact:</Text>
            <TextInput style={styles.itemVal} editable={false}>{item.phone}</TextInput>
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
    flex: 1,
    padding: 25,
    borderBottomWidth: 2,
    borderBottomColor: "#ffcd9c",
  },
  itemText: {
    flex: 1,
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
  itemVal: {

  },
});
