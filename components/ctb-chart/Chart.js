import { useEffect, useState } from "react"
import { ActivityIndicator, TextInput, View, Text } from "react-native"
import { Bar, CartesianChart, Line, useChartPressState } from "victory-native"

import inter from "../../assets/fonts/Inter-Medium.otf";
import { Circle, useFont } from "@shopify/react-native-skia";
import Animated, { SharedValue, useAnimatedProps } from "react-native-reanimated";

Animated.addWhitelistedNativeProps({ text: true })
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const CtbChart = ({data}) => {
    const font = useFont(inter, 9);

    const {state, isActive} = useChartPressState({x: '', y: {valor: 0}})
    
    const [loopUntilDataLoaded, setLoopUntilDataLoaded] = useState(true)
    
    const [showData, setShowData] = useState(false)

    const getTermicStatus = (degrees) => {
        let termicStatus = ""

        if(degrees >= 72 && degrees <= 76) termicStatus = "Atenção"
        else if (degrees >= 75 && degrees <= 79) termicStatus = "Alerta"
        else if (degrees > 79) termicStatus = "Perigo"
        else termicStatus = "Normal"

        return termicStatus
    }

    const animatedText = useAnimatedProps(()=>{

        let termicStatus = ""

        if(state.y.valor.value.value >= 72 && state.y.valor.value.value <= 76) termicStatus = "Atenção"
        else if (state.y.valor.value.value >= 75 && state.y.valor.value.value <= 79) termicStatus = "Alerta"
        else if (state.y.valor.value.value > 79) termicStatus = "Perigo"
        else termicStatus = "Normal"

        return{
            text: state.y.valor.value.value.toFixed(2) + ' - ' + termicStatus,
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
        <Circle cx={x} cy={y} r={8} color='red' />
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
            <Animated.View style={{height: 100}}>
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
            </Animated.View>
            )}

            {!isActive && (
            <View style={{height: 100}}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: "#000" }}>
                    {data[0]['valor'].toFixed(2) + " - " + getTermicStatus(data[0]['valor'])}
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
                yKeys={["valor", "valorPerigo", "valorAlerta", "valorAtencao"]}
                axisOptions={{ font:font, formatXLabel: (value) => '', formatYLabel: (value) => `${value}` }}
                domainPadding={{left:10, right:10}}
                
                >
                    {({points, chartBounds}) => (
                        <>
                        <Line
                            strokeWidth={3}
                            points={points.valor}
                            color="black"
                            animate={{ type: "timing", duration: 300 }}
                        />
                        <Line
                            strokeWidth={2}
                            points={points.valorPerigo}
                            color="red"
                            animate={{ type: "timing", duration: 300 }}
                        />
                        <Line
                            strokeWidth={2}
                            points={points.valorAlerta}
                            color="orange"
                            animate={{ type: "timing", duration: 300 }}
                        />
                        <Line
                            strokeWidth={2}
                            points={points.valorAtencao}
                            color="yellow"
                            animate={{ type: "timing", duration: 300 }}
                        />
                        {isActive && (
                            <ToolTip x={state.x.position} y={state.y.valor.position}/>
                        )}
                        </>
                    )
                    }
                </CartesianChart>
            </View>
        </View>
    )
}

export default CtbChart