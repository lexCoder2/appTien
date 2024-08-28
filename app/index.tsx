import { StyleSheet, Text, View } from 'react-native'
import ActionButtons from '@/components/actionButtons'
import { ProductList } from '@/components/products'
import { useEffect, useState } from 'react'
import { apiGet } from '@/services/products.service'
import { ProductType } from '@/components/productItem'

export default function Index() {
  const [list, setList] = useState<ProductType[]>([])
  const [listFiltered, setListFiltered] = useState<ProductType[]>([])
  useEffect(() => {
    apiGet('/products').then((l) => {
      setList(l)
      setListFiltered(l)
    })
  }, [])
  let debounce: NodeJS.Timeout
  const filterText = (text: string) => {
    if (debounce) clearTimeout(debounce)
    setListFiltered(list)
    if (!text) return
    debounce = setTimeout(() => {
      const results = list.filter((el) => {
        return el.description
          .toLocaleLowerCase()
          .includes(text.toLocaleLowerCase())
      })
      setListFiltered(results)
    }, 700)
  }

  return (
    <View style={styles.container}>
      <ActionButtons />
      <View style={{ width: '100%', flex: 1, flexGrow: 1 }}>
        <Text>{list.length}</Text>
        <ProductList filter={filterText} products={listFiltered} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
})
