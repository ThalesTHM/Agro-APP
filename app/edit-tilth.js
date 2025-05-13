import { StyleSheet, Text, TextInput, View, Pressable, Platform, Button, ActivityIndicator } from 'react-native'
import {SelectList} from 'react-native-dropdown-select-list'
import  RNDateTimePicker  from '@react-native-community/datetimepicker'
import { useEffect, useState } from 'react'
import data from '../constants/data.js'
import Tilth from '../services/sqlite/Tilth.js'
import { Stack, router, useLocalSearchParams, useNavigation } from 'expo-router'


const EditTilth = () => {
  const params = useLocalSearchParams()
  const key = params.key

  const navigation = useNavigation()

  const [isLoaded, setIsLoaded] = useState(false)

  const [tilthTypeDb, setTilthTypeDb] = useState('')
  const [groundTypeDb, setGroundTypeDb] = useState('')
  const [tilthStartDateDb, setTilthStartDateDb] = useState('')
  const [tilthDb, setTilthDb] = useState({})
   
  const [selectedTilth, setSelectedTilth] = useState(tilthDb.tilth_type)
  const [selectedGround, setSelectedGround] = useState(tilthDb.ground_type)
  const [date, setDate] = useState(new Date())
  const [tilthStartDate, setTilthStartDate] = useState(
  date.getDate() + "/" 
   + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "/" 
   + date.getFullYear()
  )
  const [showPicker, setShowPicker] = useState(false)
  const [buttonPressedCount, setButtonPressedCount] = useState(0)

  useEffect(()=>{
    Tilth.find(key)
        .then((t)=> {
            setTilthDb(t)
            setDate(createDate(t.tilth_start_date))
            
            tilthData.forEach(i => {
                if(i.key == t.tilth_type){
                    setTilthTypeDb(i.value)
                }
            })

            groundData.forEach(i => {
                if(i.key == t.ground_type){
                    setGroundTypeDb(i.value)
                }
            })

            setTilthStartDateDb(t.tilth_start_date)
            setIsLoaded(true)
        })
        .catch((error)=> console.log(error) )
  }, [])

  useEffect(()=>{
    if(buttonPressedCount == 0) return
    console.log(buttonPressedCount);

    if(selectedGround == "" || selectedGround == undefined){
      setButtonPressedCount(0)
      alert("Erro! Selecione um tipo de solo.")
      return
    }

    if(selectedTilth == "" || selectedTilth == undefined){
      setButtonPressedCount(0)
      alert("Erro! Selecione a cultura plantada.")
      return
    }

    if(tilthStartDate == "" || tilthStartDate == undefined){
      setButtonPressedCount(0)
      alert("Erro! Selecione a data do plantio.")
      return
    }

    Tilth.update(key, {
      tilthType: selectedTilth,
      tilthStartDate: tilthStartDate,
      groundType: selectedGround
    }).then(() => {
        alert("Cultura atualizada com sucesso!")

        navigation.reset({
          index: 0,
          routes: [{ name: 'index' }],
        });
    }).catch((error) => {
      console.log(error);
    })

    setButtonPressedCount(0)
  }, [buttonPressedCount])

  const buttonPressEvent = () => {
    setButtonPressedCount(buttonPressedCount + 1)
  }

  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
  }

  const createDate = (t) => {
    dbDate = t.toString().split('/')

    return new Date(dbDate[2], dbDate[1], dbDate[0])
  }

  const placeholderInputTextDate = () => {
    day = date.getDate()
    monthNumber = date.getMonth()
    year = date.getFullYear()
    dayOfWeekNumber = date.getDay()

    months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto',
     'setembro', 'outubro', 'novembro', 'dezembro']

    daysOfWeek = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom']

    month = months[monthNumber]
    dayOfWeek = daysOfWeek[dayOfWeekNumber]

    return `${dayOfWeek} ${day} ${month} ${year}`
  }

  if(!isLoaded){
    return(
        <View className='bg-lighterblue w-full w-full'>
          <Stack.Screen options={{title: 'Editar a cultura'}}/>
          <ActivityIndicator size='large'/>
        </View>
    )
  }

  return (
    <View className='w-full h-full items-center bg-lighterblue'>
      <Stack.Screen options={{title: 'Editar a cultura: ' + tilthTypeDb, headerTitleStyle:{fontSize: 10}}}/>
        <View className='mt-10'>
          <View>
            <View className='h-fit w-fit'>
              <Text className='text-lg'>Cultura plantada</Text>
            </View>
            <SelectList
              placeholder='Selecione uma opção'
              searchPlaceholder='pesquisar'
              notFoundText='Não foi encontrado essa cultura'
              data={data.tilthData}
              defaultOption={{
                key: tilthDb.tilth_type,
                value: tilthTypeDb
              }}
              setSelected={(val) => {
                setSelectedTilth(val)
              }}
              save="key"
            />
          </View>
          <View className='mt-3'>
            <View className='w-fit'>
              <Text className='text-lg'>Tipo de solo</Text>
            </View>
            <SelectList
              placeholder='Selecione uma opção'
              searchPlaceholder='pesquisar'
              data={data.groundData}
              setSelected={(val) => setSelectedGround(val)}
              defaultOption={{
                key: tilthDb.ground_type,
                value: groundTypeDb
              }}
              search={false}
              save="key"
              dropdownStyles={{maxHeight: 100}}
            />
          </View>
          <View className='mt-3'>
            <View className='h-fit w-fit'>
              <Text className='text-lg'>Data do plantio</Text>
            </View>
            <View className='border-[1px] border-gray-600 h-fit w-fit rounded-lg'>
              {showPicker && (
                <RNDateTimePicker
                  mode="date"
                  display='spinner'
                  value={date}
                  onChange={(event, value)=>{
                    setShowPicker(Platform.OS === 'ios' ? true: false)
                    setDate(value)
                    setTilthStartDate(value.getDate() + "/" + 
                    (value.getMonth() + 1 < 10 ? "0" + (value.getMonth() + 1) : (value.getMonth() + 1))
                     + "/" + value.getFullYear())
                  }}
                  minimumDate={new Date('2011-1-1')}
                />
              )}
              <View className='m-1'>
                <Pressable className='w-full' onPress={toggleDatePicker}>
                  <TextInput
                    className='w-full'
                    placeholder={placeholderInputTextDate()}
                    value={placeholderInputTextDate()}
                    onChangeText={setTilthStartDate}
                    editable={false}
                    textAlign='center'
                  />
                </Pressable>
              </View>
            </View>
            <View className='mt-4'>
              <Button title='Atualizar' className="rounded-lg" onPress={buttonPressEvent}/>
            </View>
          </View>
        </View>
    </View>
  )
}

export default EditTilth