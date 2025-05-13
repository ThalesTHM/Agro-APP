import { ActivityIndicator, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import icons from '../../constants/icons'
import { router } from 'expo-router'

const ChartsHintBtn = () => {
    return(
        <View className='w-full h-fit justify-center items-center mt-10'>
            <TouchableOpacity onPress={() => router.navigate('charts-hint')} className='h-50 w-fit'>
                <Image
                    className='w-12 h-12 aspect-square'
                    source={icons.bulb}
                />
            </TouchableOpacity>
            <View>
                <Text className='text-base font-bold'>Dica</Text>
            </View>
        </View>
    )
}

export default ChartsHintBtn