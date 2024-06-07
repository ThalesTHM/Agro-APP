import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, Button, ActivityIndicator } from 'react-native';
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


export default function App() {
  const params = useLocalSearchParams()
  const dateType = params.dateType

  const [isLoaded, setIsLoaded] = useState(false)
  const [data, setData] = useState([])

  const [option, setOption] = useState('ARM')

  useEffect(()=>{
    let url = ''

    if(dateType == 1)
        url = 'https://sisdagro.inmet.gov.br/sisdagro/app/climatologia/bhclimatologicomensal/bhcnm?estacaoId=4325121560435000001'
    else
        url = 'https://sisdagro.inmet.gov.br/sisdagro/app/climatologia/bhclimatologiconormal/bhcn?estacaoId=4325121560435000001'

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
            setIsLoaded(true)
        })
        .catch(error => console.error(error))
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
        <View>
            <SelectList
                placeholder='Selecione uma forma de visualizar os dados'
                data={constantData.BHCDMOptions}
                setSelected={(val) => setOption(val)}
                search={false}
                save="key"
                />
        </View>
        {option == 'T' && (
            <View className='w-full h-full'>
                <BHCDMTChart
                    data={data.map((item) => {
                        return {
                            valor: item.temperatura,
                            data: item.data
                        }
                    })}
                />
            </View>
        )}
        {option == 'P' && (
            <View className='w-full h-full'>
                <BHCDMPChart
                    data={data.map((item) => {
                        return {
                            valor: item.precipitacao,
                            data: item.data
                        }
                    })}
                />
            </View>
        )}
        {option == 'ETo' && (
            <View className='w-full h-full'>
                <BHCDMEToChart
                    data={data.map((item) => {
                        return {
                            valor: item.etp,
                            data: item.data
                        }
                    })}
                />
            </View>
        )}
        {option == 'ARM' && (
            <View className='w-full h-full'>
                <BHCDMARMChart
                    data={data.map((item) => {
                        return {
                            valor: item.arm,
                            data: item.data
                        }
                    })}
                />
            </View>
        )}
        {option == 'ALT' && (
            <View className='w-full h-full'>
                <BHCDMALTChart
                    data={data.map((item) => {
                        return {
                            valor: item.alteracao,
                            data: item.data
                        }
                    })}
                />
            </View>
        )}
        {option == 'ETr' && (
            <View className='w-full h-full'>
                <BHCDMETRChart
                    data={data.map((item) => {
                        return {
                            valor: item.etr,
                            data: item.data
                        }
                    })}
                />
            </View>
        )}
        {option == 'DEF' && (
            <View className='w-full h-full'>
                <BHCDMDEFChart
                    data={data.map((item) => {
                        return {
                            valor: -item.deficit,
                            data: item.data
                        }
                    })}
                />
            </View>
        )}
        {option == 'EXC' && (
            <View className='w-full h-full'>
                <BHCDMEXCChart
                    data={data.map((item) => {
                        return {
                            valor: item.excesso,
                            data: item.data
                        }
                    })}
                />
            </View>
        )}
        {option == 'PxT' && (
            <View className='w-full h-full'>
  
                <BHCDMPxTChart
                    data={data.map((item) => {
                        return {
                            valorT: item.temperatura,
                            valorP: item.precipitacao,
                            data: item.data
                        }
                    })}
                />
                <View className='justify-center items-center flex-row mt-5'>
                    <View className='bg-[#0000FF] rounded-lg w-32 items-center m-2'>
                        <Text className='text-xl text-white'>Precipitação</Text>
                    </View>
                    <View className='bg-[#FF0000] rounded-lg w-44 items-center m-2'>
                        <Text className='text-xl'>Temperatura Média</Text>
                    </View>
                </View>
            </View>
        )}
        {option == 'DEFxEXC' && (
            <View className='w-full h-full'>
            <BHCDMDEFxEXCChart
                data={data.map((item) => {
                    return {
                        valorExc: item.excesso,
                        valorDef: item.deficit,
                        data: item.data
                    }
                })}
            />
            <View className='justify-center items-center flex-col mt-5'>
                <View className='bg-[#FF0000] rounded-lg w-40 items-center m-2'>
                    <Text className='text-xl'>Deficit hídrico</Text>
                </View>
                <View className='bg-[#0000FF] rounded-lg w-44 items-center m-2'>
                    <Text className='text-xl text-white'>Excedente hídrico</Text>
                </View>
            </View>
        </View>
        )}
        {option == 'PxARM' && (
            <View className='w-full h-full'>
                <BHCDMPxARMChart
                    data={data.map((item) => {
                        return {
                            valorP: item.precipitacao,
                            valorArm: item.arm,
                            data: item.data
                        }
                    })}
                />
                <View className='justify-center items-center flex-row mt-5'>
                    <View className='bg-[#FFFF00] rounded-lg w-32 items-center m-2'>
                        <Text className='text-xl'>Precipitação</Text>
                    </View>
                    <View className='bg-[#FF0000] rounded-lg w-40 items-center m-2'>
                        <Text className='text-xl'>Armazenamento</Text>
                    </View>
                </View>
            </View>
        )}
        {option == 'ETRxT' && (
            <View className='w-full h-full'>
                <BHCDMETRxTChart
                    data={data.map((item) => {
                        return {
                            valorT: item.temperatura,
                            valorEtr: item.etr,
                            data: item.data
                        }
                    })}
                />
                <View className='justify-center items-center flex-row mt-5'>
                    <View className='bg-[#FFFF00] rounded-lg w-42 items-center m-2'>
                        <Text className='text-base'>Evapotranspiração Real</Text>
                    </View>
                    <View className='bg-[#FF0000] rounded-lg w-40 items-center m-2'>
                        <Text className='text-base'>Temperatura Média</Text>
                    </View>
                </View>
            </View>
        )}
    </View>
  );
}