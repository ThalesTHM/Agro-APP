import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, Button, ActivityIndicator, Image, Touchable, TouchableOpacity } from 'react-native';
import BHCDMPChart from '../components/bhcdm-charts/PChart';
import BHCDMEToChart from '../components/bhcdm-charts/EToChart';
import BHCDMARMChart from '../components/bhcdm-charts/ARMChart';
import BHCDMALTChart from '../components/bhcdm-charts/ALTChart';
import BHCDMETRChart from '../components/bhcdm-charts/ETRChart';
import BHCDMDEFChart from '../components/bhcdm-charts/DEFChart';
import BHCDMEXCChart from '../components/bhcdm-charts/EXCChart';
import BHCDMDEFxEXCChart from '../components/bhcdm-charts/DEFxEXCChart';
import BHCDMPxARMChart from '../components/bhcdm-charts/PxARMChart';
import { SelectList } from 'react-native-dropdown-select-list';
import constantData from '../constants/data';
import BHCDMPxTChart from '../components/bhcdm-charts/PxTChart';
import BHCDMTChart from '../components/bhcdm-charts/TChart';
import icons from '../constants/icons';
import ChartsHintBtn from '../components/charts-hint-btn/chartsHintBtn';
import ExcelExportBtn from '../components/excel-export/ExcelExportBtn';


