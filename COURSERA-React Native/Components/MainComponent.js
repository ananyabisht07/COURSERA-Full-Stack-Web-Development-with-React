import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent'
import Contact from './ContactComponent'
import About from './AboutComponent'
import Favorites from './FavoriteComponent'
import Login from './LoginComponent'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Entypo,Ionicons, MaterialIcons,FontAwesome5, FontAwesome, AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import CustomDrawerContentComponent from './CustomDrawerContentComponent'
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Reservation from './ReservationComponent';
import { View, Platform, Text, ScrollView, Image, StyleSheet, ToastAndroid } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = dispatch => ({
  
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  })

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
        activeTintColor: '#000066',
        itemStyle: { marginVertical: 5 },
      }}
       >
       <Drawer.Screen name='Login' component={LoginNavigator} options={{
        drawerIcon: () => (
          <MaterialCommunityIcons name="login" size={34}  color="black"/>)
      }} />
      <Drawer.Screen name='Home' component={HomeNavigator} options={{
        drawerIcon: () => (
          <FontAwesome5 name="home" size={34}  color="black"/>)
      }} />
      <Drawer.Screen name='Menu' component={MenuNavigator} options={{
        drawerIcon: () => (
          <AntDesign name="menu-unfold" size={34}  color="black" />   )
      }}/>
      <Drawer.Screen name='AboutUs' component={AboutNavigator} options={{
        drawerIcon: () => (
          <Entypo name="info-with-circle" size={34}  color="black" /> )
      }}/>
      <Drawer.Screen name='ContactUs' component={ContactNavigator} options={{
        drawerIcon: () => (
          <MaterialIcons name="contact-phone" size={34}  color="black" />)
      }}/>
      <Drawer.Screen name='My Favorite' component={FavoriteNavigator} options={{
        drawerIcon: () => (
          <FontAwesome name="heart" size={34}  color="black" />)
      }}/>
      <Drawer.Screen name='Reservation' component={ReservationNavigator} options={{
        drawerIcon: () => (
          <MaterialIcons name="restaurant-menu" size={34}  color="black" />)
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
function ReservationNavigator ({ navigation }) {
  return (
    <Stack.Navigator 
      initialRouteName='Reservation'
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
      <Stack.Screen name='Reservation' component={Reservation} options={{
        title:'About Us',
      }} />
    </Stack.Navigator>
  
 )
}

function FavoriteNavigator ({ navigation }) {
  return (
    <Stack.Navigator 
      initialRouteName='Favorite'
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
      <Stack.Screen name='Favorite' component={Favorites} options={{
        title:'My Favorite',
      }} />
    </Stack.Navigator>
  
 )
}

function LoginNavigator ({ navigation }) {
  return (
    <Stack.Navigator 
      initialRouteName='Login'
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
      <Stack.Screen name='Login' component={Login} options={{
        title:'Login',
      }} />
    </Stack.Navigator>
  
 )
}

//<View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
class Main extends Component {
  
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    NetInfo;
    NetInfo.fetch().then((connectionInfo) => {
      ToastAndroid.show(
        "Initial Network Connectivity Type: " +
          connectionInfo.type +
          ", effectiveType: " +
          connectionInfo.effectiveType,
        ToastAndroid.LONG
      );
    });

    NetInfo.addEventListener("connectionChange", this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case "none":
        ToastAndroid.show("You are now offline!", ToastAndroid.LONG);
        break;
      case "wifi":
        ToastAndroid.show("You are now connected to WiFi!", ToastAndroid.LONG);
        break;
      case "cellular":
        ToastAndroid.show(
          "You are now connected to Cellular!",
          ToastAndroid.LONG
        );
        break;
      case "unknown":
        ToastAndroid.show(
          "You now have unknown connection!",
          ToastAndroid.LONG
        );
        break;
      default:
        break;
    }
  };

  
  render() {
    return (
      <NavigationContainer>
        <MainNavigator/>
      </NavigationContainer>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

  
