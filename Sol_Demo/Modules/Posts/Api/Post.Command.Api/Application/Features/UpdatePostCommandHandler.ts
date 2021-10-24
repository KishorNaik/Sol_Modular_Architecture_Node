import { IMediatR } from "../../../../../../Frameworks/Services/MediatR/Core/MediatR";
import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import { UpdatePostDataService } from "../../Infrastructure/DataService/UpdatePostDataServiceHandler";

export  class UpdatePostCommand implements IRequest<boolean>{

    public Post?:string;
    public PostIdentity?:string;

    constructor(updatePostCommand:UpdatePostCommand){
        this.Post=updatePostCommand.Post;
        this.PostIdentity=updatePostCommand.PostIdentity;
    }
}

export class UpdatePostCommandHandler implements IRequestHandler<UpdatePostCommand, boolean>{
    
    private readonly mediatR:IMediatR;

    constructor(mediatR:IMediatR){
        this.mediatR=mediatR;
    }

    public HandleAsync(requestPara: UpdatePostCommand): Promise<boolean> {
        try
        {
            return this.mediatR.SendAsync<boolean,UpdatePostDataService>(new UpdatePostDataService(requestPara.PostIdentity,requestPara.Post));
        }
        catch(ex)
        {
            throw ex;
        }
    }

}