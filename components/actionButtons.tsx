import { Colors } from '@/constants/Colors'
import { Link } from 'expo-router'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
const logo = require('@/assets/images/pic.png')

export default function ActionButtons() {
  return (
    <View style={styles.buttonsWrap}>
      <Pressable style={[styles.icon, styles.shadow]}>
        <Link href={'/addProduct'}>
          <Text style={styles.addButton}>+</Text>
        </Link>
      </Pressable>
      <Pressable style={[styles.icon, styles.shadow]}>
        <Link style={styles.link2} href="/findwords">
          <Feather name="camera" size={35} color="black" />
        </Link>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: '#f2ce79',
    borderRadius: 35,
    height: 70,
    width: 70,
    paddingBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link2: {
    paddingTop: 0,
  },
  icon2: {
    backgroundColor: '#f2ce79',
    borderRadius: 35,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  shadow: {
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#353535',
    shadowRadius: 10,
    elevation: 20,
  },
  image: {
    width: 30,
    height: 30,
    margin: 0,
  },
  buttonsWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    flexGrow: 0,
    marginTop: 70,
    marginBottom: 50,
    columnGap: 50,
  },
  addButton: {
    fontSize: 50,
    fontWeight: 'bold',
  },
})
