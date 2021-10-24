import { IMediatR } from "../../../../../../Frameworks/Services/MediatR/Core/MediatR";
import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import bcrypt from "bcryptjs";
import { RegisterUserDataService } from "../../Infrastructures/DataService/RegisterUserDataServiceHandler";

export class RegisterUserCommand implements IRequest<boolean>{

    public FirstName?:string;
    public LastName?:string;

    public Email?:string;
    public Password?:string;

    constructor(registerUserCommand:RegisterUserCommand){
        this.FirstName=registerUserCommand.FirstName;
        this.LastName=registerUserCommand.LastName;
        this.Email=registerUserCommand.Email;
        this.Password=registerUserCommand.Password;
    }
}

export class RegisterUserCommandHandler implements IRequestHandler<RegisterUserCommand,boolean>{
    
    private readonly mediatR:IMediatR;

    constructor(mediatR:IMediatR){
        this.mediatR=mediatR;
    }
    
    public HandleAsync(requestPara: RegisterUserCommand): Promise<boolean> {
       try
       {
            const passwordHash:string | undefined = bcrypt.hashSync(requestPara.Password!,10);

            return this.mediatR.SendAsync<boolean,RegisterUserDataService>(new RegisterUserDataService(requestPara.FirstName!,requestPara.LastName!,requestPara.Email!,passwordHash));
       }
       catch(ex)
       {
           throw ex;
       }
    }

}