import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";

const CallButton = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onPress}>
        <View style={styles.buttonContainer}>
            <Text>{props.children}</Text>
        </View>
        </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 45,
    height: 45,
    backgroundColor: "white",
    borderRadius: 50,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  touchable: {
      borderRadius: 50,
      overflow: 'hidden'
  }
});

export default CallButton;
