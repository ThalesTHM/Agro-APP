import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Button } from 'react-native'
import { Slot, Stack, Link, router } from 'expo-router'
import icons from '../../constants/icons'
import { SelectList } from 'react-native-dropdown-select-list'
import * as constantData from '../../constants/data'

const TilthList = ({data}) => {
  return (
    <View className='w-full h-full border-navyblue rounded-lg border-4 mt-5'>
        <View className='w-fit h-fit m-5 bg-lighterblue border-2 border-navyblue rounded-lg'>
            <View className='h-fit w-full mb-2 items-center'>
                <Text className='text-lg'>Selecione a cultura plantada</Text>
            </View>
            <View className='h-fit w-fit m-2'>
                <SelectList
                    data={data.map((item)=>{
                        tilthName = constantData.default.tilthData.find(i => i.key == item.tilth_type).value
                        groundName = constantData.default.groundData.find(i => i.key == item.ground_type).value

                        return {
                            key: item.id_tilth,
                            value: `${tilthName} | Data Plantio - ${item.tilth_start_date} | Solo - ${groundName}`
                        }
                    })}
                    save='key'
                    placeholder='Selecione uma opção'
                    notFoundText='Não foi encontrado essa cultura'
                    searchPlaceholder='pesquisar'
                    setSelected={(val)=>{
                        router.navigate({pathname:'tilth-query', params:{key: val}})
                    }}
                />
            </View>
        </View>
        <View className='w-full h-1/6 absolute bottom-0 bg-lightblue border-t-2 border-navyblue'>
            <TouchableOpacity className='w-full h-3/5 justify-center items-center' onPress={()=>router.navigate('add-tilth')}>
                <View className='w-full h-4/5 justify-center items-center'>
                    <View className="justify-center items-center w-4/5 h-4/5">
                        <Image
                        source={icons.add}
                        className="aspect-square h-full w-full"
                        />
                    </View>
                </View>
            </TouchableOpacity>
            <View className='h-4/5 w-full items-center'>
                <Text className='text-base'>
                    Adicionar cultura
                </Text>
            </View>
        </View>
    </View>
  )
}

export default TilthList