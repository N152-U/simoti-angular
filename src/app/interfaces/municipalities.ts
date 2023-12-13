export interface Municipality {
  id: number;
  municipality: string;
  active: boolean;
  geo_shape: {
    coordinates: [[]]
  }
}

export interface MunicipalityEdomex {
  id: number;
  municipality: string;
  active: boolean;
  geometry: {
    coordinates: [[]],
    type: string
  },
  properties:{

  }
}

