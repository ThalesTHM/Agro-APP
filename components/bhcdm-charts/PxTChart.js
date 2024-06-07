import { useEffect, useState } from "react"
import { ActivityIndicator, TextInput, View, Text } from "react-native"
import { Area, Bar, CartesianChart, Line, useAreaPath, useChartPressState } from "victory-native"

import inter from "../../assets/fonts/Inter-Medium.otf";
import { Circle, Path, Skia, useFont } from "@shopify/react-native-skia";
import Animated, { SharedValue, useAnimatedProps } from "react-native-reanimated";

Animated.addWhitelistedNativeProps({ text: true })
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const BHCDMPxTChart = ({data}) => {
    const font = useFont(inter, 9);

    const {state, isActive} = useChartPressState({x: 0, y: {valorT: 0, valorP: 0}})
    
    const [loopUntilDataLoaded, setLoopUntilDataLoaded] = useState(true)
    
    const [showData, setShowData] = useState(false)
    
    const animatedText = useAnimatedProps(()=>{
        return{
            text: "T " + state.y.valorT.value.value.toFixed(2).toString() + " °C - P " + state.y.valorP.value.value.toFixed(2).toString() + " mm",
            defaultValue: ""
        }
    })

    const animatedDateText = useAnimatedProps(()=>{
        return{
            text: state.x.value.value.toString(),
            defaultValue: ""
        }
    })

    useEffect(()=>{
        if(data.length == 0){
            setLoopUntilDataLoaded(!loopUntilDataLoaded)
            return
        } 

        setShowData(true)
        
    }, [loopUntilDataLoaded])

    if(!showData){
        return(
            <View>
                <ActivityIndicator/>
            </View>
        )
    }

    return (
        <View style={{height: 400}}>
            {isActive && (
            <View style={{height: 100}}>
                <AnimatedTextInput
                editable={false}
                underlineColorAndroid={"transparent"}
                style={{ fontSize: 26, fontWeight: 'bold', color: "#000" }}
                animatedProps={animatedText}
                />

                <AnimatedTextInput
                editable={false}
                underlineColorAndroid={"transparent"}
                animatedProps={animatedDateText}
                />
            </View>
            )}

            {!isActive && (
            <View style={{height: 100}}>
                <Text style={{ fontSize: 26, fontWeight: 'bold', color: "#000" }}>
                    T {data[0]['valorT'].toFixed(2)} °C - P {data[0]['valorP'].toFixed(2)} mm
                </Text>
                <Text>
                    {data[0]['data']}
                </Text>
            </View>
            )}

            <View style={{height:300}}>
                <CartesianChart
                data={data}
                chartPressState={[state]}
                xKey="data"
                yKeys={["valorT", "valorP"]}
                axisOptions={{ font:font, formatXLabel: (value) => '', formatYLabel: (value) => `${value}` }}
                >
                    {({points, chartBounds}) => (
                        <>
                            <Line
                                strokeWidth={2}
                                points={points.valorP}
                                color="blue"
                                animate={{ type: "timing", duration: 300 }}
                            />
                            <Line
                                strokeWidth={2}
                                points={points.valorT}
                                color="red"
                                animate={{ type: "timing", duration: 300 }}
                            />
                        </>
                    )
                    }
                </CartesianChart>
            </View>
        </View>
    )
}

export default BHCDMPxTChart