export interface ShopModel {
  "id": string,
  "name": string,
  "phoneNumber": string,
  "address": string,
  "averageRating": number,
  "shopImg":string,
  "workingHours": [
    {
      "day": number,
      "openingTime": string,
      "closingTime": string
    }
  ]
}
