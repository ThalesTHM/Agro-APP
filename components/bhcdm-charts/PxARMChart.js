import { useEffect, useState } from "react"
import { ActivityIndicator, TextInput, View, Text } from "react-native"
import { Bar, CartesianChart, Line, useChartPressState } from "victory-native"

import inter from "../../assets/fonts/Inter-Medium.otf";
import { Circle, useFont } from "@shopify/react-native-skia";
import Animated, { SharedValue, useAnimatedProps } from "react-native-reanimated";

Animated.addWhitelistedNativeProps({ text: true })
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const BHCDMPxARMChart = ({data}) => {
    const font = useFont(inter, 9);

    const {state, isActive} = useChartPressState({x: 0, y: {valorArm: 0, valorP: 0}})
    
    const [loopUntilDataLoaded, setLoopUntilDataLoaded] = useState(true)
    
    const [showData, setShowData] = useState(false)

    const animatedText = useAnimatedProps(()=>{
        return{
            text: "P " + state.y.valorP.value.value.toFixed(2).toString() + " mm - ARM " + state.y.valorArm.value.value.toFixed(2).toString() + '%',
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
                style={{ fontSize: 30, fontWeight: 'bold', color: "#000" }}
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
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: "#000" }}>
                    P {data[0]['valorP'].toFixed(2)} mm - ARM {data[0]['valorArm'].toFixed(2)}%
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
                yKeys={["valorArm", "valorP"]}
                axisOptions={{ font:font, formatXLabel: (value) => '', formatYLabel: (value) => `${value}` }}
                domainPadding={{top:10, bottom: 0, right: 10, left: 10}}
                >
                    {({points, chartBounds}) => (
                        <>
                            <Bar
                                chartBounds={chartBounds}
                                points={points.valorP}
                                color="yellow"
                                barWidth={5}
                            />
                            <Line
                                strokeWidth={3}
                                points={points.valorArm}
                                chartBounds={chartBounds}
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

export default BHCDMPxARMChart