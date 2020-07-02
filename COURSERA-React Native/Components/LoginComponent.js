import React, { Component } from 'react';
import { View,  StyleSheet,Text, ScrollView, Image } from 'react-native';
import { Card, Icon, Input, CheckBox, Button } from 'react-native-elements';
import * as SecureStore from "expo-secure-store";
import * as ImageManipulator from "expo-image-manipulator"
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { baseUrl } from "../Shared/baseUrl";

class LoginTab extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        username: "",
        password: "",
        remember: false,
      };
    }
  
    componentDidMount() {
      SecureStore.getItemAsync("userinfo").then((userdata) => {
        let userinfo = JSON.parse(userdata);
        if (userinfo) {
          this.setState({ username: userinfo.username });
          this.setState({ password: userinfo.password });
          this.setState({ remember: true });
        }
      });
    }
  
    handleLogin() {
      console.log(JSON.stringify(this.state));
      if (this.state.remember)
        SecureStore.setItemAsync(
          "userinfo",
          JSON.stringify({
            username: this.state.username,
            password: this.state.password,
          })
        ).catch((error) => console.log("Could not save user info", error));
      else
        SecureStore.deleteItemAsync("userinfo").catch((error) =>
          console.log("Could not delete user info", error)
        );
    }
  
    render() {
      return (
        <View style={styles.container}>
          <Input
            placeholder=" Username"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder=" Password"
            leftIcon={{ type: "font-awesome", name: "key" }}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            containerStyle={styles.formInput}
          />
          <CheckBox
            title="Remember Me"
            center
            checked={this.state.remember}
            onPress={() => this.setState({ remember: !this.state.remember })}
            containerStyle={styles.formCheckbox}
          />
          <View style={styles.formButton}>
            <Button
              onPress={() => this.handleLogin()}
              title=" Login"
              
              icon={
                <Icon
                  name="sign-in"
                  type="font-awesome"
                  size={24}
                  color="white"
                />
              }
              buttonStyle={{
                backgroundColor: "#512DA8",
                width:150
              }}
            />
          </View>
          <View style={styles.formButton}>
            <Button
              onPress={() => this.props.navigation.navigate("Register")}
              title=" Register"
              type="clear"
              icon={
                <Icon
                  name="user-plus"
                  type="font-awesome"
                  size={24}
                  color="#512DA8"
                />
              }
              titleStyle={{
                color: "#512DA8",
              }}
            />
          </View>
        </View>
      );
    }
  }
class RegisterTab extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        email: "",
        remember: false,
        imageUrl: baseUrl + "images/logo.png",
      };
    }
    getImageFromGallery = async () => {
      console.log("chceking");
      const cameraRollPermission = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      );
      console.log(cameraRollPermission);
      if (cameraRollPermission.status === "granted") {
        let capturedImage = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        if (!capturedImage.cancelled) {
          this.processImage(capturedImage.uri);
        }
      }
    };
  
    getImageFromCamera = async () => {
      const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
      const cameraRollPermission = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      );
  
      if (
        cameraPermission.status === "granted" &&
        cameraRollPermission.status === "granted"
      ) {
        let capturedImage = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        if (!capturedImage.cancelled) {
          this.processImage(capturedImage.uri);
        }
      }
    };
  
    processImage = async (imageUri) => {
      await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 400 } }],
        {
          format: "png",
        }
      )
        .then((processedImage) => {
          console.log(processedImage);
          this.setState({ imageUrl: processedImage.uri });
        })
        .catch((e) => console.log("error", e));
    };
  
    handleRegister() {
      console.log(JSON.stringify(this.state));
      if (this.state.remember)
        SecureStore.setItemAsync(
          "userinfo",
          JSON.stringify({
            username: this.state.username,
            password: this.state.password,
          })
        ).catch((error) => console.log("Could not save user info", error));
    }
  
    render() {
      return (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: this.state.imageUrl }}
                loadingIndicatorSource={require("./images/logo.png")}
                style={styles.image}
              />
              <Button  title="Camera" onPress={this.getImageFromCamera} buttonStyle={{
                backgroundColor: "#512DA8",
                width:100}}
              />
              <Button  title="Gallery" onPress={this.getImageFromGallery} buttonStyle={{
                backgroundColor: "#512DA8",
                width:100,
                margin:10
                }}
              />
            </View>
            <Input
              placeholder=" Username"
              leftIcon={{ type: "font-awesome", name: "user-o" }}
              onChangeText={(username) => this.setState({ username })}
              value={this.state.username}
              containerStyle={styles.formInput}
            />
            <Input
              placeholder=" Password"
              leftIcon={{ type: "font-awesome", name: "key" }}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              containerStyle={styles.formInput}
            />
            <Input
              placeholder=" First Name"
              leftIcon={{ type: "font-awesome", name: "user-o" }}
              onChangeText={(lastname) => this.setState({ firstname })}
              value={this.state.firstname}
              containerStyle={styles.formInput}
            />
            <Input
              placeholder=" Last Name"
              leftIcon={{ type: "font-awesome", name: "user-o" }}
              onChangeText={(lastname) => this.setState({ lastname })}
              value={this.state.lastname}
              containerStyle={styles.formInput}
            />
            <Input
              placeholder=" Email"
              leftIcon={{ type: "font-awesome", name: "envelope-o" }}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              containerStyle={styles.formInput}
            />
            <CheckBox
              title=" Remember Me"
              center
              checked={this.state.remember}
              onPress={() => this.setState({ remember: !this.state.remember })}
              containerStyle={styles.formCheckbox}
            />
            <View style={styles.formButton}>
              <Button
                onPress={() => this.handleRegister()}
                title=" Register"
                icon={
                  <Icon
                    name="user-plus"
                    type="font-awesome"
                    size={24}
                    color="white"
                  />
                }
                buttonStyle={{
                  backgroundColor: "#512DA8",
                  width:150
                }}
              />
            </View>
          </View>
        </ScrollView>
      );
    }
  }
  

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
        alignItems:'center'
    },
    imageContainer: {
        flex: 1,
        flexDirection: "row",
        margin: 10,
        alignItems:'center',
    },
    image: {
        margin: 5,
        width: 80,
        height: 60,
    },
    formInput: {
        margin: 20,
        
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 30
    }
});

class Login extends React.Component {
    render() {
      const Tab = createBottomTabNavigator();
      return (
        <Tab.Navigator
          tabBarOptions={{
            activeBackgroundColor: "#9575CD",
            inactiveBackgroundColor: "#D1C4E9",
            activeTintColor: "#ffffff",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen
            name="Login"
            component={LoginTab}
            options={{
              tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                  name="sign-in"
                  type="font-awesome"
                  size={20}
                  iconStyle={{ color: tintColor }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Register"
            component={RegisterTab}
            options={{
              tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                  name="user-plus"
                  type="font-awesome"
                  size={20}
                  iconStyle={{ color: tintColor }}
                />
              ),
            }}
          />
        </Tab.Navigator>
      );
    }
  }
  

export default Login;