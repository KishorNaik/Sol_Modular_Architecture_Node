import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import { ISqlProvider } from "../../../../../../Frameworks/Services/SqlProvider/Core/SqlProviders";
import { IConfiguration } from "../../../../Shared/User.Shared.Config/Config/Core/Configuration";
import { UserCommandRequestDTO } from "../../DTO/Request/UserCommandRequestDTO";
import UserCommandDataServiceAbstract from "../Abstract/UserCommandDataServiceAbstract";

export class UpdateUserDataService extends UserCommandRequestDTO implements IRequest<boolean>{

    constructor(
        userIdentity:string,
        firstName:string,
        lastName:string,
        email:string,
        password:string
    ){
        super();
        this.FirstName=firstName;
        this.LastName=lastName;
        this.UserIdentity=userIdentity;
        this.Email=email;
        this.HashPassword=password;
    }
}

export class UpdateUserDataServiceHandler extends UserCommandDataServiceAbstract implements IRequestHandler<UpdateUserDataService,boolean>{
    
    private readonly sqlProvider:ISqlProvider;
    private readonly configuration:IConfiguration;

    constructor(sqlProvider:ISqlProvider,configuration:IConfiguration){
        super();
        this.sqlProvider=sqlProvider;
        this.configuration=configuration;
    }

    public HandleAsync(requestPara: UpdateUserDataService): Promise<boolean> {
       try
       {
            return this.CommandExecuteAsync(this.sqlProvider,this.configuration,"Update-User","uspSetUser",requestPara);
       }
       catch(ex){
           throw ex;
       }
    }

}