import { IMediatR } from "../../../../../../Frameworks/Services/MediatR/Core/MediatR";
import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import { UpdateUserDataService } from "../../Infrastructures/DataService/UpdateUserDataServiceHandler";

export class UpdateUserCommand implements IRequest<boolean>{

    public UserIdentity?:string;
    public FirstName?:string;
    public LastName?:string;

    public Email?:string;
    public Password?:string;

    constructor(updateUserCommand:UpdateUserCommand)
    {
        this.UserIdentity=updateUserCommand.UserIdentity;
        this.FirstName=updateUserCommand.FirstName;
        this.LastName=updateUserCommand.LastName;
        this.Email=updateUserCommand.Email;
        this.Password=updateUserCommand.Password;
    }
}

export class UpdateUserCommandHandler implements IRequestHandler<UpdateUserCommand,boolean>{
    
    private readonly mediatR:IMediatR;

    constructor(mediatR:IMediatR){
        this.mediatR=mediatR;
    }

    public HandleAsync(requestPara: UpdateUserCommand): Promise<boolean> {
       try
       {
            return this.mediatR.SendAsync<boolean,UpdateUserDataService>(
                new UpdateUserDataService
                    (requestPara.UserIdentity!,
                        requestPara.FirstName!,
                        requestPara.LastName!,
                        requestPara.Email!,
                        requestPara.Password!
                    )
            );
       }
       catch(ex){
           throw ex;
       }
    }

}