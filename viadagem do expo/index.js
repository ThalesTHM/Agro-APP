import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import WeatherIcon from '../components/weather/weather-icons';
import icons from '../constants/icons';
import Weather from '../components/weather/weather';
import Tilth from '../components/tilth/tilth';
import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite'

export default function App() {
  const db = SQLite.openDatabase('database.db')
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql("CREATE TABLE IF NOT EXISTS Weather " +
      "(id_weather INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, date TEXT NOT NULL, json TEXT NOT NULL);" +
      "CREATE TABLE IF NOT EXISTS Tilth " + 
      "(id_tilth INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, tilth_type TEXT NOT NULL, tilth_start_date TEXT NOT NULL, ground_type TEXT NOT NULL)", 
      null,
    (txObj, resultSet) => {
      console.log(resultSet);
    },
    (txObj, error) => {
      console.log(error);
    })
    })

    setisLoading(false)
  }, [])


  return (
    <View className='h-full pt-10'>
      {
        isLoading ?
        (
          <View className='h-full w-full items-center justify-center'>
            <ActivityIndicator style={{transform: [{scaleX: 3}, {scaleY: 3} ]}} size='large'/>
          </View>
        )
        :
        (
          <View className="items-center bg-white h-full">
            <Text className="text-3xl">AgroAPP - TESTES</Text>
            <Weather/>

            <Tilth/>
          </View>
        )
      }
    </View>
  );
}