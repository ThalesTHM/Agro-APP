import { router } from 'expo-router';
import { Text, View, Button, TouchableOpacity } from 'react-native';

export default function OtherQueries() {
  return (
    <View className='h-full w-full justify-center items-center bg-lightblue'>
        <View className='h-1/4 w-full flex flex-row items-center justify-center'>
        <TouchableOpacity 
            onPress={()=>router.navigate('conforto-termico-bovino-form')}
            className='h-full w-2/5 ml-3 mr-3 justify-center items-center'
        >
            <View className='h-full w-full border-2 border-navyblue justify-center items-center rounded-lg m-5 bg-lighterblue'>
                <View className='justify-center items-center absolute top-0 h-2/4'>
                    <Text className='text-5xl font-bold'>
                        CTB
                    </Text>
                </View>
                <View className='bg-black w-4/5 h-0.5'>
                    <Text>                                                 </Text>
                </View>
                <View className='h-1/3 absolute bottom-0'>
                    <Text className='text-base text-center'>
                        Conforto Térmico Bovino
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={()=>router.navigate('dams-form')}
            className='h-full w-2/5 ml-3 mr-3 justify-center items-center'
        >
        <View className='h-full w-full border-2 border-navyblue justify-center items-center rounded-lg m-5 bg-lighterblue'>
            <View className='justify-center items-center absolute top-0 h-2/4'>
                <Text className='text-5xl font-bold'>
                    DAMS
                </Text>
            </View>
            <View className='bg-black w-4/5 h-0.5'>
                <Text>                                                 </Text>
            </View>
            <View className='h-1/3 absolute bottom-0'>
                <Text className='text-base text-center'>
                    Dias Aptos de Manejo de Solo
                </Text>
            </View>
        </View>
        </TouchableOpacity>
        </View>
        <View className='h-1/4 w-full flex flex-row items-center justify-center mt-5'>
        <TouchableOpacity 
            onPress={()=>router.navigate('bhs-form')}
            className='h-full w-2/5 ml-3 mr-3 justify-center items-center'
        >
        <View className='h-full w-full border-2 border-navyblue justify-center items-center rounded-lg m-5 bg-lighterblue'>
            <View className='justify-center items-center absolute top-0 h-2/4'>
                <Text className='text-5xl font-bold'>
                    BHS
                </Text>
            </View>
            <View className='bg-black w-4/5 h-0.5'>
                <Text>                                                 </Text>
            </View>
            <View className='h-1/3 absolute bottom-0'>
                <Text className='text-base text-center'>
                    Balanço Hídrico Sequencial
                </Text>
            </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={()=>router.navigate('bhcdm-form')}
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
                    Balanço Hídrico Climatológico
                </Text>
            </View>
        </View>
        </TouchableOpacity>
        </View>
    </View>
  );
}