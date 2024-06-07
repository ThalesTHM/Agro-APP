import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { Link } from 'expo-router';
import WeatherIcon from '../components/weather/weather-icons';
import icons from '../constants/icons';
import Weather from '../components/weather/weather';
import TilthComponent from '../components/tilth/tilth';
import CButton from '../components/custom-btn/CButton';

export default function App() {
  return (
    <View className='h-full pt-10'>
      <View className="items-center bg-white h-full">
        <Text className="text-3xl">AgroAPP - TESTES</Text>
        <Weather/>
        <TilthComponent/>
        <CButton/>
      </View>
    </View>
  );
}