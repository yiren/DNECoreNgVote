import { VoteItem } from './VoteItem';
import { VoteRecord } from './VoteRecord';

export interface VoteEvent{
  eventId:string,
  eventName:string,
  eventDescription:string,
  dueDate?:string,
  createDate?:string,
  isDue:boolean,
  voteItems:VoteItem[],
  voteRecords:VoteRecord[]
}
