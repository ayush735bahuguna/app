import { View, Text, TextInput, ScrollView } from 'react-native'
import React from 'react'

const AddCourse = () => {
    return (
        <ScrollView >
            <TextInput placeholder='Add Course name' placeholderTextColor="#000" style={{ color: 'black', borderWidth: 1, padding: 10, marginHorizontal: 10, marginVertical: 5, borderRadius: 50, paddingHorizontal: 15, height: 40 }} />

            <TextInput placeholder='Add Course Code' placeholderTextColor="#000" style={{ color: 'black', borderWidth: 1, padding: 10, marginHorizontal: 10, marginVertical: 5, borderRadius: 50, paddingHorizontal: 15, height: 40 }} />

            <Text style={{ color: 'black', fontSize: 20, }}>Submit</Text>
        </ScrollView>
    )
}

export default AddCourse