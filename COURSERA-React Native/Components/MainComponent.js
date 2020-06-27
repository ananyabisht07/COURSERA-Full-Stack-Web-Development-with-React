import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent'
import Contact from './ContactComponent'
import About from './AboutComponent'
import { Provider as PaperProvider } from 'react-native-paper';
import { View, Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Entypo,Ionicons, MaterialIcons,FontAwesome5,MeterialIcons } from '@expo/vector-icons';
import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context'
import CustomDrawerContentComponent from './CustomDrawerContentComponent'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();   

function MainNavigator () {
  //console.log("Main")
  return (
    <Drawer.Navigator 
      drawerStyle={{
        backgroundColor: '#D1C4E9',
      }}
      drawerContent= {(props) => <CustomDrawerContentComponent {...props} />}
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 5 },
      }}
       >
      <Drawer.Screen name='Home' component={HomeNavigator} options={{
        drawerIcon: () => (
          <FontAwesome5 name="home" size={34}  color="black"/>)
      }} />
      <Drawer.Screen name='Menu' component={MenuNavigator} options={{
        drawerIcon: () => (
          <MaterialIcons name="restaurant-menu" size={34}  color="black" />   )
      }}/>
      <Drawer.Screen name='AboutUs' component={AboutNavigator} options={{
        drawerIcon: () => (
          <Entypo name="info-with-circle" size={34}  color="black" /> )
      }}/>
      <Drawer.Screen name='ContactUs' component={ContactNavigator} options={{
        drawerIcon: () => (
          <MaterialIcons name="contact-phone" size={34}  color="black" />)
      }}/>
    </Drawer.Navigator>
  
 )
}


function HomeNavigator ({ navigation }) {
  return (
    <Stack.Navigator 
      initialRouteName='Menu'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: "#fff"
        }
      }}
    >
      <Stack.Screen name='Home' component={Home} options={{
        title:'Home',
        headerTitleAlign:'center',
        headerLeft: () => (
          <Ionicons name="md-menu" size={34}  color="white"
          onPress={ () => navigation.openDrawer() }
          />)
      }} />
    </Stack.Navigator>
 )
}

function  MenuNavigator()  {
  return (
    <Stack.Navigator 
      initialRouteName='Menu'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: "#fff"
        }
      }}
    >
      <Stack.Screen name='Menu' component={Menu} options={{
        title:'Menu',
        headerTitleAlign:'center',
      }} />
      <Stack.Screen name='Dishdetail' component={Dishdetail} options={{
        title:'Dish Detail',
        headerTitleAlign:'center',
      }} />
    </Stack.Navigator>
  
 )
}

function ContactNavigator ({ navigation }) {
  return (
    <Stack.Navigator 
      initialRouteName='Contact Us'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: "#fff"
        }
      }}
    >
      <Stack.Screen name='Contact Us' component={Contact} options={{
        title:'Contact Us',
        headerTitleAlign:'center',
      }} />
    </Stack.Navigator>
  
 )
}

function AboutNavigator ({ navigation }) {
  return (
    <Stack.Navigator 
      initialRouteName='About'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: "#fff"
        }
      }}
    >
      <Stack.Screen name='About' component={About} options={{
        title:'About Us',
      }} />
    </Stack.Navigator>
  
 )
}
//<View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
export default function Main() {
    return (
      
        <NavigationContainer>
          < MainNavigator />
        </NavigationContainer>
    
    );
  }



  
