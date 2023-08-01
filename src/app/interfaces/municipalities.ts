export interface Municipality {
  id: number;
  municipality: string;
  active: boolean;
  object: {
    coordinates: []
  }
}
