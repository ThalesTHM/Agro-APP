import { Text, View, Button, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const CButton = () => {
  return (
    <View className='h-20 w-64 bg-lightblue border-2 border-navyblue mt-[10vw]'>
        <TouchableOpacity onPress={() => router.navigate('other-queries')}>
            <View className='h-full w-full justify-center items-center'>
                <Text className='text-5xl'>Consultas</Text>
            </View>
        </TouchableOpacity>
    </View>
  );
}

export default CButton