export interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: number;
  image: string;
  email_id: string;
}

export interface SchoolFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: FileList;
}
