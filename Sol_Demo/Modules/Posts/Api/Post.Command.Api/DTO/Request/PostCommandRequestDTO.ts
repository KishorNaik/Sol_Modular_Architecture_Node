
import { IUserPostModel } from "../../../../Shared/Post.Shared.Model/IUserPostModel";

export default class PostCommandRequestDTO implements IUserPostModel{
    public PostIdentity?:string;
    public Post?:string;
    public UserIdentity?:string;
}