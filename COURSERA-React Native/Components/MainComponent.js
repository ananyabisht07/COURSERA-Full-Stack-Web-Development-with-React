import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent'
import { View, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();


//<View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
class Main extends Component {

  
  render() {
    const  MenuNavigator = () => {
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
            title:'Home',
            headerTitleAlign:'center',
          }} />
          <Stack.Screen name='Dishdetail' component={Dishdetail} options={{
            title:'Dish Detail',
            headerTitleAlign:'center',
          }} />
        </Stack.Navigator>
      
     )
    }
    return (
      <NavigationContainer>
          <MenuNavigator />
      </NavigationContainer>
    );
  }
}
  
export default Main;