import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import WeatherIcon from '../components/weather/weather-icons';
import icons from '../constants/icons';
import Weather from '../components/weather/weather';
import TilthComponent from '../components/tilth/tilth';
import CButton from '../components/custom-btn/CButton';
import { useEffect, useState } from 'react';
import ExcelExportBtn from '../components/excel-export/ExcelExportBtn';

const DamsResult = () => {
  const params = useLocalSearchParams()
  
  const startDate = params.startDate
  const praticaAgricola = params.praticaAgricola
  const probabilidade = params.probabilidade

  const [data, setData] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  const [excelData, setExcelData] = useState()

  const getExcelData = async (result) => {
    return result.map((item) => {
      return {
        "Mês": item.mes, 
        "Decêndio": item.decendio, 
        "Dias Aptos": item.posicaoDia, 
        "Porcentagem Dias Aptos": item.valorDia, 
      }
    })
  }

  const getRgb = (val) => {
    var r = parseInt(180-(250*val/100));
    var g = parseInt(180*val/100);
    var b = 15;

    return{
      r: r,
      g: g,
      b: b
    }
  }

  useEffect(()=>{
    fetch(`https://sisdagro.inmet.gov.br/sisdagro/app/climatologia/diasaptosmanejosolo/dams.json`, {
      "headers": {
        "accept": "*/*",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      "body": `probabilidade=${probabilidade}&praticaAgricola=${praticaAgricola}&dataInicial=${startDate}&estacaoId=4325121560435000001&dataPlantio=04%2F05%2F2024&soloId&cad&culturaId`,
      "method": "POST"
    })
      .then((response) => response.json())
      .then((result) => {
        setData(result['bhc'])

        getExcelData(result.bhc)
        .then(translatedData => setExcelData(translatedData))
        .catch(err => console.log(err))

        setIsLoaded(true)
      })
      .catch((error) => console.error(error));
  }, [])

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity className='h-fit w-fit' onPress={()=>router.navigate({pathname: 'dams-chart-result', params:{month: item.mes, startDate: startDate, probabilidade: probabilidade, praticaAgricola: praticaAgricola}})}>
        <View className='h-12 flex-row mx-[2px] my-[8px] justify-between items-center' style={{backgroundColor: `rgba(${getRgb(item.valorDia).r}, ${getRgb(item.valorDia).g}, ${getRgb(item.valorDia).b}, 1)`, elevation: 1}}>
          <Text className='flex-1 text-xs text-white p-2'>{item.decendio}</Text>
          <Text className='flex-1 text-xs text-white p-2'>{item.mes}</Text>
          <Text className='flex-1 text-xs text-white p-2'>{item.posicaoDia}</Text>
          <Text className='flex-1 text-xs text-white p-2'>{item.valorDia.toString().replace('.', ',')}%</Text>
        </View>
      </TouchableOpacity>
    )
  }

  if(!isLoaded){
    return (
      <View className='h-full w-full bg-lightblue justify-center items-center'>
        <ActivityIndicator size='large'/>
      </View>
    )
  }

  return (
    <View className='h-full w-full bg-lightblue'>
      <View className='h-fit w-full items-center'>
        <ExcelExportBtn title='Dias Aptos de Manejo de Solo' data={excelData} />
      </View>
      <View className='flex-1 px-[20px] py-[20px] mt-[-25px]'>
        <View className='px-[10px] py-[12px] rounded-lg mb-[15px] bg-[#6AB7E2]' style={{elevation: 2}}>
          <Text className='text-[#fff]'>Probabilidade</Text>
        </View>
        <View className='flex-row justify-between pb-3'>
          <Text className='text-xs'>Decêndio</Text>
          <Text className='text-xs'>Mês</Text>
          <Text className='text-xs'>Dias Aptos</Text>
          <Text className='text-xs'>Porcentagem Dias Aptos</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => 'item' + index}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

export default DamsResult