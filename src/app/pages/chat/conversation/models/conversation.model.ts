export class Conversation {
  public _id: string;
  public createDate: Date;
  public updateDate: Date;
  public membersId: number[];

  constructor(_id: string, createdDate: Date, updatedDate: Date, membersId: number[]) {
    this._id = _id;
    this.createDate = createdDate;
    this.updateDate = updatedDate;
    this.membersId = membersId;
  }
}
