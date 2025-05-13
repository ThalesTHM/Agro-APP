import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native'
import AddNewTilth from './AddNewTilth'
import Tilth from '../../services/sqlite/Tilth.js'
import TilthList from './TilthList.js'
import { useNavigation } from 'expo-router'

const TilthComponent = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [haveTilth, setHaveTilth] = useState(false)
    const [tilthData, setTilthData] = useState([])

    const navigation = useNavigation();

    useEffect(()=>{
        Tilth.all()
            .then((tilthList)=>{
                setIsLoaded(true)

                if(tilthList.length > 0){
                    setTilthData(tilthList)
                    setHaveTilth(true)
                } else {
                    setHaveTilth(false)
                }
            })
            .catch(error => {
                console.log(error);
                setHaveTilth(false)
                setIsLoaded(true)
            })
    }, [])

    useEffect(() => {
      navigation.addListener('focus', () => {
        Tilth.all()
            .then((tilthList)=>{
                setIsLoaded(true)

                if(tilthList.length > 0){
                    setTilthData(tilthList)
                    setHaveTilth(true)
                } else {
                    setHaveTilth(false)
                }
            })
            .catch(error => {
                console.log(error);
                setHaveTilth(false)
                setIsLoaded(true)
            })
      });
    }, [navigation]);


    if(!isLoaded){
        return(
        <View className='w-[70vw] h-1/3 pt-5'>
            <View className='border-4 border-navyblue rounded w-full h-full justify-center'>
                <ActivityIndicator size="large"/>
            </View>
        </View>
        )
    }

    return(
        (haveTilth) ? (
            <View className='h-3/5 w-4/5'>
                <View className='h-full'>
                    <TilthList data={tilthData}/>
                </View>
            </View>
        ) : (
            <View className='w-fit h-fit'>
                <AddNewTilth/>
            </View>
        )
    )
}

export default TilthComponent