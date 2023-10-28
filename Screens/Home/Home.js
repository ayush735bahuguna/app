import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, Text } from 'react-native'
import React from 'react'
import Attendence from '../Attendance/Attendence'
import Button from '../../Components/Button';

const Home = ({ navigation }) => {
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
    return (
        <>
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <Text style={{ fontSize: 30, color: 'black', margin: 20 }}>Welcome  {userDetails?.fullname}</Text>
                <Attendence />
            </ScrollView >
        </>
    )
}

export default Home