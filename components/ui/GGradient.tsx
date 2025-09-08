import { LinearGradient } from 'expo-linear-gradient'
import React, { ReactNode } from 'react'
import { ColorValue } from 'react-native'

interface GLinearGradientProps {
  children: ReactNode
  colors?: readonly [ColorValue, ColorValue, ...ColorValue[]]
}

export default function GLinearGradient({ children, colors }: GLinearGradientProps) {
  return (
    <LinearGradient
      colors={colors ?? (['#1253AA', '#05243E'] as const)}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className='flex-1'
    >
      {children}
    </LinearGradient>
  )
}

