import { TextInput } from '@react-native-material/core'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { ProductItem } from './productItem'

export function ProductList({ products, filter }: any) {
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={{ marginHorizontal: 15 }}
        onChangeText={(e) => filter(e)}
        variant="outlined"
        label="buscar producto"
      />
      <View style={style.listHeader}>
        <Text style={{ flexGrow: 1 }}>Descripcion</Text>
        <Text style={{ width: 70 }}>Precio</Text>
        <Text style={{ width: 60 }}>Venta</Text>
      </View>
      <FlatList
        style={style.list}
        data={products}
        renderItem={({ item }) => (
          <ProductItem key={item.id} product={item}></ProductItem>
        )}
      ></FlatList>
    </View>
  )
}

const style = StyleSheet.create({
  list: {
    paddingHorizontal: 15,
    width: '100%',
    flexShrink: 1,
    flexGrow: 1,
  },

  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 8,
    height: 35,
    alignItems: 'flex-end',
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: 1,
  },
})
