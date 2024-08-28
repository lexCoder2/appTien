

export const baseUrl = 'http://192.168.6.178:3000'
// export const baseUrl = 'http://127.0.0.1:3000'
export function apiGet(url: string) {
  console.log(baseUrl, url);

  return fetch(baseUrl + url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      return error;
    });
}

export function apiPost<T>(url: string, body: T) {
  console.log(baseUrl + url)
  return fetch(baseUrl + url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then((data) => {
      return data
    })
}
export const saveProduct = (Product: any) => {
  return apiPost<any>('/products', Product)
}

