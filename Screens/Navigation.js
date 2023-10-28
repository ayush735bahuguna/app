import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './Home/Home'
import SettingsScreen from './Settings/Setting'
import AddCourse from './Add course/AddCourse'

const Navigation = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';
                    if (route.name === 'Home') {
                        iconName = focused ? 'home-sharp' : 'home-outline';
                    } else if (route.name === 'Add Course') {
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                    }
                    else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }


                    return <Ionicons name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'black',
            })}>

            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Add Course" component={AddCourse} />
            <Tab.Screen name="Settings" component={SettingsScreen} />

        </Tab.Navigator>
    )
}

export default Navigation