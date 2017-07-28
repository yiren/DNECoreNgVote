import { VoteRecord } from './VoteRecord';

export interface VoteItem{
  itemId:number,
  itemName:string,
  url?:string,
  description:string,
  note:string,
  eventId:string
}
