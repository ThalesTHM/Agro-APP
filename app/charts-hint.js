import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Image } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import WeatherIcon from '../components/weather/weather-icons';
import icons from '../constants/icons';
import Weather from '../components/weather/weather';
import TilthComponent from '../components/tilth/tilth';
import CButton from '../components/custom-btn/CButton';
import { useEffect } from 'react';

export default function HintChars() {
  return (
    <View className='h-full pt-10 bg-lightblue justify-center items-center'>
        <View className='w-full h-3/5 items-center'>
          <View>
              <Image
              source={icons.bulb}
              />
          </View>
          <View className='mt-10 w-4/5'>
              <Text className='text-2xl font-bold'>Arraste horizontalmente um dedo no gráfico para ver os dados com mais detalhes.</Text>
          </View>
        </View>
    </View>
  );
}