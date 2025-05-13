import { Text, View, ActivityIndicator, TouchableOpacity, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react'

import { router, useLocalSearchParams, useNavigation } from 'expo-router'

import data from '../constants/data.js'
import Tilth from '../services/sqlite/Tilth.js';
import icons from '../constants/icons.js';

export default function tilthQuery() {
  const navigation = useNavigation()

  const [isLoaded, setisLoaded] = useState(false)
  const [tilthType, setTilthType] = useState('')

  const params = useLocalSearchParams()
  const key = params.key

  useEffect(()=>{
    if(isLoaded) return

    Tilth.find(key)
        .then((item) => {
            data.tilthData.forEach(i => {
                if(i.key == item.tilth_type){
                    setTilthType(i.value)
                }
            });

            setisLoaded(true)
        }).catch((error) => {
            console.warn(error);
        })
  }, [isLoaded])

  const showAlert = () => {
    Alert.alert(
        'Tem certeza?', 
        `Tem certeza que deseja apagar a cultura ${tilthType}?`,
        [
            {
                text: 'Sim',
                onPress: () => {
                    Tilth.remove(key)
                        .then(()=>{
                            alert(`Cultura ${tilthType} apagada com sucesso!`)

                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'index' }],
                              });
                        })
                        .catch((error)=>{
                            alert(error)
                        })
                }
            },
            {
                text: 'Não'
            }
        ],
        {
            cancelable: true
        }
    )
  }

  if(!isLoaded){
    return(
        <View className='h-full w-full bg-lightblue'>
            <ActivityIndicator size="large"/>
        </View>
    )
  }

  return (
    <View className='h-full w-full bg-lightblue'>
        <View className='mt-10 h-full w-full items-center'>
        <View className='mb-10'>
            <Text className='text-4xl font-bold text-center'>Consulta da cultura: {tilthType}</Text>
        </View>
        <View className='h-1/5 w-full flex flex-row items-center justify-center'>
        <TouchableOpacity 
            onPress={()=>router.navigate({pathname:'bhc-result', params:{key:key}})}
            className='h-full w-2/5 ml-3 mr-3 justify-center items-center'
        >
            <View className='h-full w-full border-2 border-navyblue justify-center items-center rounded-lg m-5 bg-lighterblue'>
                <View className='justify-center items-center absolute top-0 h-2/4'>
                    <Text className='text-5xl font-bold'>
                        BHC
                    </Text>
                </View>
                <View className='bg-black w-4/5 h-0.5'>
                    <Text>                                                 </Text>
                </View>
                <View className='h-1/3 absolute bottom-0'>
                    <Text className='text-base text-center'>
                        Balanço Hídrico de Cultivo
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={()=>router.navigate({pathname:'bhci-form', params:{key:key}})}
            className='h-full w-2/5 ml-3 mr-3 justify-center items-center'
        >
        <View className='h-full w-full border-2 border-navyblue justify-center items-center rounded-lg m-5 bg-lighterblue'>
            <View className='justify-center items-center absolute top-0 h-2/4'>
                <Text className='text-5xl font-bold'>
                    BHCI
                </Text>
            </View>
            <View className='bg-black w-4/5 h-0.5'>
                <Text>                                                 </Text>
            </View>
            <View className='h-1/3 absolute bottom-0'>
                <Text className='text-base text-center'>
                    Balanço Hídrico de Cultivo Irrigado
                </Text>
            </View>
        </View>
        </TouchableOpacity>
        </View>
        <View className='h-1/5 w-full justify-center flex flex-row mt-2'>
        <TouchableOpacity 
            onPress={()=>router.navigate({pathname:'gd-result', params:{key:key}})}
            className='h-full w-2/5 m-3 justify-center items-center'
        >
            <View className='w-full h-full border-2 border-navyblue justify-center items-center rounded-lg m-5 bg-lighterblue'>
                <View className='justify-center items-center absolute top-0 h-2/4'>
                    <Text className='text-5xl font-bold'>
                        GD
                    </Text>
                </View>
                <View className='bg-black w-4/5 h-0.5'>
                    <Text>                                                 </Text>
                </View>
                <View className='h-1/3 absolute bottom-0'>
                    <Text className='text-base text-center'>
                        Graus Dia
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={showAlert}
            className='h-full w-2/5 m-3 justify-center items-center'
        >
            <View className='w-full h-full border-2 border-navyblue justify-center items-center rounded-lg m-5 bg-lighterblue'>
                <View className='justify-center items-center absolute top-0 h-2/4'>
                    <Image
                    source={icons.trash}
                    />
                </View>
                <View className='bg-black w-4/5 h-0.5'>
                    <Text>                                                 </Text>
                </View>
                <View className='h-1/3 absolute bottom-0'>
                    <Text className='text-base text-center'>
                        Excluir a cultura
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
        </View>
        <View className='h-1/5 w-full justify-center flex flex-row mt-4'>
        <TouchableOpacity 
            onPress={()=>router.navigate({pathname:'edit-tilth', params:{key: key}})}
            className='h-full w-2/5 m-3 justify-center items-center'
        >
            <View className='w-full h-full border-2 border-navyblue justify-center items-center rounded-lg m-5 bg-lighterblue'>
                <View className='justify-center items-center absolute top-0 h-2/4'>
                    <Image
                    source={icons.edit}
                    />
                </View>
                <View className='bg-black w-4/5 h-0.5'>
                    <Text>                                                 </Text>
                </View>
                <View className='h-1/3 absolute bottom-0'>
                    <Text className='text-base text-center'>
                        Editar a cultura
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
        </View>
        </View>
    </View>
  );
}
