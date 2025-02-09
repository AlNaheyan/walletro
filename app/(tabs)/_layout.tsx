import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router';
import  icons  from '../../constants/icons';
import React from 'react'


interface TabIconProps {
  icon: any,
  color: string,
  name: string,
  focused: boolean,
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View>
      <Image 
        source={icon}
        tintColor={color}
        resizeMode='contain'
        className='w-5 h-5'
      />
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#2563eb',
        tabBarStyle: {
          backgroundColor: '#18181b',
          borderTopWidth: 1,
          borderTopColor: '#27272a',
          height: 46,
        }
      }} >
        <Tabs.Screen
          name='home' 
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({color, focused}) =>(
              <TabIcon 
                icon = {icons.home} 
                color = {color}
                name = "Home"
                focused = {focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='profile' 
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({color, focused}) =>(
              <TabIcon 
                icon = {icons.user} 
                color = {color}
                name = "Profile"
                focused = {focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout