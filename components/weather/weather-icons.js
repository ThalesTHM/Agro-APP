import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import icons from '../../constants/icons'

const WeatherIcon = ({icon, date, mintemp, maxtemp}) => {
  return (
    <View className="mb-0 mt-0 h-[25vw] w-[25vw] justify-center items-center bg-lighterblue border-teal-500 rounded-full geow-0 shrink-0 border-[4px]">
      <View className="justify-center items-center">
        <Text className="text-xs">{date}</Text>
      </View>
      <View className='w-full h-2/5 items-center justify-center'>
        <Image
            source={icon}
            resizeMode='stretch'
            className="aspect-square w-full h-full"
        />
      </View>
      <View className="justify-center items-center">
        <Text className="text-xs">{mintemp} °C | {maxtemp} °C</Text>
      </View>
    </View>
  )
}

export default WeatherIcon