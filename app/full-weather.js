import { StyleSheet, Text, View, ActivityIndicator, FlatList, ScrollView, Image } from 'react-native'
import { useLocalSearchParams  } from 'expo-router'
import { useState, useEffect } from 'react'
import getIconName from '../components/weather/src/weather-icon-type'

const FullWeather = () => {
  const params = useLocalSearchParams()
  const date = params.date
  const [dataRecieved, setDataRecieved] = useState(false)
  const [data, setData] = useState([])
  const[weatherData, setWeatherData] = useState([])
  const[weatherDataDefined, setWeatherDataDefined] = useState(false)

  useEffect(() => {
    if(dataRecieved){
      return
    }

    const myHeaders = new Headers();
    myHeaders.append("Cookie", "")
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://apiprevmet3.inmet.gov.br/previsao/3155801", requestOptions)
      .then((response) => response.json())
      .then((result) =>{
        setData(result)
      }
      )
      .catch((error) => {
        setDataRecieved(false)
      }).finally(() => {
        setDataRecieved(true)
      }).catch((error) => {
        console.log(data);
        console.log("Erro ao pegar os dados: " + error)
      });
  }, [dataRecieved])

  useEffect(() => {
    if(!dataRecieved){
      return
    }

    if(data['error'] != undefined){
      console.log('deu erro');
      WeatherSqlData.findLastWeather()
      .then(result => {
        setData(JSON.parse(result.json))
      })
      .catch(error => console.log(error))
    }

    async function setWeatherDataFromDate(){
      weatherDataAux = data['3155801'][date]['tarde'] != undefined 
      ? 
      {
        manha: {
          icone: getIconName(data['3155801'][date]['manha'].resumo),
          resumo: "Resumo: " + data['3155801'][date]['manha'].resumo,
          temp_max: "Temperatura máxima: " + data['3155801'][date]['manha'].temp_max + " °C",
          temp_min: "Temperatura mínima: " + data['3155801'][date]['manha'].temp_min + " °C",
          dir_vento: "Direção do vento : " + data['3155801'][date]['manha'].dir_vento,
          int_vento: "Intensidade do vento: " + data['3155801'][date]['manha'].int_vento,
          umidade_max: "Umidade máxima: " + data['3155801'][date]['manha'].umidade_max,
          umidade_min: "Umidade mínima: " + data['3155801'][date]['manha'].umidade_min,
          temp_max_tende: "A temperatura máxima tende a: " + data['3155801'][date]['manha'].temp_max_tende,
          temp_min_tende: "A temperatura mínima tende a: " + data['3155801'][date]['manha'].temp_min_tende,
          estacao: "Estação: " + data['3155801'][date]['manha'].estacao,
          nascer: "Nascer do sol: " + data['3155801'][date]['manha'].nascer,
          ocaso: "Ocaso do sol: " + data['3155801'][date]['manha'].ocaso,
          fonte: "Fonte: " + data['3155801'][date]['manha'].fonte
        },
        tarde: {
          icone: getIconName(data['3155801'][date]['tarde'].resumo),
          resumo: "Resumo: " + data['3155801'][date]['tarde'].resumo,
          temp_max: "Temperatura máxima: " + data['3155801'][date]['tarde'].temp_max + " °C",
          temp_min: "Temperatura mínima: " + data['3155801'][date]['tarde'].temp_min + " °C",
          dir_vento: "Direção do vento : " + data['3155801'][date]['tarde'].dir_vento,
          int_vento: "Intensidade do vento: " + data['3155801'][date]['tarde'].int_vento,
          umidade_max: "Umidade máxima: " + data['3155801'][date]['tarde'].umidade_max,
          umidade_min: "Umidade mínima: " + data['3155801'][date]['tarde'].umidade_min,
          temp_max_tende: "A temperatura máxima tende a: " + data['3155801'][date]['tarde'].temp_max_tende,
          temp_min_tende: "A temperatura mínima tende a: " + data['3155801'][date]['tarde'].temp_min_tende,
          estacao: "Estação: " + data['3155801'][date]['tarde'].estacao,
          nascer: "Nascer do sol: " + data['3155801'][date]['tarde'].nascer,
          ocaso: "Ocaso do sol: " + data['3155801'][date]['tarde'].ocaso,
          fonte: "Fonte: " + data['3155801'][date]['tarde'].fonte
        },
        noite: {
          icone: getIconName(data['3155801'][date]['noite'].resumo),
          resumo: "Resumo: " + data['3155801'][date]['noite'].resumo,
          temp_max: "Temperatura máxima: " + data['3155801'][date]['noite'].temp_max + " °C",
          temp_min: "Temperatura mínima: " + data['3155801'][date]['noite'].temp_min + " °C",
          dir_vento: "Direção do vento : " + data['3155801'][date]['noite'].dir_vento,
          int_vento: "Intensidade do vento: " + data['3155801'][date]['noite'].int_vento,
          umidade_max: "Umidade máxima: " + data['3155801'][date]['noite'].umidade_max,
          umidade_min: "Umidade mínima: " + data['3155801'][date]['noite'].umidade_min,
          temp_max_tende: "A temperatura máxima tende a: " + data['3155801'][date]['noite'].temp_max_tende,
          temp_min_tende: "A temperatura mínima tende a: " + data['3155801'][date]['noite'].temp_min_tende,
          estacao: "Estação: " + data['3155801'][date]['noite'].estacao,
          nascer: "Nascer do sol: " + data['3155801'][date]['noite'].nascer,
          ocaso: "Ocaso do sol: " + data['3155801'][date]['noite'].ocaso,
          fonte: "Fonte: " + data['3155801'][date]['noite'].fonte
        }
      } 
      :
      {
        icone: getIconName(data['3155801'][date].resumo),
        resumo: "Resumo: " + data['3155801'][date].resumo,
        temp_max: "Temperatura máxima: " + data['3155801'][date].temp_max + " °C",
        temp_min: "Temperatura mínima: " + data['3155801'][date].temp_min + " °C",
        dir_vento: "Direção do vento : " + data['3155801'][date].dir_vento,
        int_vento: "Intensidade do vento: " + data['3155801'][date].int_vento,
        umidade_max: "Umidade máxima: " + data['3155801'][date].umidade_max,
        umidade_min: "Umidade mínima: " + data['3155801'][date].umidade_min,
        temp_max_tende: "A temperatura máxima tende a: " + data['3155801'][date].temp_max_tende,
        temp_min_tende: "A temperatura mínima tende a: " + data['3155801'][date].temp_min_tende,
        estacao: "Estação: " + data['3155801'][date].estacao,
        nascer: "Nascer do sol: " + data['3155801'][date].nascer,
        ocaso: "Ocaso do sol: " + data['3155801'][date].ocaso,
        fonte: "Fonte: " + data['3155801'][date].fonte
      }

      setWeatherData(weatherDataAux)
    }
    
    setWeatherDataFromDate().catch((error) => {
      console.log(data);
      console.log("Erro ao criar o WeatherData: " + error)
    })

    setWeatherDataDefined(true)

  }, [dataRecieved])


  return (
    <View className="justify-center items-center">
      {
        (weatherDataDefined) ? 
        (
          <View>
            {
              weatherData.tarde != undefined ?
              (
                <View className="h-fit bg-lightblue">
                  <ScrollView>
                    <View className="w-screen h-full justify-center items-center m-0">
                      <View key='manha' className="bg-lighterblue m-5 border-4 rounded-lg min-w-[150px] border-navyblue justify-center items-center h-fit">
                        <View className="mb-5">
                          <Text className="text-3xl">Manhã</Text>
                        </View>
                        <View key='imagemIcone1' className='w-full max-h-[100px]  justify-center items-center m-4'>
                          <Image
                                key='Icone'
                                source={weatherData['manha']['icone']}
                                resizeMode='stretch'
                                className="aspect-square max-h-[100px]  w-full"
                            />
                        </View>
                        <View className="w-full h-fit">
                            {
                              Object.keys(weatherData['manha']).filter(key => !(key == 'icone')).map((key, i) => {
                                return (
                                  <Text key={i} className='text-lg'>{weatherData['manha'][key]}</Text>
                                )
                              })
                            }
                        </View>
                      </View>
                      <View key='tarde' className="bg-lighterblue m-5 border-4 rounded-lg min-w-[150px] border-navyblue justify-center items-center h-fit">
                        <View className="mb-5">
                          <Text className="text-3xl">Tarde</Text>
                        </View>
                        <View key='imagemIcone2' className='w-full max-h-[100px] justify-center items-center m-4'>
                          <Image
                                key='Icone'
                                source={weatherData['tarde']['icone']}
                                resizeMode='stretch'
                                className="aspect-square max-h-[100px] w-full"
                            />
                        </View>
                        <View className="w-full h-fit">
                            {
                              Object.keys(weatherData['tarde']).filter(key => !(key == 'icone')).map((key, i) => {
                                return (
                                  <Text key={i} className='text-lg'>{weatherData['tarde'][key]}</Text>
                                )
                              })
                            }
                        </View>
                      </View>
                      <View key='noite' className="bg-lighterblue m-5 border-4 rounded-lg min-w-[150px] border-navyblue justify-center items-center h-fit">
                        <View className="mb-5">
                          <Text className="text-3xl">Noite</Text>
                        </View>
                        <View key='imagemIcone3' className='w-full max-h-[100px] justify-center items-center'>
                          <Image
                                key='Icone'
                                source={weatherData['noite']['icone']}
                                resizeMode='stretch'
                                className="aspect-square max-h-[100px] w-full"
                            />
                        </View>
                        <View className="w-full h-fit">
                          {
                            Object.keys(weatherData['noite']).filter(key => !(key == 'icone')).map((key, i) => {
                              return (
                                <Text key={i} className='text-lg'>{weatherData['noite'][key]}</Text>
                              )
                            })
                          }
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              )                  
              :
              (
                <View className="bg-lightblue w-screen h-full">
                    <View key='dados' className="bg-lighterblue m-5 border-4 rounded-lg min-w-[150px] border-navyblue justify-center items-center">
                      <View className="mb-5">
                        <Text className="text-3xl">Todo dia</Text>
                      </View>
                        <View key='imagemIcone' className='w-full h-1/4 justify-center items-center'>
                          <Image
                                key='Icone'
                                source={weatherData['icone']}
                                resizeMode='stretch'
                                className="aspect-square h-full w-full"
                            />
                        </View>
                        <View className="w-full">
                          {Object.keys(weatherData).filter(key => !(key == 'icone')).map((key, i) => {
                              return (
                                <Text key={i} className="text-lg">{weatherData[key]}</Text>
                              )
                          })}
                        </View>
                  </View>
                </View>
              )
            }
          </View>
        ) :
        (
          <ActivityIndicator/>
        )
      }
    </View>
  )
}

export default FullWeather