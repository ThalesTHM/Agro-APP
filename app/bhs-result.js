import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, Button, ActivityIndicator, ScrollView } from 'react-native';
import constantData from '../constants/data';
import { SelectList } from 'react-native-dropdown-select-list';
import BHSTChart from '../components/bhs-charts/TChart';
import BHSPChart from '../components/bhs-charts/PChart';
import BHSEToChart from '../components/bhs-charts/EToChart';
import BHSARMChart from '../components/bhs-charts/ARMChart';
import BHSALTChart from '../components/bhs-charts/ALTChart';
import BHSETRChart from '../components/bhs-charts/ETRChart';
import BHSDEFChart from '../components/bhs-charts/DEFChart';
import BHSEXCChart from '../components/bhs-charts/EXCChart';
import BHSCADxARMChart from '../components/bhs-charts/CADxARMChart';
import BHSDEFxEXCChart from '../components/bhs-charts/DEFxEXCChart';
import BHSPxARMChart from '../components/bhs-charts/PxARMChart';
import BHSETRxTChart from '../components/bhs-charts/ETRxTChart';
import ExcelExportBtn from '../components/excel-export/ExcelExportBtn';
import ChartsHintBtn from '../components/charts-hint-btn/chartsHintBtn';

export default function App() {
  const params = useLocalSearchParams()

  const startDate = params.startDate;
  const endDate = params.endDate;
  const groundType = params.groundType;

  const [data, setData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const [option, setOption] = useState('Resumo')

  const [excelData, setExcelData] = useState()

  const getExcelData = async (result) => {
    return result.map((item) => {
      return {
        "Data": item.data,
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
    const requestOptions = {
        method: "POST",
        redirect: "follow"
      };
      
    fetch(`https://sisdagro.inmet.gov.br/sisdagro/app/monitoramento/bhs.json?dataInicial=${startDate}&dataFinal=${endDate}&estacaoId=4300121000621400001&soloId=${groundType}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        setData(result.bhs)

        getExcelData(result.bhs)
        .then(translatedData => setExcelData(translatedData))
        .catch(err => console.log(err))
        
        setIsLoaded(true)
    })
    .catch((error) => console.error(error));
  }, [])

  if(!isLoaded){
    return(
        <View className='h-full w-full bg-lightblue'>
            <ActivityIndicator size='large'/>
        </View>
    )
  }

  return (
    <View className='h-full w-full bg-lightblue'>
        <View>
            <SelectList
                placeholder='Selecione uma forma de visualizar os dados'
                data={constantData.BHSOptions}
                setSelected={(val) => setOption(val)}
                search={false}
                save="key"
                />
        </View>
        {option == 'Resumo' && (
            <ScrollView>
                <View className='w-full h-full items-center justify-center'>
                <View className='flex-row items-center justify-center'>
                    <View className='h-48 w-36 border-2 border-navyblue rounded justify-center items-center flex flex-column m-5' >
                        <View className='h-3/5 justify-center items-center'>
                            <Text className='text-lg font-bold text-center'>Total de dias sem chuva</Text>
                        </View>
                        <View className='bg-black w-4/5 h-0.5'>
                            <Text>                                                 </Text>
                        </View>
                        <View className='h-2/5 justify-center items-center'>
                            <Text className='text-lg text-center'>{data[data.length - 1]['diasSemChuva']}</Text>
                        </View>
                    </View>
                    <View className='h-48 w-36 border-2 border-navyblue rounded justify-center items-center flex flex-column m-5' >
                        <View className='h-3/5 justify-center items-center'>
                            <Text className='text-lg font-bold text-center'>Chuva do período</Text>
                        </View>
                        <View className='bg-black w-4/5 h-0.5'>
                            <Text>                                                 </Text>
                        </View>
                        <View className='h-2/5 justify-center items-center'>
                            <Text className='text-lg text-center'>{data[data.length - 1]['precipitacaoResume'].toString().replace('.', ',')} mm</Text>
                        </View>
                    </View>
                </View>
                <View className='flex-row items-center justify-center'>
                    <View className='h-48 w-36 border-2 border-navyblue rounded justify-center items-center flex flex-column m-5' >
                        <View className='h-3/5 justify-center items-center'>
                            <Text className='text-lg font-bold text-center'>Temperatura média</Text>
                        </View>
                        <View className='bg-black w-4/5 h-0.5'>
                            <Text>                                                 </Text>
                        </View>
                        <View className='h-2/5 justify-center items-center'>
                            <Text className='text-lg text-center'>{data[data.length - 1]['temperaturaMediaResume'].toString().replace('.', ',')} °C</Text>
                        </View>
                    </View>
                    <View className='h-48 w-36 border-2 border-navyblue rounded justify-center items-center flex flex-column m-5' >
                        <View className='h-3/5 justify-center items-center'>
                            <Text className='text-lg font-bold text-center'>Maior temperatura máxima</Text>
                        </View>
                        <View className='bg-black w-4/5 h-0.5'>
                            <Text>                                                 </Text>
                        </View>
                        <View className='h-2/5 justify-center items-center'>
                            <Text className='text-lg text-center'>{data[data.length - 1]['tmpMaximaResume'].toString().replace('.', ',')} °C</Text>
                        </View>
                    </View>
                </View>
                <View className='items-center justify-center'>
                    <View className='h-48 w-36 border-2 border-navyblue rounded justify-center items-center flex flex-column m-5' >
                        <View className='h-3/5 justify-center items-center'>
                            <Text className='text-lg font-bold text-center'>Menor temperatura mínima</Text>
                        </View>
                        <View className='bg-black w-4/5 h-0.5'>
                            <Text>                                                 </Text>
                        </View>
                        <View className='h-2/5 justify-center items-center'>
                            <Text className='text-lg text-center'>{data[data.length - 1]['tmpMinimaResume'].toString().replace('.', ',')} °C</Text>
                        </View>
                    </View>
                </View>
              <ExcelExportBtn title={`Balanço Hídrico Sequencial`} data={excelData} />
            </View>
            </ScrollView>
        )}
        {option == 't' && (
            <View className='w-full h-full'>
                <BHSTChart
                    data={data.map((item) => {
                        return {
                            valor: item.temperatura,
                            data: item.data
                        }
                    })}
                />
                <ChartsHintBtn/>
            </View>
        )}
        {option == 'p' && (
            <View className='w-full h-full'>
                <BHSPChart
                    data={data.map((item) => {
                        return {
                            valor: item.precipitacao,
                            data: item.data
                        }
                    })}
                />
                <ChartsHintBtn/>
            </View>
        )}
        {option == 'ETo' && (
            <View className='w-full h-full'>
                <BHSEToChart
                    data={data.map((item) => {
                        return {
                            valor: item.etp,
                            data: item.data
                        }
                    })}
                />
                <ChartsHintBtn/>
            </View>
        )}
        {option == 'ARM' && (
            <View className='w-full h-full'>
                <BHSARMChart
                    data={data.map((item) => {
                        return {
                            valor: item.arm,
                            data: item.data
                        }
                    })}
                />
                <ChartsHintBtn/>
            </View>
        )}
        {option == 'ALT' && (
            <View className='w-full h-full'>
                <BHSALTChart
                    data={data.map((item) => {
                        return {
                            valor: item.alteracao,
                            data: item.data
                        }
                    })}
                />
                <ChartsHintBtn/>
            </View>
        )}
        {option == 'ETR' && (
            <View className='w-full h-full'>
                <BHSETRChart
                    data={data.map((item) => {
                        return {
                            valor: item.etr,
                            data: item.data
                        }
                    })}
                />
                <ChartsHintBtn/>
            </View>
        )}
        {option == 'DEF' && (
            <View className='w-full h-full'>
                <BHSDEFChart
                    data={data.map((item) => {
                        return {
                            valor: -item.deficit,
                            data: item.data
                        }
                    })}
                />
                <ChartsHintBtn/>
            </View>
        )}
        {option == 'EXC' && (
            <View className='w-full h-full'>
                <BHSEXCChart
                    data={data.map((item) => {
                        return {
                            valor: item.excesso,
                            data: item.data
                        }
                    })}
                />
                <ChartsHintBtn/>
            </View>
        )}
        {option == 'CADxARM' && (
            <View className='w-full h-full'>
                <BHSCADxARMChart
                    data={data.map((item) => {
                        return {
                            valorCad: item.cad,
                            valorArm: item.arm,
                            data: item.data
                        }
                    })}
                />
                <View className='justify-center items-center flex-col mt-5'>
                    <View className='bg-[#FFFF00] rounded-lg w-64 items-center m-2'>
                        <Text className='text-base'>Capacidade de armazenamento</Text>
                    </View>
                    <View className='bg-[#FF0000] rounded-lg w-36 items-center m-2'>
                        <Text className='text-base'>Armazenamento</Text>
                    </View>
                </View>
                <ChartsHintBtn/>
            </View>
        )}
        {option == 'DEFxEXC' && (
            <View className='w-full h-full'>
            <BHSDEFxEXCChart
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
            <ChartsHintBtn/>
        </View>
        )}
        {option == 'PxARM' && (
            <View className='w-full h-full'>
                <BHSPxARMChart
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
                <ChartsHintBtn/>
            </View>
        )}
        {option == 'ETRxT' && (
            <View className='w-full h-full'>
                <BHSETRxTChart
                    data={data.map((item) => {
                        return {
                            valorT: item.temperatura,
                            valorEtr: item.etr,
                            data: item.data
                        }
                    })}
                />
                <View className='justify-center items-center flex-col mt-5'>
                    <View className='bg-[#006400] rounded-lg w-48 items-center m-2'>
                        <Text className='text-base text-white'>Evapotranspiração Real</Text>
                    </View>
                    <View className='bg-[#0000FF] rounded-lg w-40 items-center m-2'>
                        <Text className='text-base text-white'>Temperatura Média</Text>
                    </View>
                </View>
                <ChartsHintBtn/>
            </View>
        )}
    </View>
  );
}