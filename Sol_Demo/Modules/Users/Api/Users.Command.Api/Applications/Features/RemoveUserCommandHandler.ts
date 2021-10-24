import { IMediatR } from "../../../../../../Frameworks/Services/MediatR/Core/MediatR";
import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import { RemoveUserDataService } from "../../Infrastructures/DataService/RemoveUserDataService";

export class RemoveUserCommand implements IRequest<boolean>{
    public UserIdentity?:string;

    constructor(removeUserCommand:RemoveUserCommand){
        this.UserIdentity=removeUserCommand.UserIdentity
    }
}

export class RemoveUserCommandHandler implements IRequestHandler<RemoveUserCommand,boolean>{
    
    private readonly mediatR:IMediatR;

    constructor(mediatR:IMediatR){
        this.mediatR=mediatR;
    }

    public HandleAsync(requestPara: RemoveUserCommand): Promise<boolean> {
       try
       {
            return this.mediatR.SendAsync<boolean,RemoveUserDataService>(new RemoveUserDataService(requestPara.UserIdentity));
       }
       catch(ex){
           throw ex;
       }
    }

}


