import { ObjectId } from 'mongoose';

export class CreateCommentDto {
  readonly username: string;
  readonly test: string;
  readonly trackId: ObjectId;
}
