import React, { useRef, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert, Platform, Animated } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Lama from './components/Lama'

const TAMANHO_CIRCULO = 100

const Circulo = ({ onPress, animatedValue }) => {
  const animatedBackground = animatedValue.interpolate({
    inputRange: [0, 0.0001, 0.5, 0.5001, 1],
    outputRange: ['#E6B3E3', '#FCB8D6', '#F595F1', '#ECB8FC', '#E6B3E3']
  })
  const animatedText = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [20, 35, 20]
  })
  const animatedColor = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#C43D81', '#FC45D6', '#C43D81']
  })

  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, styles.containerCirculo, { backgroundColor: animatedBackground }]}>
      <Text style={styles.titulo}>Animações em React Native</Text>
      <Lama />

      <Animated.Text
        style={{
          fontSize: animatedText,
          margin: 10,
          fontWeight: 'bold',
          color: animatedColor
        }}
      >
        Origem da Lama
      </Animated.Text>

      <Animated.View style={[styles.circulo, {
        transform:
          [
            {
              rotateY: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: ['0deg', '-90deg', '-180deg']
              })
            },
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 5, 1]
              })
            },
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 50, 0]
              })
            }
          ]
      }]}>

        <TouchableOpacity onPress={onPress}>
          <View style={[styles.circulo]}>
            <AntDesign name="arrowright" size={28} color={"#C43D81"}></AntDesign>
          </View>
        </TouchableOpacity>

      </Animated.View>
    </Animated.View>
  )
}

export default function App() {
  const animatedValue = useRef(new Animated.Value(0)).current
  const [indice, setIndice] = useState(0)

  const animation = (toValue) => Animated.timing(animatedValue, {
    toValue: toValue,
    duration: 2000,
    useNativeDriver: false
  })

  const onPress = () => {
    setIndice(indice === 1 ? 0 : 1)
    animation(indice === 1 ? 0 : 1).start()
  }
  return (
    <View style={styles.container}>
      <Circulo onPress={onPress} animatedValue={animatedValue} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6B3E3",
    alignItems: 'center'
  },
  titulo: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#C43D81",
    paddingTop: 20
  },
  containerCirculo: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: TAMANHO_CIRCULO
  },
  circulo: {
    backgroundColor: "#E77ACC",
    width: TAMANHO_CIRCULO,
    height: TAMANHO_CIRCULO,
    borderRadius: TAMANHO_CIRCULO / 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})