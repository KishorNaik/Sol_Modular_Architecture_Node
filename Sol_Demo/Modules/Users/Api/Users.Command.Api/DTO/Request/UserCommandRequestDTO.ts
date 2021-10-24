import { IUserModel } from "../../../../Shared/Users.Shared.Model/IUserModel";

export class UserCommandRequestDTO implements IUserModel{

    public UserIdentity?:string;
    public FirstName?:string;
    public LastName?:string;
    public Email?:string;
    public HashPassword?:string;

}