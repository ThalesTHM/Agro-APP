import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ActivityIndicator } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import WeatherIcon from '../components/weather/weather-icons';
import icons from '../constants/icons';
import Weather from '../components/weather/weather';
import TilthComponent from '../components/tilth/tilth';
import CButton from '../components/custom-btn/CButton';
import { useEffect, useState } from 'react';
import CtbChart from '../components/ctb-chart/Chart';

const ConfortoTermicoBovinoResult = () => {
  const params = useLocalSearchParams()

  const startDate = params.startDate
  const endDate = params.endDate

  const [isLoaded, setIsLoaded] = useState(false)
  const [data, setData] = useState({})

  useEffect(() => {
    fetch("https://sisdagro.inmet.gov.br/sisdagro/app/climatologia/confortotermicobovino/executaMonitoramento", {
    "headers": {
      "accept": "*/*",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    "body": `dataInicial=${startDate}&dataFinal=${endDate}&estacaoId=4325121560435000001`,
    "method": "POST",
  })
      .then((response) => response.json())
      .then((result) => {
        setIsLoaded(true)
        setData(result)
      })
      .catch((error) => console.error(error));
  }, [])

  if(!isLoaded || data['indices'] == undefined){
    return(
      <View className='w-full h-full justify-center items-center bg-lightblue'>
        <ActivityIndicator size='large'/>
      </View>
    )
  }

  return (
    <View className='h-full w-full bg-lightblue'>
      <CtbChart data={data['indices'].map((item) => ({
        valor: item.valor,
        valorPerigo: 79,
        valorAlerta: 76,
        valorAtencao: 72,
        data: item.data
      }))}/>
      <View className='justify-center items-center flex-row mt-5'>
        <View className='bg-[#FF0000] rounded-lg w-20 items-center m-2'>
            <Text className='text-base'>Perigo</Text>
        </View>
        <View className='bg-[#ffa500] rounded-lg w-20 items-center m-2'>
            <Text className='text-base'>Alerta</Text>
        </View>
        <View className='bg-[#ffff00] rounded-lg w-20 items-center m-2'>
            <Text className='text-base'>Atenção</Text>
        </View>
      </View>
    </View>
  );
}

export default ConfortoTermicoBovinoResult