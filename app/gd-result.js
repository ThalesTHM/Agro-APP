import { Text, View, Button, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';

import { router, useLocalSearchParams } from 'expo-router';
import Tilth from '../services/sqlite/Tilth';

import GdChart from '../components/gd-chart/Chart';


export default function Gd() {
  const params = useLocalSearchParams()
  const key = params.key
  
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDbLoaded, setisDbLoaded] = useState(false)
  
  const [gdData, setGdData] = useState([])
  const [tilthData, setTilthData] = useState([])

  useEffect(()=>{
    Tilth.find(key)
    .then((data)=> {
      setTilthData(data)
      setisDbLoaded(true)
    })
    .catch((error) => {
      console.log(error);
      alert(error)

      setisDbLoaded(false)
      router.replace('home')
    })
  }, [])

  useEffect(() => {
    if(!isDbLoaded) return

    const requestOptions = {
      method: "POST",
      redirect: "follow"
    };
    
    fetch(`https://sisdagro.inmet.gov.br/sisdagro/app/monitoramento/grausdia.json?dataPlantio=${tilthData.tilth_start_date}&culturaId=${tilthData.tilth_type}&estacaoId=4325121560435000001`, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      setIsLoaded(true)
      setGdData(data.bhc)
    })
    .catch((error) => {
      console.log(error);

      alert(error)
      setIsLoaded(false)
      
      router.replace('home')
    })
  }, [isDbLoaded])
  
  if(!isLoaded){
    return(
      <View>
        <ActivityIndicator size='large'/>
      </View>
    )
  }

  return (
    <View>
      <ScrollView>
        <View>
          <GdChart
          data={gdData.map((item, index)=> ({
            index: index,
            data: item.data,
            grausDiasAcumulado: item.grausDiasAcumulado
          }))}
        />
        </View>
        <View className='m-3 justify-center items-center'>
          {gdData.map((item, index) => {
            if(item['nomeFase'] != '')
              return (
                <View key={'viewContainer' + index}>
                  <Text className='font-3xl font-bold'>{item['data'] + ' - ' + item['nomeFase']}</Text>
                </View>
              )
          })}
        </View>
      </ScrollView>
    </View>
  );
}