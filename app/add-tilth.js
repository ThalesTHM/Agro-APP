import { StyleSheet, Text, TextInput, View, Pressable, Platform, Button } from 'react-native'
import {SelectList} from 'react-native-dropdown-select-list'
import  RNDateTimePicker  from '@react-native-community/datetimepicker'
import { useEffect, useState } from 'react'
import data from '../constants/data.js'
import Tilth from '../services/sqlite/Tilth.js'
import { router } from 'expo-router'


const AddTilth = () => {
  const [selectedTilth, setSelectedTilth] = useState("")
  const [selectedGround, setSelectedGround] = useState("")
  const [date, setDate] = useState(new Date())
  const [tilthStartDate, setTilthStartDate] = useState(
  date.getDate() + "/" 
   + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "/" 
   + date.getFullYear()
  )
  const [showPicker, setShowPicker] = useState(false)
  const [buttonPressedCount, setButtonPressedCount] = useState(0)

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

    Tilth.create({
      tilthType: selectedTilth,
      tilthStartDate: tilthStartDate,
      groundType: selectedGround
    }).then((id) => {
      console.log("Cultura adicionada com sucesso!");
      Tilth.find(id)
        .then((item) => console.log(item))
        .catch((error) => console.log(error))

      router.replace('home')
      alert("Cultura cadastrada com sucesso!")
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

  return (
    <View className='w-full h-full items-center bg-lighterblue'>
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
              setSelected={(val, key) => {
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
                  maximumDate={new Date()}
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
              <Button title='Cadastrar' className="rounded-lg" onPress={buttonPressEvent}/>
            </View>
          </View>
        </View>
    </View>
  )
}

export default AddTilth