import { useEffect, useState } from "react"
import { ActivityIndicator, TextInput, View, Text } from "react-native"
import { Bar, CartesianChart, Line, useChartPressState } from "victory-native"

import inter from "../../assets/fonts/Inter-Medium.otf";
import { Circle, useFont } from "@shopify/react-native-skia";
import Animated, { SharedValue, useAnimatedProps } from "react-native-reanimated";

Animated.addWhitelistedNativeProps({ text: true })
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const BHCITChart = ({data}) => {
    const font = useFont(inter, 9);

    const {state, isActive} = useChartPressState({x: 0, y: {temperaturaMaxima: 0, temperaturaMedia: 0, temperaturaMinima: 0}})
    
    const [loopUntilDataLoaded, setLoopUntilDataLoaded] = useState(true)
    
    const [showData, setShowData] = useState(false)

    const animatedText = useAnimatedProps(()=>{
        return{
            text: "T. máxima " + state.y.temperaturaMaxima.value.value.toFixed(2).toString() + " °C - " + "T. média " + state.y.temperaturaMedia.value.value.toFixed(2).toString() + " °C - " + "T. mínima " + state.y.temperaturaMinima.value.value.toFixed(2).toString() + " °C",
            defaultValue: ""
        }
    })
    const animatedDateText = useAnimatedProps(()=>{
        return{
            text: state.x.value.value.toString(),
            defaultValue: ""
        }
    })

    function ToolTip({ x, y }) {
        return (
        <Circle cx={x} cy={y} r={8} color="black" />
        )
      }

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
                style={{ fontSize: 14, fontWeight: 'bold', color: "#000" }}
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
            <View style={{height: 100}} className='w-full'>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: "#000" }}>
                    T. máxima {data[0]['temperaturaMaxima'].toFixed(2)} °C - T. média {data[0]['temperaturaMedia'].toFixed(2)} °C - T. mínima {data[0]['temperaturaMinima'].toFixed(2)} °C
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
                yKeys={["temperaturaMaxima", "temperaturaMedia", "temperaturaMinima"]}
                axisOptions={{ font:font, formatXLabel: (value) => '', formatYLabel: (value) => `${value}` }}
                >
                    {({points, chartBounds}) => (
                        <>
                            <Line
                                strokeWidth={3}
                                points={points.temperaturaMaxima}
                                color="red"
                                animate={{ type: "timing", duration: 300 }}
                            />
                            <Line
                                strokeWidth={3}
                                points={points.temperaturaMedia}
                                color="green"
                                animate={{ type: "timing", duration: 300 }}
                            />
                            <Line
                                strokeWidth={3}
                                points={points.temperaturaMinima}
                                color="blue"
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

export default BHCITChart