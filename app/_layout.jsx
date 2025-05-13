import { Image, StyleSheet, Text, View } from 'react-native'
import { Slot, Stack, router } from 'expo-router'
import { useNetInfo } from '@react-native-community/netinfo'
import icons from '../constants/icons'

const RootLayout = () => {
  const netInfo = useNetInfo()

  if(!(netInfo.isConnected)){
    return(
      <View className='h-full pt-10 bg-lightblue justify-center items-center'>
        <View className='w-full h-3/5 items-center'>
          <View>
            <Image
              source={icons.offline}
            />
          </View>
          <View className='mt-10 w-4/5'>
            <Text className='text-2xl font-bold'>O aplicativo necessita de internet para funcionar. Por favor utilize os dados móveis ou o wi-fi.</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="add-tilth" options={{title: 'Adicionar Cultura', headerTitleStyle:{fontSize:16}}}/>
      <Stack.Screen name="bhc-result" options={{title: 'Balanço Hídrico de Cultivo', headerTitleStyle:{fontSize:16}}}/>
      <Stack.Screen name="bhcdm-form" options={{title: 'Balanço Hídrico Climático', headerTitleStyle:{fontSize:16}}}/>
      <Stack.Screen name="bhcdm-result" options={{title: 'Balanço Hídrico Climático', headerTitleStyle:{fontSize:16}}}/>
      <Stack.Screen name="bhci-form" options={{title: 'Balanço Hídrico de Cultivo Irrigado', headerTitleStyle:{fontSize:16}}}/>
      <Stack.Screen name="bhci-result" options={{title: 'Balanço Hídrico de Cultivo Irrigado', headerTitleStyle:{fontSize:16}}}/>
      <Stack.Screen name="bhs-form" options={{title: 'Balanço Hídrico Sequencial', headerTitleStyle:{fontSize:16}}}/>
      <Stack.Screen name="bhs-result" options={{title: 'Balanço Hídrico Sequencial', headerTitleStyle:{fontSize:16}}}/>
      <Stack.Screen name="charts-hint" options={{title: 'Dica', headerTitleStyle:{fontSize:16}}}/>
      <Stack.Screen name="conforto-termico-bovino-form" options={{title: 'Conforto Térmico Bovino', headerTitleStyle:{fontSize:16}}}/>
      <Stack.Screen name="conforto-termico-bovino-result" options={{title: 'Conforto Térmico Bovino', headerTitleStyle:{fontSize:16}}}/>
      <Stack.Screen name="dams-chart-result" options={{title: 'Dias Aptos de Manejo de Solo', headerTitleStyle:{fontSize:16}}}/>
      <Stack.Screen name="dams-form" options={{title: 'Dias Aptos de Manejo de Solo', headerTitleStyle:{fontSize:16}}}/>
      <Stack.Screen name="dams-result" options={{title: 'Dias Aptos de Manejo de Solo', headerTitleStyle:{fontSize:16}}}/>
      <Stack.Screen name="edit-tilth" options={{title: 'Editar Cultura', headerTitleStyle:{fontSize:16}}}/>
      <Stack.Screen name="full-weather" options={{title: 'Previsão do Tempo Completa', headerTitleStyle:{fontSize:16}}}/>
      <Stack.Screen name="other-queries" options={{title: 'Consultas', headerTitleStyle:{fontSize:16}}}/>
      <Stack.Screen name="tilth-query" options={{title: 'Consultas da Cultura', headerTitleStyle:{fontSize:16}}}/>
      <Stack.Screen name="gd-result" options={{title: 'Graus Dia', headerTitleStyle:{fontSize:16}}}/>
    </Stack>
  )
}

export default RootLayout