import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import { ISqlProvider } from "../../../../../../Frameworks/Services/SqlProvider/Core/SqlProviders";
import { IConfiguration } from "../../../../Shared/User.Shared.Config/Config/Core/Configuration";
import { UserCommandRequestDTO } from "../../DTO/Request/UserCommandRequestDTO";
import UserCommandDataServiceAbstract from "../Abstract/UserCommandDataServiceAbstract";

export class RemoveUserDataService extends UserCommandRequestDTO implements IRequest<boolean>{

    constructor(userIdentity?:string){
        super();
        this.UserIdentity=userIdentity
    }
}

export class RemoveUserDataServiceHandler extends UserCommandDataServiceAbstract implements IRequestHandler<RemoveUserDataService,boolean>{
    
    private readonly sqlProvider:ISqlProvider;
    private readonly configuration:IConfiguration;

    constructor(sqlProvider:ISqlProvider,configuration:IConfiguration){
        super();
        this.sqlProvider=sqlProvider;
        this.configuration=configuration;
    }

    public HandleAsync(requestPara: RemoveUserDataService): Promise<boolean> {
        try
        {
            return this.CommandExecuteAsync(this.sqlProvider,this.configuration,"Remove-User","uspSetUser",requestPara);
        }
        catch(ex){
            throw ex;
        }
    }

}