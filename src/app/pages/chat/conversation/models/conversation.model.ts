export class Conversation {
  public id: string;
  public createDate: Date;
  public updateDate: Date;
  public membersId: number[];

  constructor(id: string, createdDate: Date, updatedDate: Date, membersId: number[]) {
    this.id = id;
    this.createDate = createdDate;
    this.updateDate = updatedDate;
    this.membersId = membersId;
  }
}
