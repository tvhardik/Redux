import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ReduxApp from './src/App'

interface AppProps {
  }
  
 const App: React.FC<AppProps> = () => {

  return (
    <View>
    <ReduxApp/>
    </View>
  )
}

export default App
