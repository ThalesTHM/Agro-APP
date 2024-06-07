import { Text, View, ActivityIndicator, ScrollView, FlatList, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import Tilth from '../services/sqlite/Tilth';
import constantData from '../constants/data';
import { SelectList } from 'react-native-dropdown-select-list';
import BHCARMChart from '../components/bhc-charts/ARMChart';
import BHCTChart from '../components/bhc-charts/TChart';
import BHCPChart from '../components/bhc-charts/PChart';
import BHCEToChart from '../components/bhc-charts/EToChart';
import BHCETcxETrChart from '../components/bhc-charts/ETcxETrChart';
import BHCProdutividadeChart from '../components/bhc-charts/ProdutividadeChart';
import BHCDEFChart from '../components/bhc-charts/DEFChart';
import BHCEXCChart from '../components/bhc-charts/EXCChart';
import BHCDEFxEXCChart from '../components/bhc-charts/DEFxEXCChart';
import BHCCADxARMChart from '../components/bhc-charts/CADxARMChart';
import BHCPxARMChart from '../components/bhc-charts/PxARMChart';
import BHCETcxTChart from '../components/bhc-charts/ETcxTChart';
import BHCKcChart from '../components/bhc-charts/KcChart';
import BHCDEFxPerdaChart from '../components/bhc-charts/DEFxPerdaChart';
import BHCARMxPerdaChart from '../components/bhc-charts/ARMxPerdaChart';

export default function Bhc() {
  const params = useLocalSearchParams()
  const key = params.key

  const [isDbLoaded, setisDbLoaded] = useState(false)
  const [tilthData, setTilthData] = useState({})
  
  const [isCadLoaded, setIsCadLoaded] = useState(false)
  const [cad, setCad] = useState("")

  const [data, setData] = useState([])

  const [isTextDataLoaded, setIsTextDataLoaded] = useState(false)
  const [textData, setTextData] = useState([])

  const [option, setOption] = useState('Resumo')

  useEffect(()=>{
    Tilth.find(key)
      .then((data)=>{
        setTilthData(data)
        setisDbLoaded(true)
      })
      .catch((error)=>{
        console.warn(error);
      })
  }, [])

  useEffect(()=>{
    if(!isDbLoaded) return
    
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "")
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`https://sisdagro.inmet.gov.br/sisdagro/app/solo/${Math.trunc(tilthData.ground_type)}/${tilthData.tilth_type}/getCadFinal.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCad(result.cadFinal)
        setIsCadLoaded(true)
      })
      .catch(error => console.log(error))

  }, [isDbLoaded])

  useEffect(()=>{
    if (!isCadLoaded) return

    const requestOptions = {
      method: "POST",
      redirect: "follow"
    };
    
    fetch(`https://sisdagro.inmet.gov.br/sisdagro/app/monitoramento/bhc.json?dataPlantio=${tilthData.tilth_start_date}&culturaId=${tilthData.tilth_type}&estacaoId=4325121560435000001&soloId=${Math.trunc(tilthData.ground_type)}&cad=${cad}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.bhc)

        setTextData([
          {
            text: 'Produtividade final',
            value: result['bhc'][result['bhc'].length - 1]['produtividadeResume'].toString().replace('.', ',') + '%'
          },
          {
            text: 'Perda final',
            value: result['bhc'][result['bhc'].length - 1]['penalidadeAcumuladaResume'].toString().replace('.', ',') + '%'
          },
          {
            text: 'Total de dias sem chuva',
            value: result['bhc'][result['bhc'].length - 1]['diasSemChuva']
          },
          {
            text: 'Chuva do período',
            value: result['bhc'][result['bhc'].length - 1]['precipitacaoResume'].toString().replace('.', ',') + ' mm'
          },
          {
            text: 'Temperatura média',
            value: result['bhc'][result['bhc'].length - 1]['temperaturaMediaResume'].toString().replace('.', ',') + ' °C'
          },
          {
            text: 'Maior temperatura máxima',
            value: result['bhc'][result['bhc'].length - 1]['tmpMaximaResume'].toString().replace('.', ',') + ' °C'
          },
          {
            text: 'Menor temperatura mínima',
            value: result['bhc'][result['bhc'].length - 1]['tmpMinimaResume'].toString().replace('.', ',') + ' °C'
          }
        ])

        setIsTextDataLoaded(true)
      })
      .catch((error) => console.error(error));

  }, [isCadLoaded])

  if(!isTextDataLoaded){
    return(
      <View className='h-full w-full bg-lightblue justify-center items-center'>
        <ActivityIndicator size='large'/>
      </View>
    )
  }

  return (
    <View className='w-screen h-full bg-lightblue'>
          <View>
            <SelectList
              placeholder='Selecione uma forma de visualizar os dados'
              data={constantData.BHCOptions}
              setSelected={(val) => setOption(val)}
              search={false}
              save="key"
            />
        </View>
      {option == 'Resumo' && (
        <ScrollView>
        <View className='h-full w-screen items-center'>
        <View className='flex-row items-center justify-center'>
            <View className='h-48 w-36 border-2 border-navyblue rounded justify-center items-center flex flex-column m-5'>
              <View className='h-3/5 justify-center items-center'>
                <Text className='text-lg font-bold text-center'>{textData[0].text}</Text>
              </View>
              <View className='bg-black w-4/5 h-0.5'>
                  <Text>                                                 </Text>
              </View>
              <View className='h-2/5 justify-center items-center'>
                <Text className='text-lg text-center'>{textData[0].value}</Text>
              </View>
            </View>
            <View className='h-48 w-36 border-2 border-navyblue rounded justify-center items-center flex flex-column m-5'>
              <View className='h-3/5 justify-center items-center'>
                <Text className='text-lg font-bold text-center'>{textData[1].text}</Text>
              </View>
              <View className='bg-black w-4/5 h-0.5'>
                  <Text>                                                 </Text>
              </View>
              <View className='h-2/5 justify-center items-center'>
                <Text className='text-lg text-center'>{textData[1].value}</Text>
              </View>
            </View>
          </View>
          <View className='flex-row items-center justify-center'>
            <View className='h-48 w-36 border-2 border-navyblue rounded justify-center items-center flex flex-column m-5'>
              <View className='h-3/5 justify-center items-center'>
                <Text className='text-lg font-bold text-center'>{textData[2].text}</Text>
              </View>
              <View className='bg-black w-4/5 h-0.5'>
                  <Text>                                                 </Text>
              </View>
              <View className='h-2/5 justify-center items-center'>
                <Text className='text-lg text-center'>{textData[2].value}</Text>
              </View>
            </View>
            <View className='h-48 w-36 border-2 border-navyblue rounded justify-center items-center flex flex-column m-5'>
              <View className='h-3/5 justify-center items-center'>
                <Text className='text-lg font-bold text-center'>{textData[3].text}</Text>
              </View>
              <View className='bg-black w-4/5 h-0.5'>
                  <Text>                                                 </Text>
              </View>
              <View className='h-2/5 justify-center items-center'>
                <Text className='text-lg text-center'>{textData[3].value}</Text>
              </View>
            </View>
          </View>
          <View className='flex-row items-center justify-center'>
            <View className='h-48 w-36 border-2 border-navyblue rounded justify-center items-center flex flex-column m-5'>
              <View className='h-3/5 justify-center items-center'>
                <Text className='text-lg font-bold text-center'>{textData[4].text}</Text>
              </View>
              <View className='bg-black w-4/5 h-0.5'>
                  <Text>                                                 </Text>
              </View>
              <View className='h-2/5 justify-center items-center'>
                <Text className='text-lg text-center'>{textData[4].value}</Text>
              </View>
            </View>
            <View className='h-48 w-36 border-2 border-navyblue rounded justify-center items-center flex flex-column m-5'>
              <View className='h-3/5 justify-center items-center'>
                <Text className='text-lg font-bold text-center'>{textData[5].text}</Text>
              </View>
              <View className='bg-black w-4/5 h-0.5'>
                  <Text>                                                 </Text>
              </View>
              <View className='h-2/5 justify-center items-center'>
                <Text className='text-lg text-center'>{textData[5].value}</Text>
              </View>
            </View>
          </View>
          <View className='flex-row items-center justify-center'>
            <View className='h-48 w-36 border-2 border-navyblue rounded justify-center items-center flex flex-column m-5'>
              <View className='h-3/5 justify-center items-center'>
                <Text className='text-lg font-bold text-center'>{textData[6].text}</Text>
              </View>
              <View className='bg-black w-4/5 h-0.5'>
                  <Text>                                                 </Text>
              </View>
              <View className='h-2/5 justify-center items-center'>
                <Text className='text-lg text-center'>{textData[6].value}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      )}
      {option == 'T' && (
            <View className='w-full h-full'>
                <BHCTChart
                    data={data.map((item) => {
                        return {
                            temperaturaMaxima: item.tmax,
                            temperaturaMedia: item.temperatura,
                            temperaturaMinima: item.tmin,
                            data: item.data
                        }
                    })}
                />
                <View className='justify-center items-center flex-col mt-5'>
                  <View className='bg-[#ff0000] rounded-lg w-52 items-center m-2'>
                      <Text className='text-xl'>Temperatura máxima</Text>
                  </View>
                  <View className='bg-[#008000] rounded-lg w-52 items-center m-2'>
                      <Text className='text-xl text-white'>Temperatura média</Text>
                  </View>
                  <View className='bg-[#0000FF] rounded-lg w-52 items-center m-2'>
                      <Text className='text-xl text-white'>Temperatura mínima</Text>
                  </View>
              </View>
            </View>
        )}
        {option == 'P' && (
            <View className='w-full h-full'>
                <BHCPChart
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
                <BHCEToChart
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
                <BHCARMChart
                    data={data.map((item) => {
                        return {
                            valor: item.armPercentual,
                            data: item.data
                        }
                    })}
                />
            </View>
        )}
        {option == 'ETcxETr' && (
            <View className='w-full h-full'>
                <BHCETcxETrChart
                    data={data.map((item) => {
                        return {
                            valorEtc: item.etc,
                            valorEtr: item.etr,
                            data: item.data
                        }
                    })}
                />
                <View className='justify-center items-center flex-col mt-5'>
                  <View className='bg-[#00ff00] rounded-lg w-56 items-center m-2'>
                      <Text className='text-base'>Evapotranspiração da cultura</Text>
                  </View>
                  <View className='bg-[#0000FF] rounded-lg w-64 items-center m-2'>
                      <Text className='text-base text-white'>Evapotranspiração real da cultura</Text>
                  </View>
                </View>
            </View>
        )}
        {option == 'Produtividade' && (
            <View className='w-full h-full'>
                <BHCProdutividadeChart
                    data={data.map((item) => {
                        return {
                            valorProdutividade: item.produtividadeResume,
                            valorPerda: item.penalidadeAcumuladaResume,
                            data: item.data
                        }
                    })}
                />
                <View className='justify-center items-center flex-col mt-5'>
                  <View className='bg-[#0000FF] rounded-lg w-44 items-center m-2'>
                      <Text className='text-xl text-white'>Produtividade</Text>
                  </View>
                  <View className='bg-[#00ff00] rounded-lg w-44 items-center m-2'>
                      <Text className='text-xl'>Perda acumulada</Text>
                  </View>
                </View>
            </View>
        )}
        {option == 'DEF' && (
            <View className='w-full h-full'>
                <BHCDEFChart
                    data={data.map((item) => {
                        return {
                            valor: -item.deficit,
                            data: item.data
                        }
                    })}
                />
            </View>
        )}
        {option == 'Kc' && (
            <View className='w-full h-full'>
              <BHCKcChart
                  data={data.map((item) => {
                      return {
                          valor: item.kc,
                          data: item.data
                      }
                  })}
              />
          </View>
        )}
        {option == 'EXC' && (
            <View className='w-full h-full'>
                <BHCEXCChart
                    data={data.map((item) => {
                        return {
                            valor: item.excesso,
                            data: item.data
                        }
                    })}
                />
            </View>
        )}
        {option == 'CADxARM' && (
            <View className='w-full h-full'>
                <BHCCADxARMChart
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
                        <Text className='text-base'>Capacidade de água disponível</Text>
                    </View>
                    <View className='bg-[#FF0000] rounded-lg w-32 items-center m-2'>
                        <Text className='text-base'>Armazenamento</Text>
                    </View>
                </View>
            </View>
        )}
        {option == 'DEFxEXC' && (
            <View className='w-full h-full'>
            <BHCDEFxEXCChart
                data={data.map((item) => {
                    return {
                        valorExc: item.excesso,
                        valorDef: item.deficit,
                        data: item.data
                    }
                })}
            />
            <View className='justify-center items-center flex-col mt-5'>
                <View className='bg-[#FF0000] rounded-lg w-44 items-center m-2'>
                    <Text className='text-xl'>Deficiência hídrica</Text>
                </View>
                <View className='bg-[#0000FF] rounded-lg w-44 items-center m-2'>
                    <Text className='text-xl text-white'>Excedente hídrico</Text>
                </View>
            </View>
        </View>
        )}
        {option == 'PxARM' && (
            <View className='w-full h-full'>
                <BHCPxARMChart
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
        {option == 'ETcxT' && (
            <View className='w-full h-full'>
                <BHCETcxTChart
                    data={data.map((item) => {
                        return {
                            valorT: item.temperatura,
                            valorEtc: item.etc,
                            data: item.data
                        }
                    })}
                />
                <View className='justify-center items-center flex-col mt-5'>
                    <View className='bg-[#006400] rounded-lg w-56 items-center m-2'>
                        <Text className='text-base text-white'>Evapotranspiração da cultura</Text>
                    </View>
                    <View className='bg-[#0000FF] rounded-lg w-40 items-center m-2'>
                        <Text className='text-base text-white'>Temperatura média</Text>
                    </View>
                </View>
            </View>
        )}
        {option == 'DEFxPERDA' && (
            <View className='w-full h-full'>
                <BHCDEFxPerdaChart
                    data={data.map((item) => {
                        return {
                            valorDef: -item.deficit,
                            valorPerda: item.penalidadeAcumuladaResume,
                            data: item.data
                        }
                    })}
                />
                <View className='justify-center items-center flex-row mt-5'>
                    <View className='bg-[#FFFF00] rounded-lg w-14 items-center m-2'>
                        <Text className='text-base'>Perda</Text>
                    </View>
                    <View className='bg-[#FF0000] rounded-lg w-40 items-center m-2'>
                        <Text className='text-base'>Deficiência hídrica</Text>
                    </View>
                </View>
            </View>
        )}
        {option == 'ARMxPERDA' && (
            <View className='w-full h-full'>
                <BHCARMxPerdaChart
                    data={data.map((item) => {
                        return {
                            valorPerda: item.penalidadeAcumuladaResume,
                            valorArm: item.armPercentual,
                            data: item.data
                        }
                    })}
                />
                <View className='justify-center items-center flex-col mt-5'>
                    <View className='bg-[#006400] rounded-lg w-64 items-center m-2'>
                        <Text className='text-base text-white'>Capacidade de água disponível</Text>
                    </View>
                    <View className='bg-[#0000FF] rounded-lg w-32 items-center m-2'>
                        <Text className='text-base text-white'>Armazenamento</Text>
                    </View>
                </View>
            </View>
        )}
    </View>
  );
}