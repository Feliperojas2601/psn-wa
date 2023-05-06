export class Message {
  public _id: string;
  public content: string; 
  public userId: number; 
  public conversationId: string;
  public createDate: Date;
  public updateDate: Date;
  public active: boolean;
  public isFromUser: boolean;
  public userFromName: string;

  constructor(id: string, content: string, userId: number, conversationId: string, createdDate: Date, updatedDate: Date, active: boolean, isFromUser: boolean, userFromName: string) {
    this._id = id;
    this.content = content;
    this.userId = userId;
    this.conversationId = conversationId;
    this.createDate = createdDate;
    this.updateDate = updatedDate;
    this.active = active;
    this.isFromUser = isFromUser;
    this.userFromName = userFromName;
  }
}
