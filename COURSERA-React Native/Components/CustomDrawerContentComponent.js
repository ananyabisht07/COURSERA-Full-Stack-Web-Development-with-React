
import React from 'react';
import { View, StyleSheet, Image} from 'react-native'
import { DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Entypo, MaterialIcons,FontAwesome5, } from '@expo/vector-icons';
import {Drawer,Text,} from 'react-native-paper'
//import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context'
//import { ScrollView } from 'react-native-gesture-handler';



export default function CustomDrawerContentComponent(props){
//console.log("Ananayaaaaa",props.navigation.navigate)
    return (
      <View style={{flex:1}}>
        <DrawerContentScrollView {...props} >
        
          <View style={styles.drawerHeader}>
            <View style={{flex:1}}>
              <Image source={require('./images/logo.png')} style={styles.drawerImage} />
            </View>
            <View style={{flex:2}}>
              <Text style={styles.drawerHeaderText}>Con Fusion </Text>
            </View>
          </View>
          
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      marginTop:26,
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
  });
  

  // {<Drawer.Section style={styles.drawerSection}>
  //           <DrawerItem
  //             icon={() => (
  //               <FontAwesome5 name="home" size={34}  color="black"/>
  //             )}
  //             label="Home"
  //             onPress={() => {() => {props.navigation.navigate('Home')}}}
  //           />
  //           <DrawerItem
  //             icon={() => (
  //               <Entypo name="info-with-circle" size={34}  color="black" />
  //             )}
  //             label="About Us"
  //             onPress={() => {() => {props.navigation.navigate('AboutUs')}}}
  //           />
  //           <DrawerItem
  //             icon={() => (
  //               <FontAwesome5 name="home" size={34}  color="black"
  //             />
  //             )}
  //             label="Menu"
  //             onPress={() => {() => {props.navigation.navigate('Menu')}}}
  //           />
  //           <DrawerItem
  //             icon={() => (
  //               <MaterialIcons name="contact-phone" size={34}  color="black" />
  //             )}
  //             label="Contact Us"
  //             onPress={() => {() => {props.navigation.navigate('ContactUs')}}}
  //           />
  //         </Drawer.Section>}