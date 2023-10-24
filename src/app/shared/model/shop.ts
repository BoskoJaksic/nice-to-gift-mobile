
export interface Shop {
  id: String,
  name: String,
  phoneNumber: String,
  address: String,
  averageRating: number,
  workingHours: shopWorkingHours
}

interface shopWorkingHours {
  day: number,
  openingTime: String,
  closingTime: String
}
