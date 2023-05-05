export class Conversation {
  public _id: string;
  public createDate: Date;
  public updateDate: Date;
  public membersId: number[];
  public memberToName: string;

  constructor(_id: string, createdDate: Date, updatedDate: Date, membersId: number[], memberToName: string) {
    this._id = _id;
    this.createDate = createdDate;
    this.updateDate = updatedDate;
    this.membersId = membersId;
    this.memberToName = memberToName;
  }
}
