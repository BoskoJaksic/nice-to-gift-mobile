export interface MapMarkerModel{
  title: string,
  snippet: string,
  iconUrl: 'assets/icon/marker.png',
  iconSize: {
    width: 35,
    height: 35
  },
  coordinate: {
    lat: number,
    lng: number
  }
}

