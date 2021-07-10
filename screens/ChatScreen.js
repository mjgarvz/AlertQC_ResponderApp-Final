import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderMenu from "../components/HeaderMenu";

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  render() {
    return (
      <View style={styles.screen}>
        {this.state.loaded ? (
          <View>
            <Text>Chat Room</Text>
          </View>
        ) : (
          <View>
            <Text>Enter the chatroom with the Users!</Text>
            <Button
              title="Start Chatting"
              onPress={() => {
                this.props.navigation.navigate("CreateChat");
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

ChatScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Talk to a Responder",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderMenu}>
        <Item
          title="Emergency"
          iconName="ios-warning-outline"
          onPress={() => {}}
        />
        <Item
          title="Start Chat"
          iconName="ios-create-outline"
          onPress={() => {
            navData.navigation.navigate("CreateChat");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatScreen;
