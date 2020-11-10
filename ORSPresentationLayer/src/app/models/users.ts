export class Users
{
    //declaring properties
    public UserId : number;
    public Password : string;
    public Email : string;
    public UserName : string;
    public Phone : string;
    public Gender : string;
    public RoleId : number;

    //initialise properties of the class through constructor
    constructor(UserId : number, Password : string, Email : string,
        UserName : string, Phone : string, Gender : string, RoleId : number  )
        {
            this.UserName = UserName;
            this.Password = Password;
            this.Email = Email;
            this.Phone = Phone;
            this.Gender = Gender;
            this.RoleId = RoleId;
        }
}