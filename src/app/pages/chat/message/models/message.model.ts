export class Message {
  public id: string;
  public content: string; 
  public userId: number; 
  public conversationId: string;
  public createDate: Date;
  public updateDate: Date;
  public active: boolean;

  constructor(id: string, content: string, userId: number, conversationId: string, createdDate: Date, updatedDate: Date, active: boolean) {
    this.id = id;
    this.content = content;
    this.userId = userId;
    this.conversationId = conversationId;
    this.createDate = createdDate;
    this.updateDate = updatedDate;
    this.active = active;
  }
}
