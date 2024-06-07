import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { RadioGroup } from 'react-native-radio-buttons-group';

const BHCDMForm = () => {
  const [selectedRadioBtnDateType, setSelectedRadioBtnDateType] = useState('0')
  
  const consultar = () => {
    router.navigate({
        pathname: 'bhcdm-result', 
        params:{
            dateType: selectedRadioBtnDateType
        }
    })
  }

  const radioButtonsDateType = [
    {
      id: '0',
      label: 'Decendial',
      value: '0'
    },
    {
      id: '1',
      label: 'Mensal',
      value: '1'
    }
  ]

  return (
    <View className='h-full w-full bg-lightblue items-center'>
        <View className='mt-10 w-2/3'>
            <View>
                <Text className='text-xl'>Tipo de data</Text>
            </View>
            <View className='border-2 rounded-lg border-navyblue items-center'>
                <RadioGroup
                    radioButtons={radioButtonsDateType}
                    onPress={setSelectedRadioBtnDateType}
                    selectedId={selectedRadioBtnDateType}
                    layout='row'
                />
            </View>
        </View>
        <View className='mt-5 w-1/2'>
            <Button title='Consultar' onPress={consultar}/>
        </View>
    </View>
  )
}

export default BHCDMForm