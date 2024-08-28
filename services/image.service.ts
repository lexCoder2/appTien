import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from './products.service';
import { AnalizeResType } from '@/types/analizeRes.type';


export function
  analizeImage(image: any) {

  return fetch(baseUrl + '/image', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, *.*',
      'Content-Type': 'multipart/form-data'
    },
    body: createFormData(image)
  }).then(res => res.json())
    .then(response => response.response.returnData)
    .then(async ({ words }) => {
      const w = JSON.stringify({ words })
      let r
      try {

        r = await AsyncStorage.setItem('items', w)
      } catch (e) {
        console.log('error here')
      }
      return r
    }).catch(e =>
      console.log('error', e)
    )
}


const createFormData = (photo: any) => {
  const data = new FormData();
  const ph = {
    ...photo,
    type: 'image/jpeg',
    name: 'photoname.jpg'
  }
  data.append("photo", ph, "photoname.jpg");

  return data;
};