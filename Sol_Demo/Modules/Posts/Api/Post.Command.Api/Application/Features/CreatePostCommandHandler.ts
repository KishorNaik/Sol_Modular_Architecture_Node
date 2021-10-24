import { IMediatR } from "../../../../../../Frameworks/Services/MediatR/Core/MediatR";
import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import { CreatePostDataService } from "../../Infrastructure/DataService/CreatePostDataServiceHandler";

export  class CreatePostCommand implements IRequest<boolean>{

    public Post?:string;
    public UserIdentity?:string;

    constructor(createPostCommand:CreatePostCommand){
        this.Post=createPostCommand.Post;
        this.UserIdentity=createPostCommand.UserIdentity;
    }
}

export class CreatePostCommandHandler implements IRequestHandler<CreatePostCommand, boolean>{
    
    private readonly mediatR:IMediatR;

    constructor(mediatR:IMediatR){
        this.mediatR=mediatR;
    }

    public HandleAsync(requestPara: CreatePostCommand): Promise<boolean> {
        try
        {
            return this.mediatR.SendAsync<boolean,CreatePostDataService>(new CreatePostDataService(requestPara.Post,requestPara.UserIdentity));
        }
        catch(ex)
        {
            throw ex;
        }
    }

}