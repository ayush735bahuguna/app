import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';


const SingleCourse = ({ name, type }) => {
    return (
        <View style={{ borderWidth: 1, padding: 10, margin: 10, borderRadius: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={{ color: 'black', fontWeight: 600 }}>{name}</Text>
                <Text style={{ color: 'black', paddingHorizontal: 5, backgroundColor: '#DCDCDC', marginHorizontal: 5, borderRadius: 5 }}>{type}</Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ color: 'black' }}>Present : 50</Text>
                    <Text style={{ color: 'black' }}>Total : 50</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Ionicons name='trash-outline' size={30} color={'red'} />
                    <Ionicons name='open-outline' size={30} color={'blue'} />
                </View>
            </View>
        </View>
    )
}
export default SingleCourse