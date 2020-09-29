export interface House {
  Immobile: Immobile;
}

export interface Apartment {
  Number: number;
  QtdDinerRooms: number;
  Floor: number;
  PriceCondominium: number;
  HasDoorman: boolean;
  Immobile: Immobile;
}

export interface Immobile {
  Price: number;
  QtdBedrooms: number;
  HaveCloset: boolean;
  Area: number;
  QtdCarspaces: number;
  QtdRooms: number;
  QtdSuites: number;
  Summary: string;
  Address: Address;
}

export interface Address {
  Street: string;
  Number: number;
  Neighborhood?: Neighborhood;
  NeighborhoodID?: number;
}

export interface Neighborhood {
  ID?: number;
  Name?: string;
}

export interface FetchNeighborhoodResponse {
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: DeletedAt;
  ID: number;
  Name: string;
}

export interface DeletedAt {
  Time: Date;
  Valid: boolean;
}
