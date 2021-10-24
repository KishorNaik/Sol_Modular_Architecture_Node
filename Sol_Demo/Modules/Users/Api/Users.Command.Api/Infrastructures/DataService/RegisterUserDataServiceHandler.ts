import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import { ISqlProvider } from "../../../../../../Frameworks/Services/SqlProvider/Core/SqlProviders";
import { IConfiguration } from "../../../../Shared/User.Shared.Config/Config/Core/Configuration";
import { UserCommandRequestDTO } from "../../DTO/Request/UserCommandRequestDTO";
import UserCommandDataServiceAbstract from "../Abstract/UserCommandDataServiceAbstract";

export class RegisterUserDataService extends UserCommandRequestDTO implements IRequest<boolean>{
    constructor(
        firstName:string,
        lastName:string,
        email:string,
        password:string
    )
    {
        super();
        this.FirstName=firstName;
        this.LastName=lastName;
        this.Email=email;
        this.HashPassword=password;
    }
}

export class RegisterUserDataServiceHandler extends UserCommandDataServiceAbstract implements IRequestHandler<RegisterUserDataService,boolean>{

    private readonly sqlProvider:ISqlProvider;
    private readonly configuration:IConfiguration;

    constructor(sqlProvider:ISqlProvider,configuration:IConfiguration){
        super();
        this.sqlProvider=sqlProvider;
        this.configuration=configuration;
    }

    public HandleAsync(requestPara: RegisterUserDataService): Promise<boolean> {
        try
        {
            return this.CommandExecuteAsync(this.sqlProvider,this.configuration,"Register-User","uspSetUser",requestPara);
        }   
        catch(ex){
            throw ex;
        }
    }

    
}