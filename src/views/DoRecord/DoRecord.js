import React from 'react'
import { View, Text, Button } from 'react-native'

const DoRecord = (props) => {
  const { navigation } = props
  console.log(6, props)
  return (
    <View>
      <Text>DoRecord</Text>
      <Button
        title='打开Drawer'
        onPress={() => navigation.openDrawer('DoRecordDrawer')}
      />
    </View>
  )
}

export default DoRecord
