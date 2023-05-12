export class User {
    public id: number;
    public role: string;
    public email: string;
    public name: string;
    public lastName: string;
    public phoneNumber: string;
    public notificationsEnable: boolean;
    public profileUpdateDate: Date;
    public profileType: string;
    public enabled: boolean;
    public accountNonLocked: boolean;
  
    constructor(id: number, role: string,
                email: string, name: string, 
                lastName: string, 
                phoneNumber: string, 
                notificationsEnable: boolean, 
                profileUpdateDate: Date, 
                profileType: string,
                enabled: boolean,
                accountNonLocked: boolean) {
        this.id = id;
        this.role = role;
        this.email= email;
        this.name = name;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.notificationsEnable = notificationsEnable;
        this.profileUpdateDate = profileUpdateDate;
        this.profileType = profileType;
        this.enabled = enabled;
        this.accountNonLocked = accountNonLocked;
    }
  }
  