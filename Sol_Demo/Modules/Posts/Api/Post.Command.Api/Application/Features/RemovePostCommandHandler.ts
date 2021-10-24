import { IMediatR } from "../../../../../../Frameworks/Services/MediatR/Core/MediatR";
import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import { RemovePostDataService } from "../../Infrastructure/DataService/RemovePostDataServiceHandler";

export  class RemovePostCommand implements IRequest<boolean>{

    public PostIdentity?:string;

    constructor(removePostCommand:RemovePostCommand){
        this.PostIdentity=removePostCommand.PostIdentity;
    }
}

export class RemovePostCommandHandler implements IRequestHandler<RemovePostCommand, boolean>{
    
    private readonly mediatR:IMediatR;

    constructor(mediatR:IMediatR){
        this.mediatR=mediatR;
    }

    public HandleAsync(requestPara: RemovePostCommand): Promise<boolean> {
        try
        {
            return this.mediatR.SendAsync<boolean,RemovePostDataService>(new RemovePostDataService(requestPara.PostIdentity));
        }
        catch(ex)
        {
            throw ex;
        }
    }

}