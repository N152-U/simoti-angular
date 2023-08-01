export interface Facility {
  id:number;
  active: boolean;
  city: string;
  created_at: Date;
  created_by: string;
  exterior_number: string;
  facility_type_id: number;
  interior_number: string;
  latitude: string;
  longitude: string;
  module_id: number;
  municipality_id: number;
  name: string;
  number_tanks: number;
  postal_code:string;
  settlement_id: number;
  status_id: number;
  street: string;
  tank_capacity_id: number;
  updated_at: Date;
  updated_by: string;
  facilityType: string,
  type: string
  icon_url: string
}
