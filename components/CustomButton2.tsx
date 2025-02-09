import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface CustomButtonProp {
    title: string,
    handlePress: () => void,
    containerStyles: string,
    textStyles?: string,
    isLoading?: boolean
}

const CustomButton: React.FC<CustomButtonProp> = ( {title, handlePress, containerStyles, textStyles }) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className={`px-4 py-2 rounded-lg ${containerStyles}`}
        >
        <Text className={`text-lg font-semibold ${textStyles} `}>{title} </Text>
    </TouchableOpacity>
  )
}

export default CustomButton