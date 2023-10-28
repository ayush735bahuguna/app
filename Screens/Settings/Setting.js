import { View, Text } from 'react-native'
import React from 'react'
import Button from '../../Components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = ({ navigation }) => {
    const [userDetails, setUserDetails] = React.useState();
    React.useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
            setUserDetails(JSON.parse(userData));
        }
    };

    const logout = () => {
        AsyncStorage.setItem(
            'userData',
            JSON.stringify({ ...userDetails, loggedIn: false }),
        );
        navigation.navigate('LoginScreen');
    };
    return (
        <View>
            <View style={{ borderBottomColor: 'gray', margin: 10 }}>
                <Text style={{ color: 'black', fontSize: 20 }}>Profile</Text>
            </View>
            <View style={{ borderBottomColor: 'gray', margin: 10 }}>
                <Text style={{ color: 'black', fontSize: 20 }}>Apperance</Text>
                <Button title="Logout" onPress={logout} />
            </View>
        </View>
    )
}

export default Setting