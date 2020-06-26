import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent'
import { View, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();   

function MainNavigator ({ navigation }) {
  return (
    <Drawer.Navigator 
      drawerStyle={{
        backgroundColor: '#D1C4E9',
      }}
    >
      <Drawer.Screen name='Home' component={HomeNavigator}  />
      <Drawer.Screen name='Menu' component={MenuNavigator}  />
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

//<View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
class Main extends Component {

  
  render() {
    
    return (
      <NavigationContainer>
          <MainNavigator />
      </NavigationContainer>
    );
  }
}
  
export default Main;