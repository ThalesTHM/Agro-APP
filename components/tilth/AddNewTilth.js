import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Slot, Stack, Link, router } from 'expo-router'
import icons from '../../constants/icons'

const AddNewTilth = () => {
  return (
    <View className='w-[70vw] h-3/5 mt-5 bg-lighterblue'>
        <View className='h-2/5 w-2/5 border-4 border-navyblue rounded w-full h-full justify-center items-center'>
          <View className='h-1/3 w-1/3 border-teal-500 border-[4px] rounded-full justify-center items-center bg-lighterblue'>
            <TouchableOpacity onPress={()=>router.navigate('add-tilth')} className='h-full w-full justify-center items-center'>
              <View className="h-4/5 w-4/5 justify-center items-center ">
                <Image
                  source={icons.add}
                  className="aspect-square h-full w-full"
                />
              </View>
            </TouchableOpacity>
            </View>
          <View className='h-fit w-fit'>
            <Text className='text-lg'>Adicionar cultura</Text>
          </View>
        </View>
    </View>
  )
}

export default AddNewTilth