import { StyleSheet, Text, View } from 'react-native'
export type ProductType = {
  id?: string
  code: string
  description: string
  price: number
  stock: number
  sellPrice: number
  cost: number
  category: string
  image?: string
  active: boolean
  createdAt?: string
  updatedAt?: string
}

export function ProductItem({ product }: { product: ProductType }) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.description}>
        <Text style={styles.text1}>{product.description}</Text>
      </View>
      <View>
        <Text style={styles.text2}>$ {product.cost}</Text>
      </View>
      <View>
        <Text style={[styles.text2]}>$ {product.sellPrice}</Text>
      </View>
      <View></View>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'space-around',
    backgroundColor: '#f5ebea',
    width: '98%',
    flexDirection: 'row',
    columnGap: 30,
    marginBottom: 5,
    shadowColor: '#7a7a7a',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  description: {
    flexGrow: 1,
    height: 60,
  },
  text1: {
    fontSize: 18,
  },
  text2: {
    width: 50,
    textAlign: 'right',
  },
})
