export class Notification {
  public title: string;
  public content: string; 
  public actorId: number; 
  public notifierId: number;
  public createDate: Date;
  public type: string;

  constructor(title:string, content: string, actorId: number, notifierId: number, createdDate: Date, type: string) {
    this.title = title;
    this.content = content;
    this.actorId = actorId;
    this.notifierId = notifierId;
    this.createDate = createdDate;
    this.type = type;
  }
}
