import { useEffect, useState } from "react"
import { ActivityIndicator, TextInput, View, Text } from "react-native"
import { Area, Bar, CartesianChart, Line, useAreaPath, useChartPressState } from "victory-native"

import inter from "../../assets/fonts/Inter-Medium.otf";
import { Circle, Path, Skia, useFont } from "@shopify/react-native-skia";
import Animated, { SharedValue, useAnimatedProps } from "react-native-reanimated";

Animated.addWhitelistedNativeProps({ text: true })
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const BHCDMEFxEXCChart = ({data}) => {
    const font = useFont(inter, 9);

    const {state, isActive} = useChartPressState({x: 0, y: {valorDef: 0, valorExc: 0}})
    
    const [loopUntilDataLoaded, setLoopUntilDataLoaded] = useState(true)
    
    const [showData, setShowData] = useState(false)
    
    const animatedText = useAnimatedProps(()=>{
        return{
            text: "DEF " + state.y.valorDef.value.value.toFixed(2).toString() + " mm - EXC " + state.y.valorExc.value.value.toFixed(2).toString() + " mm",
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
                    DEF {data[0]['valorDef'].toFixed(2)} mm - EXC {data[0]['valorExc'].toFixed(2)} mm
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
                yKeys={["valorDef", "valorExc"]}
                axisOptions={{ font:font, formatXLabel: (value) => '', formatYLabel: (value) => `${value}` }}
                >
                    {({points, chartBounds}) => (
                        <>
                            <Line
                                strokeWidth={2}
                                points={points.valorExc}
                                color="blue"
                                animate={{ type: "timing", duration: 300 }}
                            />
                            <Line
                                strokeWidth={2}
                                points={points.valorDef}
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

export default BHCDMEFxEXCChart