export interface Address{
  street: string;
  zip: string;
  city: string;
  id: string;
}

export interface ListSort {
  ascending: boolean;
}

export interface BrandFilter {
  name: string;
  addressIds: string[];
  id: string;
}
