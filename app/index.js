import { Text, View, Button, Image } from 'react-native';
import Weather from '../components/weather/weather';
import TilthComponent from '../components/tilth/tilth';
import CButton from '../components/custom-btn/CButton';
import ExcelExportBtn from '../components/excel-export/ExcelExportBtn';

const Home = () => {
  return (
    <View className='h-full pt-10'>
      <View className="items-center bg-white h-full">
        <Text className="text-3xl">AgroAPP</Text>
        <Weather/>
        <TilthComponent/>
        <CButton/>
      </View>
    </View>
  );
}

export default Home