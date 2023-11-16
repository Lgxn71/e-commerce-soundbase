import { Album, Artist, Record } from "./db";

export interface IalbumData {
  All: { recordsQuantity: number; albums: Record[] };
  Jazz: { recordsQuantity: number; albums: Record[] };
  HipHop: { recordsQuantity: number; albums: Record[] };
  "R&B": { recordsQuantity: number; albums: Record[] };
  Pop: { recordsQuantity: number; albums: Record[] };
  Rock: { recordsQuantity: number; albums: Record[] };
  Electronic: { recordsQuantity: number; albums: Record[] };
}

interface IalbumDataFiltered {
  recordsQuantity: number;
  albums: Album[];
  artists: Artist[];
}
