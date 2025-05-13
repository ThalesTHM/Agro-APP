import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import WeatherIcon from '../components/weather/weather-icons';
import icons from '../constants/icons';
import Weather from '../components/weather/weather';
import TilthComponent from '../components/tilth/tilth';
import CButton from '../components/custom-btn/CButton';
import { useEffect, useState } from 'react';
import DamsResultChart from '../components/dams-chart/Chart';
import ChartsHintBtn from '../components/charts-hint-btn/chartsHintBtn';

const DamsResult = () => {
  const params = useLocalSearchParams()
  
  const startDate = params.startDate
  const praticaAgricola = params.praticaAgricola
  const probabilidade = params.probabilidade
  const month = params.month

  const [data, setData] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(()=>{
    fetch(`https://sisdagro.inmet.gov.br/sisdagro/app/climatologia/diasaptosmanejosolo/dams.json`, {
      "headers": {
        "accept": "*/*",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      "body": `probabilidade=${probabilidade}&praticaAgricola=${praticaAgricola}&dataInicial=${startDate}&estacaoId=4325121560435000001&dataPlantio&soloId&cad&culturaId`,
      "method": "POST"
    })
      .then((response) => response.json())
      .then((result) => {
        setData(result['bhc'])
        setIsLoaded(true)
      })
      .catch((error) => console.error(error));
  }, [])


  if(!isLoaded){
    return (
      <View className='h-full w-full bg-lightblue justify-center items-center'>
        <ActivityIndicator size='large'/>
      </View>
    )
  }

  return (
    <View className='h-full w-full bg-lightblue'>
        <DamsResultChart data={data.filter((item) => item.mes == month).map((item) => ({valor: item.valorDia, diasAptos: item.posicaoDia}))}/>
        <ChartsHintBtn/>
    </View>
  );
}

export default DamsResult