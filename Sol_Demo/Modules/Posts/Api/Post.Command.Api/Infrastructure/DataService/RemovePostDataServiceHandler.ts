import { IConfiguration } from "../../../../../../Frameworks/Services/Configuration/Core/Configuration";
import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import { ISqlProvider } from "../../../../../../Frameworks/Services/SqlProvider/Core/SqlProviders";
import PostRequestDTO from "../../DTO/Request/PostCommandRequestDTO";
import PostCommandDataServiceAbstract from "../Abstract/PostCommandDataServiceAbstract";

export class RemovePostDataService extends PostRequestDTO implements IRequest<boolean>{

    constructor(postIdentity?:string){
        super();
        this.PostIdentity=postIdentity;
    }
}

export class RemovePostDataServiceHandler extends PostCommandDataServiceAbstract implements IRequestHandler<RemovePostDataService,boolean>{
    
    private readonly sqlProvider:ISqlProvider;
    private readonly configuration:IConfiguration;

    constructor(sqlProvider:ISqlProvider,configuration:IConfiguration){
        super();
        this.sqlProvider=sqlProvider;
        this.configuration=configuration;
    }
    
    public HandleAsync(requestPara: RemovePostDataService): Promise<boolean> {
        try
        {
            return this.CommandExecuteAsync(this.sqlProvider,this.configuration,"Remove-Post","uspSetUserPost",requestPara);
        }
        catch(ex)
        {
            throw ex;
        }
    }

}