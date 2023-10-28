import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import Loader from '../../Components/loader';
import Button from '../../Components/Button';

const Attendance = () => {
    const [isCameraOpen, setisCameraOpen] = React.useState(false);
    useEffect(() => { checkPermission() }, [])
    const camera = useRef(null);

    const checkPermission = async () => {
        const newCameraPermission = await Camera.requestCameraPermission()
        console.log(newCameraPermission);
    }

    const device = useCameraDevice('front')
    // console.log(device);

    useEffect(() => {
        console.log(isCameraOpen);
    }, [isCameraOpen])


    if (device == null) return (<Loader />)
    return (
        <>
            <View style={{ flex: 1 }}>
                <Camera
                    ref={camera}
                    style={{ width: '100%', height: 400 }}
                    device={device}
                    isActive={isCameraOpen}
                />
            </View>
            <View style={{ marginHorizontal: 20 }}>
                <Button title={!isCameraOpen ? 'Start Attendence' : 'Stop Attendence'} onPress={() => { setisCameraOpen(!isCameraOpen) }} />
            </View>
        </>
    );
};

export default Attendance;