export default function App() {
  const params = useLocalSearchParams()
  const dateType = params.dateType
  
  const months = [
    'Jan', 'Fev', 'Mar',
    'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set',
    'Out', 'Nov', 'Dez'
  ]

  const [isLoaded, setIsLoaded] = useState(false)
  const [data, setData] = useState([])

  const [option, setOption] = useState('Exportar')

  const [excelData, setExcelData] = useState()

  const getExcelData = async (result) => {
    return result.map((item) => {
      return {
        "Data": (dateType == 1 ? months[Number(item.data.split('/')[1]) - 1] : ((item.data.split('/')[0]) + '/' + (item.data.split('/')[1]))),
        "Armazenamento (ARM) (mm)": item.arm,
        "Alteração (ALT)": item.alteracao,
        "Evapotranspiração Real da Cultura (ETr) (mm)": item.etr,
        "Deficiência Hídrica (DEF) (mm)": item.deficit,
        "Excedente Hídrico (EXC) (mm)": item.excesso,
        "Evapotranspiração de Referência (ETo) (mm)": item.etp,
        "Precipitação (P) (mm)": item.precipitacao,
        "Temperatura (T) (°C)": item.temperatura
      }
    })
  }

  useEffect(()=>{
    let url = ''

    if(dateType == 1)
        url = 'https://sisdagro.inmet.gov.br/sisdagro/app/climatologia/bhclimatologicomensal/bhcnm?estacaoId=4300121000621400001'
    else
        url = 'https://sisdagro.inmet.gov.br/sisdagro/app/climatologia/bhclimatologiconormal/bhcn?estacaoId=4300121000621400001'

    fetch(url, {
        "headers": {
            "accept": "*/*",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        "method": "POST"
        })
        .then(res => res.json())
        .then((result) => {
            setData(result.bhs)
            
            getExcelData(result.bhs)
            .then(translatedData => setExcelData(translatedData))
            .catch(err => console.log(err))

            setIsLoaded(true)
        })
        .catch(error => console.error(error))
  }, [])

  if(!isLoaded){
    return (
        <View className='h-full w-full bg-lightblue justify-center items-center'>
            <Stack.Screen options={{title: 'Balanço Hídrico Climático ' + (dateType == 1 ? 'Mensal' : 'Decendial')}}/>
            <ActivityIndicator size='large'/>
        </View>
    )
  }

  return (
    <View className='h-full w-full bg-lightblue'>
        <Stack.Screen options={{title: 'Balanço Hídrico Climático ' + (dateType == 1 ? 'Mensal' : 'Decendial')}}/>
        <View>
            <SelectList
                placeholder='Selecione uma forma de visualizar os dados'
                data={constantData.BHCDMOptions}
                setSelected={(val) => setOption(val)}
                search={false}
                save="key"
                />
        </View>
        {option == 'Exportar' && (
            <View className='w-full h-full mt-10'>
                <View className='w-full h-3/5 items-center'>
                <View>
                    <Image
                    source={icons.bulb}
                    />
                </View>
                <View className='mt-10 w-4/5'>
                    <Text className='text-2xl font-bold'>Selecione acima uma opção de visualização de dados. Caso queira exportar os dados para excel, pressione o botão abaixo.</Text>
                </View>
                </View>
                <View className='w-full items-center'>
                    <ExcelExportBtn title={`Balanço Hídrico Cli. ${dateType == 1 ? 'Mensal' : 'Decendial'}`} data={excelData}/>
                </View>
            </View>
        )}
        {option == 'T' && (
            <View className='w-full h-full'>
                <BHCDMTChart
                    data={data.map((item) => {
                        return {
                            valor: item.temperatura,
                            data: (dateType == 1 ? months[Number(item.data.split('/')[1]) - 1] : ((item.data.split('/')[0]) + '/' + (item.data.split('/')[1])))
                        }
                    })}
                    dateType={dateType}
                />
                <ChartsHintBtn/>
            </View>
        )}
        {option == 'P' && (
            <View className='w-full h-full'>
                <BHCDMPChart
                    data={data.map((item) => {
                        return {
                            valor: item.precipitacao,
                            data: (dateType == 1 ? months[Number(item.data.split('/')[1]) - 1] : ((item.data.split('/')[0]) + '/' + (item.data.split('/')[1])))
                        }
                    })}
                    dateType={dateType}
                />
                <ChartsHintBtn/>
            </View>
        )}
        {option == 'ETo' && (
            <View className='w-full h-full'>
                <BHCDMEToChart
                    data={data.map((item) => {
                        return {
                            valor: item.etp,
                            data: (dateType == 1 ? months[Number(item.data.split('/')[1]) - 1] : ((item.data.split('/')[0]) + '/' + (item.data.split('/')[1])))
                        }
                    })}
                    dateType={dateType}
                />
                <ChartsHintBtn/>
            </View>
        )}
        {option == 'ARM' && (
            <View className='w-full h-full'>
                <BHCDMARMChart
                    data={data.map((item) => {
                        return {
                            valor: item.arm,
                            data: (dateType == 1 ? months[Number(item.data.split('/')[1]) - 1] : ((item.data.split('/')[0]) + '/' + (item.data.split('/')[1])))
                        }
                    })}
                    dateType={dateType}
                />
                <ChartsHintBtn/>
            </View>
        )}
        {option == 'ALT' && (
            <View className='w-full h-full'>
                <BHCDMALTChart
                    data={data.map((item) => {
                        return {
                            valor: item.alteracao,
                            data: (dateType == 1 ? months[Number(item.data.split('/')[1]) - 1] : ((item.data.split('/')[0]) + '/' + (item.data.split('/')[1])))
                        }
                    })}
                    dateType={dateType}
                />
                <ChartsHintBtn/>
            </View>
        )}
        {option == 'ETr' && (
            <View className='w-full h-full'>
                <BHCDMETRChart
                    data={data.map((item) => {
                        return {
                            valor: item.etr,
                            data: (dateType == 1 ? months[Number(item.data.split('/')[1]) - 1] : ((item.data.split('/')[0]) + '/' + (item.data.split('/')[1])))
                        }
                    })}
                    dateType={dateType}
                />
                <ChartsHintBtn/>
            </View>
        )}
        {option == 'DEF' && (
            <View className='w-full h-full'>
                <BHCDMDEFChart
                    data={data.map((item) => {
                        return {
                            valor: -item.deficit,
                            data: (dateType == 1 ? months[Number(item.data.split('/')[1]) - 1] : ((item.data.split('/')[0]) + '/' + (item.data.split('/')[1])))
                        }
                    })}
                    dateType={dateType}
                />
                <ChartsHintBtn/>
            </View>
        )}
        {option == 'EXC' && (
            <View className='w-full h-full'>
                <BHCDMEXCChart
                    data={data.map((item) => {
                        return {
                            valor: item.excesso,
                            data: (dateType == 1 ? months[Number(item.data.split('/')[1]) - 1] : ((item.data.split('/')[0]) + '/' + (item.data.split('/')[1])))
                        }
                    })}
                    dateType={dateType}
                />
                <ChartsHintBtn/>
            </View>
        )}
        {option == 'PxT' && (
            <View className='w-full h-full'>
                <BHCDMPxTChart
                    data={data.map((item) => {
                        return {
                            valorT: item.temperatura,
                            valorP: item.precipitacao,
                            data: (dateType == 1 ? months[Number(item.data.split('/')[1]) - 1] : ((item.data.split('/')[0]) + '/' + (item.data.split('/')[1])))
                        }
                    })}
                    dateType={dateType}
                />
                <View className='justify-center items-center flex-row mt-5'>
                    <View className='bg-[#0000FF] rounded-lg w-32 items-center m-2'>
                        <Text className='text-xl text-white'>Precipitação</Text>
                    </View>
                    <View className='bg-[#FF0000] rounded-lg w-44 items-center m-2'>
                        <Text className='text-xl'>Temperatura Média</Text>
                    </View>
                </View>
                <ChartsHintBtn/>
            </View>
        )}
        {option == 'DEFxEXC' && (
            <View className='w-full h-full'>
            <BHCDMDEFxEXCChart
                data={data.map((item) => {
                    return {
                        valorExc: item.excesso,
                        valorDef: item.deficit,
                        data: (dateType == 1 ? months[Number(item.data.split('/')[1]) - 1] : ((item.data.split('/')[0]) + '/' + (item.data.split('/')[1])))
                    }
                })}
                dateType={dateType}
            />
            <View className='justify-center items-center flex-col mt-5'>
                <View className='bg-[#FF0000] rounded-lg w-40 items-center m-2'>
                    <Text className='text-xl'>Deficit hídrico</Text>
                </View>
                <View className='bg-[#0000FF] rounded-lg w-44 items-center m-2'>
                    <Text className='text-xl text-white'>Excedente hídrico</Text>
                </View>
            </View>
            <ChartsHintBtn/>
        </View>
        )}
        {option == 'PxARM' && (
            <View className='w-full h-full'>
                <BHCDMPxARMChart
                    data={data.map((item) => {
                        return {
                            valorP: item.precipitacao,
                            valorArm: item.arm,
                            data: (dateType == 1 ? months[Number(item.data.split('/')[1]) - 1] : ((item.data.split('/')[0]) + '/' + (item.data.split('/')[1])))
                        }
                    })}
                    dateType={dateType}
                />
                <View className='justify-center items-center flex-row mt-5'>
                    <View className='bg-[#FFFF00] rounded-lg w-32 items-center m-2'>
                        <Text className='text-xl'>Precipitação</Text>
                    </View>
                    <View className='bg-[#FF0000] rounded-lg w-40 items-center m-2'>
                        <Text className='text-xl'>Armazenamento</Text>
                    </View>
                </View>
                <ChartsHintBtn/>
            </View>
        )}
    </View>
  );
}