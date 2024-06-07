import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { RadioGroup } from 'react-native-radio-buttons-group';

const DamsForm = () => {
  const [showInput, setShowInput] = useState(true)
  
  const [selectedRadioBtnTipoProbabilidade, setSelectedRadioBtnTipoProbabilidade] = useState('0')
  const [selectedRadioBtnTipoPraticaAgricola, setSelectedRadioBtnTipoPraticaAgricola] = useState('1')

  const [selectedStartDate, setSelectedStartDate] = useState('')
  
  const consultar = () => {
    if(selectedStartDate == '' && selectedRadioBtnTipoProbabilidade == 0){
        alert('Selecione uma data')
        return
    }

    router.navigate({
        pathname: 'dams-result', 
        params:{
            startDate: selectedStartDate == '' ? 'Selecione' : selectedStartDate,
            praticaAgricola: selectedRadioBtnTipoPraticaAgricola,
            probabilidade: selectedRadioBtnTipoProbabilidade
        }
    })
  }

  useEffect(()=>{
    setSelectedStartDate('')
  }, [selectedRadioBtnTipoProbabilidade])

  const generateDecennialDateData = () => {
    let decennialDateData = []
    let selectListData = []

    for (let i = 1; i <= 12; i++) {
        for (let j = 1; j <= 3; j++) {
            decennialDateData.push(
                `0${j}/` +
                (i < 10 ? "0"+ i : i)
            )            
        }
    }

    for (let i = 0; i < decennialDateData.length; i++) {
        selectListData.push(
            {
                key: i,
                value: decennialDateData[i]
            }
        )
    }

    return selectListData
  }

  const radioButtonsTipoProbabilidade = [
    {
      id: '0',
      label: 'Decendial',
      value: '0'
    },
    {
      id: '1',
      label: 'Anual',
      value: '1'
    }
  ]

  const radioButtonsTipoPraticaAgricola = [
    {
      id: '1',
      label: 'Preparo do Solo',
      value: '1'
    },
    {
    id: '2',
    label: 'Semeadura',
    value: '2'
    },
    {
      id: '3',
      label: 'Colheita',
      value: '1'
    },
  ]

  return (
    <View className='h-full w-full bg-lightblue items-center'>
        <View className='mt-10 w-2/3'>
            <View>
                <Text className='text-xl'>Probabilidade</Text>
            </View>
            <View className='border-2 rounded-lg border-navyblue items-center'>
                <RadioGroup
                    radioButtons={radioButtonsTipoProbabilidade}
                    onPress={setSelectedRadioBtnTipoProbabilidade}
                    selectedId={selectedRadioBtnTipoProbabilidade}
                    layout='row'
                />
            </View>
        </View>
        <View className='mt-3 w-2/3'>
            <View>
                <Text className='text-xl'>Pratica Agricula</Text>
            </View>
            <View className='border-2 rounded-lg border-navyblue items-center'>
                <RadioGroup
                    radioButtons={radioButtonsTipoPraticaAgricola}
                    onPress={setSelectedRadioBtnTipoPraticaAgricola}
                    selectedId={selectedRadioBtnTipoPraticaAgricola}
                    containerStyle={{alignItems:'flex-start'}}
                />
            </View>
        </View>
        {selectedRadioBtnTipoProbabilidade == 0 && (
            <View className='mt-3 w-2/3'>
                <View>
                    <Text className='text-xl'>Data Inicial</Text>
                </View>
                <View className='mt-2'>
                    <SelectList
                        placeholder='Selecione uma opção'
                        data={generateDecennialDateData()}
                        setSelected={(val) => setSelectedStartDate(val)}
                        search={false}
                        save="value"
                    />
                </View>
            </View>
        )}
        <View className='mt-5 w-1/2'>
            <Button title='Consultar' onPress={consultar}/>
        </View>
    </View>
  )
}

export default DamsForm