export interface OrderModel {
  data: [
    {
      "id": string,
      "creationDate": string,
      "price": number,
      "currency": string,
      "shop": {
        "id": string,
        "name": string,
        "address": string,
        "imageUri": string
      },
      "sender": {
        "id": string,
        "name": string,
        "surname": string
      },
      "receiver": {
        "id": string,
        "name": string,
        "surname": string
      },
      "orderStatus": string,
      "itemsSummary": [string]
    }
  ]
}
