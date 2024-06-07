import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native'
import { useLocalSearchParams, Link } from "expo-router"
import React, { useEffect, useState } from 'react'
import WeatherIcon from './weather-icons.js'
import getIconName from './src/weather-icon-type.js'
import WeatherSqlData from '../../services/sqlite/Weather.js';


const Weather = () => {
  const [dataRecieved, setDataRecieved] = useState(false)
  const [data, setData] = useState([])
  const[weatherData, setWeatherData] = useState([])
  const[weatherDataDefined, setWeatherDataDefined] = useState(false)

  const cleanJsonData = (result) => {
    cleanedJsonData = []

    for (let i = 0; i < Object.keys(result['3155801']).length; i++) {
      key = Object.keys(result['3155801'])[i]

      if(result['3155801'][key]['tarde'] != undefined){
        delete result['3155801'][key]['manha']['temp_min_tende_icone']
        delete result['3155801'][key]['manha']['temp_max_tende_icone']
        delete result['3155801'][key]['manha']['icone']
        
        delete result['3155801'][key]['tarde']['temp_min_tende_icone']
        delete result['3155801'][key]['tarde']['temp_max_tende_icone']
        delete result['3155801'][key]['tarde']['icone']
        
        delete result['3155801'][key]['noite']['temp_min_tende_icone']
        delete result['3155801'][key]['noite']['temp_max_tende_icone']
        delete result['3155801'][key]['noite']['icone']
      } else {
        delete result['3155801'][key]['temp_min_tende_icone']
        delete result['3155801'][key]['temp_max_tende_icone']
        delete result['3155801'][key]['icone']
      }
    }

    return result
  }

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

        WeatherSqlData.create({
          json: JSON.stringify(cleanJsonData(result))
        })
        .then((result) => console.log(result))
        .catch((error) => console.log(error))
      }
      )
      .catch((error) => {
        setDataRecieved(false)
        console.log(error);
      }).finally(() => {
        setDataRecieved(true)
      }).catch((error) => {
        console.log(data);
        setDataRecieved(true)
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
        console.log(result.json);
        setData(JSON.parse(result.json))
      })
      .catch(error => console.log(error))
    }
    
    async function setWeatherDataArray(){
      weatherDataAux = []
      

      for (let i = 0; i < Object.keys(data['3155801']).length; i++) {
        key = Object.keys(data['3155801'])[i]

        if(data['3155801'][key]['tarde'] != undefined){
          
          data['3155801'][key]['tarde']['date'] = key
          data['3155801'][key]['tarde']['icon'] = getIconName(data['3155801'][key]['tarde']['resumo'])

          weatherDataAux.push(data['3155801'][key]['tarde'])
        } else {
          data['3155801'][key]['date'] = key
          data['3155801'][key]['icon'] = getIconName(data['3155801'][key]['resumo'])
          weatherDataAux.push(data['3155801'][key])
        }
      }

      setWeatherData(weatherDataAux)
    }
    
    setWeatherDataArray().catch((error) => {
      console.log(data);
      alert('Erro ao pegar ao criar a porra da WeatherData: ' + error)
    })

    setWeatherDataDefined(true)

  }, [dataRecieved])

  return(
    <View className='h-[28vw] w-[95vw] border-navyblue border-[4px] rounded-lg'>
      { (weatherDataDefined) ? 
      (
        <FlatList
          showsHorizontalScrollIndicator={false}
          className="bg-lightblue w-full"
          data={weatherData}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          renderItem={({item}) => ( 
            <View className='justify-center items-center h-full bg-lightblue w-36'>
              <Link 
                href={{
                pathname:"/full-weather",
                params: {
                  date: item.date.toString()
                }
              }}>
                <WeatherIcon
                  icon={item.icon}
                  mintemp={item.temp_min}
                  maxtemp={item.temp_max}
                  date={item.date.substring(0, item.date.length - 5)}
                />
              </Link>
            </View>
            )
          }
        />
      ) : 
      (
        <ActivityIndicator/>
      )
      }
    </View>
  )

}

export default Weather