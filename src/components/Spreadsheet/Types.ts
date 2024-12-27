import { Timestamp } from 'firebase/firestore';

export interface Record {
  color: string;
  id: string;
  name: string;
  number: string;
  status: string;
  uid: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
