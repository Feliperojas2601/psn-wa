export class Notification {
  public id: string;
  public title: string;
  public content: string; 
  public actorId: number; 
  public notifierId: number;
  public createDate: Date;
  public type: string;

  constructor(id: string, title:string, content: string, actorId: number, notifierId: number, createdDate: Date, type: string) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.actorId = actorId;
    this.notifierId = notifierId;
    this.createDate = createdDate;
    this.type = type;
  }
}
