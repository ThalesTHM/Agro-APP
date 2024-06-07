import { StyleSheet, Text, TextInput, View, Pressable, Platform, Button } from 'react-native'
import {SelectList} from 'react-native-dropdown-select-list'
import  DateTimePickerAndroid  from '@react-native-community/datetimepicker'
import { useEffect, useState } from 'react'
import data from '../constants/data.js'
import * as SQLite from 'expo-sqlite'

const AddCulture = () => {
  const [selectedTilth, setSelectedTilth] = useState("")
  const [selectedGround, setSelectedGround] = useState("")
  const [tilthStartDate, setTilthStartDate] = useState("")
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const db = SQLite.openDatabase('database.db')

  useEffect(() => {
    if(selectedTilth != "" && selectedGround != ""){
      db.transaction(tx => {
        tx.executeSql(`INSERT INTO Tilth (tilth_type, tilth_start_date, ground_type) VALUES ('${selectedTilth}', '${tilthStartDate}', '${selectedGround}')`)
      })

      db.transaction(tx => {
        tx.executeSql(`SELECT * FROM Tilth`,
        null,
        (txObj, resultSet) => {
          resultSet.rows._array.forEach((item) => {
            console.log("|");
            Object.keys(item).forEach((item1)=>{
              console.log(item1);
            });
            console.log("|");
          })
        },
        (txObj, error) => {
          console.log("erro:" + error);
        })
      })
    }

  }, [isSubmitting])

  const submit = () => {
    setIsSubmitting(!isSubmitting)
  }

  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
  }

  const onChange = ({type}, selectedDate) => {
    if(type === "set"){
      const currentDate = selectedDate
      setDate(currentDate)

      if(Platform.OS === "android"){
        toggleDatePicker();
        setTilthStartDate(formatDate(currentDate))
      }
    }
    else {
      toggleDatePicker()
    }
  }

  const formatDate = (rawDate) => {
    date = new Date(rawDate)

    year = date.getFullYear()
    month = date.getMonth() + 1
    day = date.getDate()

    return `${day}-${month}-${year}`
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
              data={data.tilthData}
              setSelected={(val) => setSelectedTilth(val.key)}
              save="value"
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
              setSelected={(val) => setSelectedGround(val.key)}
              save="value"
            />
          </View>
          <View className='mt-3'>
            <View className='h-fit w-fit'>
              <Text className='text-lg'>Data do plantío</Text>
            </View>
            <View className='border-[1px] border-gray-600 h-fit w-fit rounded-lg'>
              {showPicker && (
                <DateTimePickerAndroid
                  mode="date"
                  display='spinner'
                  value={date}
                  onChange={onChange}
                  minimumDate={new Date('2011-1-1')}
                />
              )}
              <View className='m-1'>
                <Pressable className='w-full' onPress={toggleDatePicker}>
                  <TextInput
                    className='w-full'
                    placeholder={placeholderInputTextDate()}
                    value={tilthStartDate}
                    onChangeText={setTilthStartDate}
                    editable={false}
                    textAlign='center'
                  />
              </Pressable>
              </View>
            </View>
            <View>
              <Button title='Cadastrar' onPress={submit}/>
            </View>
          </View>
        </View>
    </View>
  )
}

export default AddCulture