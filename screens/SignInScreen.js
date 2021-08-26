import React, { Component } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  ToastAndroid,
  AlertIOS,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPassword: "",
    };
  }
  componentDidMount() {
    //Get User Email From Local Storage
    AsyncStorage.getItem("userEmail").then((data) => {
      if (data) {
        //If userEmail has data -> email
        this.props.navigation.navigate("MainTab", {
          Email: JSON.parse(data),
        }); //Navigate to Second Screen
      }
    });
  }

  UserLoginFunction = () => {
    const { userEmail } = this.state;
    const { userPassword } = this.state;
    //var uPass = Base64.encode(this.state.userPassword);
    console.log(userPassword);

    fetch("https://alert-qc.com/mobile/RespoLog.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // If the Data matched.
        if (responseJson === "Loading~") {
          // Open Profile Screen.
          //Alert.alert(responseJson);
          AsyncStorage.setItem("userEmail", JSON.stringify(userEmail));
          this.props.navigation.navigate("MainTab", { Email: userEmail });
          if (Platform.OS === "android") {
            ToastAndroid.show("Logging In", ToastAndroid.SHORT);
          } else {
            AlertIOS.alert("Logging In");
          }
        } else {
          Alert.alert(responseJson);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View></View>
        <View style={styles.main}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("./../assets/alert-qc-logo.png")}
            />
            <Text style={styles.loginTitle}>Login to your account</Text>
          </View>

          <View style={styles.formControl}>
            <View style={styles.labelContainer}>
              <Ionicons style={styles.icon} name="ios-person" size={15} />
              <Text style={styles.inputLabel}>Username:</Text>
            </View>
            <TextInput
              placeholder="Enter Username"
              style={styles.input}
              keyboardType="email-address"
              onChangeText={(userEmail) => this.setState({ userEmail })}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formControl}>
            <View style={styles.labelContainer}>
              <Ionicons style={styles.icon} name="ios-lock-closed" size={15} />
              <Text style={styles.inputLabel}>Password:</Text>
            </View>
            <TextInput
              placeholder="Enter Password"
              style={styles.input}
              secureTextEntry={true}
              onChangeText={(userPassword) => this.setState({ userPassword })}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity
              onPress={() => alert("Contact an Admin to reset your password")}
            >
              <Text style={styles.touchable}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formControl}>
            <Button title="Login" onPress={this.UserLoginFunction} />
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginVertical: 60,
    marginHorizontal: 40,
  },
  formControl: {
    width: "100%",
    padding: 10,
  },
  forgotPasswordContainer: {
    width: "100%",
    padding: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#888",
  },
  inputLabel: {
    fontSize: 15,
    fontFamily: "open-sans",
    paddingVertical: 10,
    paddingLeft: 5,
  },
  headerTitle: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTextTitle: {
    fontFamily: "open-sans-bold",
    fontSize: 15,
  },
  scrollViewStyle: {
    backgroundColor: "white",
    height: Dimensions.get("window").height,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: -200,
  },
  logo: {
    width: "40%",
    height: "40%",
  },
  loginTitle: {
    fontSize: 20,
    fontFamily: "open-sans-bold",
    paddingVertical: 10,
    paddingBottom: 10,
  },
  CallButt: {
    position: "absolute",
  },
});

export default SignInScreen;
