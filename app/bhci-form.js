import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import WeatherIcon from '../components/weather/weather-icons';
import icons from '../constants/icons';
import Weather from '../components/weather/weather';
import TilthComponent from '../components/tilth/tilth';
import { useState } from 'react';
import { RadioGroup } from 'react-native-radio-buttons-group';

export default function Bhci() {
  const params = useLocalSearchParams()
  const key = params.key

  const [laminaAgua, setLaminaAgua] = useState('')
  const [laminaAguaCleaner, setLaminaAguaCleaner] = useState('')

  const [selectedRadioBtnTipoLamina, setSelectedRadioBtnTipoLamina] = useState('0')

  const [selectedRadioBtnHouveIrrigacao, setSelectedRadioBtnHouveIrrigacao] = useState('1')

  const radioButtonsTipoLamina = [
    {
      id: '0',
      label: 'Variável',
      value: '0'
    },
    {
      id: '1',
      label: 'Fixa',
      value: '1'
    }
  ]

  const radioButtonsHouveIrrigacao = [
    {
      id: '1',
      label: 'Sim',
      value: '1'
    },
    {
      id: '0',
      label: 'Não',
      value: '0'
    }
  ]

  const consultar = () => {
    if(laminaAgua == ''){
      alert('Insira a quantidade de água no campo lâmina de água')
      return
    }

    router.navigate({pathname:'bhci-result', params:{
      laminaAgua: laminaAgua,
      tipoLamina: selectedRadioBtnTipoLamina,
      houveIrrigacao: selectedRadioBtnHouveIrrigacao,
      key: key
    }})
  }

  return (
    <View className='h-full w-full bg-lightblue items-center'>
        <View className='mt-10'>
          <View className='h-fit w-fit'>
            <Text className='text-lg'>Lâmina de água</Text>
          </View>
          <View className='w-72 h-12 rounded-lg border-2 border-navyblue'>
            <TextInput 
              onChangeText={(text) => {
                setLaminaAguaCleaner(text.replace(/[^0-9]/g, ''))
                setLaminaAgua(text)
              }}
              keyboardType='numeric'
              className='w-full h-full'
              textAlign='center'
              value={laminaAguaCleaner}
              placeholder='Quantidade da lâmina de água em MM'
            />
          </View>
        </View>
        <View className='mt-5'>
          <View className='h-fit w-fit'>
            <Text className='text-lg'>Tipo da lamina</Text>
          </View>
          <View className='border-2 border-navyblue rounded-lg'>
          <RadioGroup
              radioButtons={radioButtonsTipoLamina}
              onPress={setSelectedRadioBtnTipoLamina}
              selectedId={selectedRadioBtnTipoLamina}
              layout='row'
            />
          </View>
        </View>
        <View className='mt-5'>
          <View className='h-fit w-fit'>
            <Text className='text-lg'>Houve irrigação</Text>
          </View>
          <View className='border-2 border-navyblue rounded-lg'>
          <RadioGroup
              radioButtons={radioButtonsHouveIrrigacao}
              onPress={setSelectedRadioBtnHouveIrrigacao}
              selectedId={selectedRadioBtnHouveIrrigacao}
              layout='row'
            />
          </View>
          <View className='mt-5'>
            <Button 
              title='Consultar'
              onPress={consultar}
            />
          </View>
        </View>
    </View>
  );
}