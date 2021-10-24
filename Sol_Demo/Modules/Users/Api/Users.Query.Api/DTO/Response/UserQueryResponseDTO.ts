import { IUserModel } from "../../../../Shared/Users.Shared.Model/IUserModel";

export class UserQueryResponseDTO implements IUserModel{
    public UserIdentity?:string;
    public FirstName?:string;
    public LastName?:string;
    public Email?:string;
    public HashPassword?:string;

    public Token?:string;
}