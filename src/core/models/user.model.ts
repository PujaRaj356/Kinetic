export type UserRole = 'admin' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
  address?: string;
  city?: string;
  pincode?: string;
}

