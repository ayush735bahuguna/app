import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import Loader from '../../Components/loader';
import Button from '../../Components/Button';
import * as faceapi from 'face-api.js';
import DataSet from './full-dataset.json'

const Attendance = () => {
    const [isCameraOpen, setisCameraOpen] = useState(false);
    const camera = useRef(null);

    // useEffect(() => { checkPermission() }, [])
    // const checkPermission = async () => {
    //     const newCameraPermission = await Camera.requestCameraPermission()
    //     console.log(newCameraPermission);
    // }

    const device = useCameraDevice('front')
    useEffect(() => { console.log(isCameraOpen) }, [isCameraOpen])


    // ------------------------- face Api-----------------------

    const [recognizedPersons, setRecognizedPersons] = useState(new Set());
    const [isCapturing, setIsCapturing] = useState(false);

    const startVideo = async () => {
        const status = await Camera.requestCameraPermission()
        // console.log(status);
        if (status !== 'granted') {
            console.error("Camera permission not granted.");
            return;
        }
        setIsCapturing(true);
    };

    const stopCapture = () => {
        setIsCapturing(false);
    };

    const updateRecognizedNames = () => {
        console.log(Array.from(recognizedPersons).join(', '));
    };

    async function loadJsonDataset() {
        const response = await fetch(DataSet);
        const data = await response.json();

        const labeledFaceDescriptors = data.map(item => {
            const label = item.name;
            const descriptors = new Float32Array(item.faceDescriptor);
            return new faceapi.LabeledFaceDescriptors(label, [descriptors]);
        });

        return labeledFaceDescriptors;
    }

    const recognizeFaces = async () => {
        Promise.all([
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
        ]).then(() => {
            faceDetection()
        }).catch(error => {
            console.error("Error loading models:", error);
        });
    }

    const faceDetection = async () => {
        if (isCapturing) return;

        startVideo();
        const dataset = await loadJsonDataset();

        setInterval(async () => {
            if (!camera.current) return;

            const options = { mode: faceapi.LOAD_MODE.PARTS, maxDescriptorDelta: 0.5 };

            const { faces, width, height } = await camera.current.detectFaces(options);

            if (faces.length === 0) {
                requestAnimationFrame(faceDetection);
                return;
            }

            const labeledDescriptors = dataset.map((item) => new faceapi.LabeledFaceDescriptors(item.label, [new Float32Array(item.descriptors)]));
            const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.8);

            faces.forEach((detection) => {
                const bestMatch = faceMatcher.findBestMatch(detection.descriptor);

                if (bestMatch.label !== 'unknown' && !recognizedPersons.has(bestMatch.label)) {
                    setRecognizedPersons(new Set(recognizedPersons).add(bestMatch.label));
                    console.log(`Recognized face: ${bestMatch.label}`);
                    updateRecognizedNames();
                }
            });
        }, 100);

        requestAnimationFrame(faceDetection);
    };

    // ----------------------------------------------------------------------------------------------




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

                {/* <Button title={!isCameraOpen ? 'Start Attendence' : 'Stop Attendence'} onPress={() => {
                    setisCameraOpen(!isCameraOpen)
                    !isCameraOpen ? startVideo : stopCapture
                }} /> */}

                <Button title={'Start Attendence'} onPress={() => {
                    recognizeFaces();
                    setisCameraOpen(true)
                }} />

                <Button title={'Stop Attendence'} onPress={() => {
                    stopCapture();
                    setisCameraOpen(false)
                }} />
            </View>
        </>
    );
};

export default Attendance;
