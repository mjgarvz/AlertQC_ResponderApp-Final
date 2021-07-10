import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

const IncidentCard = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.announcement}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onViewAnnouncement} useForeground>
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{props.title}</Text>
              <View style={styles.subtitle}>
              <Text style={styles.subtitle}>Date Posted: {props.date}</Text>
              </View>
            </View>
            <View style={styles.descriptionContainer}>
              <Text numberOfLines={5} style={styles.description}>
                {props.description}
              </Text>
            </View>
            <View style={styles.actions}>
                <Button title="Read More" onPress={props.onViewAnnouncement} />
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  announcement: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 200,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  titleContainer: {
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'open-sans-bold'
  },
  subtitleContainer: {
    marginVertical: 3,
  },
  subtitle:{
    fontSize: 12,
  },
  descriptionContainer: {
    margin: 7,
  },
  actions: {
    //   Button Styles
  }
});

export default IncidentCard;
