import { Text, View, Button, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';

import { router, useLocalSearchParams } from 'expo-router';
import Tilth from '../services/sqlite/Tilth';

import GdChart from '../components/gd-chart/Chart';
import ExcelExportBtn from '../components/excel-export/ExcelExportBtn';
import ChartsHintBtn from '../components/charts-hint-btn/chartsHintBtn';


export default function Gd() {
  const params = useLocalSearchParams()
  const key = params.key
  
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDbLoaded, setisDbLoaded] = useState(false)
  
  const [gdData, setGdData] = useState([])
  const [tilthData, setTilthData] = useState([])

  const [excelData, setExcelData] = useState()

  const getExcelData = async (result) => {
    return result.map((item) => {
      return {
        "Data": item.data,
        "Temperatura Máxima (°C)": item.tmax,
        "Temperatura Mínima (°C)": item.tmin,
        "Temperatura Média (°C)": item.temperatura,
        "Graus Dia": item.grausDias,
        "Graus Dia Acumulado": item.grausDiasAcumulado,
      }
    })
  }

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
      router.replace('/')
    })
  }, [])

  useEffect(() => {
    if(!isDbLoaded) return

    const requestOptions = {
      method: "POST",
      redirect: "follow"
    };
    
    fetch(`https://sisdagro.inmet.gov.br/sisdagro/app/monitoramento/grausdia.json?dataPlantio=${tilthData.tilth_start_date}&culturaId=${tilthData.tilth_type}&estacaoId=4300121000621400001`, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      setGdData(data.bhc)

      getExcelData(data.bhc)
      .then(translatedData => setExcelData(translatedData))
      .catch(err => console.log(err))

      setIsLoaded(true)
    })
    .catch((error) => {
      console.log(error);

      alert('Erro: ' + error.toString())
      setIsLoaded(false)
      
      router.replace('/')
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
    <View className='bg-lightblue h-full w-full'>
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
        <ChartsHintBtn/>
        <View className='w-full items-center'>
          <ExcelExportBtn data={excelData} title='Graus Dia' />
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