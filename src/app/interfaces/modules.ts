export interface Module {
  id:number;
  active?: boolean;
  city: string;
  created_at?: Date;
  created_by?: string;
  exterior_number: string;
  interior_number: string;
  latitude: string;
  longitude: string;
  municipality_id: number;
  name: string;
  postal_code:string;
  settlement_id: number;
  status_id: number;
  street: string;
  updated_at?: Date;
  updated_by?: string;
}
