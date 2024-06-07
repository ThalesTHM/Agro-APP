import { StyleSheet, Text, TextInput, View, Pressable, Platform, Button } from 'react-native'
import {SelectList} from 'react-native-dropdown-select-list'
import  RNDateTimePicker  from '@react-native-community/datetimepicker'
import { useEffect, useState } from 'react'
import data from '../constants/data.js'
import Tilth from '../services/sqlite/Tilth.js'
import { router } from 'expo-router'


const ConfortoTermicoBovinoForm = () => {
  const [PlaceholderStartDate, setPlaceholderStartDate] = useState(new Date())
  const [PlaceholderEndDate, setPlaceholderEndDate] = useState(new Date())
  
  const [StartDate, setStartDate] = useState(
    (PlaceholderStartDate.getDate() < 10 ? "0" + PlaceholderStartDate.getDate() : PlaceholderStartDate.getDate()) + "/" 
     + (PlaceholderStartDate.getMonth() + 1 < 10 ? "0" + (PlaceholderStartDate.getMonth() + 1) : (PlaceholderStartDate.getMonth() + 1)) + "/" 
     + PlaceholderStartDate.getFullYear()
    )
  
    const [EndDate, setEndDate] = useState(
    (PlaceholderEndDate.getDate() < 10 ? "0" + PlaceholderEndDate.getDate() : PlaceholderEndDate.getDate()) + "/" 
    + (PlaceholderEndDate.getMonth() + 1 < 10 ? "0" + (PlaceholderEndDate.getMonth() + 1) : (PlaceholderEndDate.getMonth() + 1)) + "/" 
    + PlaceholderEndDate.getFullYear()
    )

    const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)

  const buttonPressEvent = () => {
    if((StartDate == '' || StartDate == undefined) && (EndDate == '' || EndDate == undefined)){
        alert('Insira uma data inicial e final válida.')
        return
    }

    if(StartDate == '' || StartDate == undefined){
        alert('Insira uma data inicial válida.')
        return
    }

    if(EndDate == '' || EndDate == undefined){
        alert('Insira uma data final válida.')
        return
    }

    startDateSplited = StartDate.split('/')
    endDateSplited = EndDate.split('/')

    cmpStrDate = new Date(`${startDateSplited[2]}-${startDateSplited[1]}-${startDateSplited[0]}`)
    cmpEndDate = new Date(`${endDateSplited[2]}-${endDateSplited[1]}-${endDateSplited[0]}`)

    if(cmpEndDate < cmpStrDate){
      alert('A data final não pode ser antes da data inicial.')
      return
    }

    router.navigate({pathname: 'conforto-termico-bovino-result', params:{startDate: StartDate, endDate: EndDate}})
  }

  const toggleStartDatePicker = () => {
    setShowStartPicker(!showStartPicker)
  }

  const toggleEndDatePicker = () => {
    setShowEndPicker(!showEndPicker)
  }

  const endPlaceholderInputTextDate = () => {
    day = PlaceholderEndDate.getDate()
    monthNumber = PlaceholderEndDate.getMonth()
    year = PlaceholderEndDate.getFullYear()
    dayOfWeekNumber = PlaceholderEndDate.getDay()

    months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto',
     'setembro', 'outubro', 'novembro', 'dezembro']

    daysOfWeek = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom']

    month = months[monthNumber]
    dayOfWeek = daysOfWeek[dayOfWeekNumber]

    return `${dayOfWeek} ${day} ${month} ${year}`
  }

  const startPlaceholderInputTextDate = () => {
    day = PlaceholderStartDate.getDate()
    monthNumber = PlaceholderStartDate.getMonth()
    year = PlaceholderStartDate.getFullYear()
    dayOfWeekNumber = PlaceholderStartDate.getDay()

    months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto',
     'setembro', 'outubro', 'novembro', 'dezembro']

    daysOfWeek = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom']

    month = months[monthNumber]
    dayOfWeek = daysOfWeek[dayOfWeekNumber]

    return `${dayOfWeek} ${day} ${month} ${year}`
  }

  return (
    <View className='w-full h-full items-center bg-lighterblue'>
        <View className='mt-10 w-3/5'>
          <View className='mt-3'>
            <View className='h-fit w-fit'>
              <Text className='text-lg'>Data inicial</Text>
            </View>
            <View className='border-[1px] border-gray-600 h-fit w-fit rounded-lg'>
              {showStartPicker && (
                <RNDateTimePicker
                  mode="date"
                  display='spinner'
                  value={PlaceholderStartDate}
                  onChange={(event, value)=>{
                    setShowStartPicker(Platform.OS === 'ios' ? true: false)
                    setPlaceholderStartDate(value)
                    setStartDate((value.getDate() < 10 ? "0" + value.getDate() : value.getDate()) + "/" + 
                    (value.getMonth() + 1 < 10 ? "0" + (value.getMonth() + 1) : (value.getMonth() + 1))
                     + "/" + value.getFullYear())
                  }}
                  minimumDate={new Date('2011-1-1')}
                  maximumDate={new Date()}
                />
              )}
              <View className='m-1'>
                <Pressable className='w-full' onPress={toggleStartDatePicker}>
                  <TextInput
                    className='w-full'
                    placeholder={startPlaceholderInputTextDate()}
                    value={startPlaceholderInputTextDate()}
                    onChangeText={setStartDate}
                    editable={false}
                    textAlign='center'
                  />
                </Pressable>
              </View>
            </View>
            <View className='mt-3'>
            <View className='h-fit w-fit'>
              <Text className='text-lg'>Data final</Text>
            </View>
            <View className='border-[1px] border-gray-600 h-fit w-fit rounded-lg'>
              {showEndPicker && (
                <RNDateTimePicker
                  mode="date"
                  display='spinner'
                  value={PlaceholderEndDate}
                  onChange={(event, value)=>{
                    setShowEndPicker(Platform.OS === 'ios' ? true: false)
                    setPlaceholderEndDate(value)
                    setEndDate((value.getDate() < 10 ? "0" + value.getDate() : value.getDate()) + "/" + 
                    (value.getMonth() + 1 < 10 ? "0" + (value.getMonth() + 1) : (value.getMonth() + 1))
                     + "/" + value.getFullYear())
                  }}
                  minimumDate={new Date('2011-1-1')}
                  maximumDate={new Date()}
                />
              )}
              <View className='m-1'>
                <Pressable className='w-full' onPress={toggleEndDatePicker}>
                  <TextInput
                    className='w-full'
                    placeholder={endPlaceholderInputTextDate()}
                    value={endPlaceholderInputTextDate()}
                    onChangeText={setEndDate}
                    editable={false}
                    textAlign='center'
                  />
                </Pressable>
              </View>
            </View>
            </View>
            
          </View>
        <View className='mt-4'>
            <Button title='Consultar' className="rounded-lg" onPress={buttonPressEvent}/>
        </View>
        </View>
    </View>
  )
}

export default ConfortoTermicoBovinoForm