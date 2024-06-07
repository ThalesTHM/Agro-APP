import { useEffect, useState } from "react"
import { ActivityIndicator, TextInput, View, Text } from "react-native"
import { Bar, CartesianChart, Line, useChartPressState } from "victory-native"

import inter from "../../assets/fonts/Inter-Medium.otf";
import { Circle, useFont } from "@shopify/react-native-skia";
import Animated, { SharedValue, useAnimatedProps } from "react-native-reanimated";

Animated.addWhitelistedNativeProps({ text: true })
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const GdChart = ({data}) => {
    const font = useFont(inter, 9);

    const {state, isActive} = useChartPressState({x: '', y: {grausDiasAcumulado: 0}})
    
    const [loopUntilDataLoaded, setLoopUntilDataLoaded] = useState(true)
    
    const [showData, setShowData] = useState(false)

    const animatedText = useAnimatedProps(()=>{
        return{
            text: state.y.grausDiasAcumulado.value.value.toFixed(2) + " °C",
            defaultValue: ""
        }
    })
    const animatedDateText = useAnimatedProps(()=>{
        return{
            text: state.x.value.value,
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
                    {data[0]['grausDiasAcumulado'].toFixed(2)} °C
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
                yKeys={["grausDiasAcumulado"]}
                axisOptions={{ font:font, formatXLabel: (value) => '', formatYLabel: (value) => `${value}` }}
                domainPadding={{left:50, right:50}}
                
                >
                    {({points, chartBounds}) => (
                        <>
                        <Line
                            strokeWidth={3}
                            points={points.grausDiasAcumulado}
                            color="red"
                            animate={{ type: "timing", duration: 300 }}
                        />
                        {isActive && (
                            <ToolTip x={state.x.position} y={state.y.grausDiasAcumulado.position}/>
                        )}
                        </>
                    )
                    }
                </CartesianChart>
            </View>
        </View>
    )
}

export default GdChart