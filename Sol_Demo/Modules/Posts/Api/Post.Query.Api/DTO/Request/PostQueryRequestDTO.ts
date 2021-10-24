import PaginationModel from "../../../../../../Frameworks/Models/Pagination/PaginationModel";
import { IUserPostModel } from "../../../../Shared/Post.Shared.Model/IUserPostModel";

export default class PostQueryRequestDTO implements IUserPostModel{
    public PostIdentity?:string;
    public Post?:string;
    public UserIdentity?:string;

    public Pagination?:PaginationModel;
}