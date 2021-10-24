import { IConfiguration } from "../../../../../../Frameworks/Services/Configuration/Core/Configuration";
import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import { ISqlProvider } from "../../../../../../Frameworks/Services/SqlProvider/Core/SqlProviders";
import PostRequestDTO from "../../DTO/Request/PostCommandRequestDTO";
import PostCommandDataServiceAbstract from "../Abstract/PostCommandDataServiceAbstract";

export class UpdatePostDataService extends PostRequestDTO implements IRequest<boolean>{

    constructor(postIdentity?:string, post?:string){
        super();
        this.Post=post;
        this.PostIdentity=postIdentity;
    }
}

export class UpdatePostDataServiceHandler extends PostCommandDataServiceAbstract implements IRequestHandler<UpdatePostDataService,boolean>{
    
    private readonly sqlProvider:ISqlProvider;
    private readonly configuration:IConfiguration;

    constructor(sqlProvider:ISqlProvider,configuration:IConfiguration){
        super();
        this.sqlProvider=sqlProvider;
        this.configuration=configuration;
    }
    
    public HandleAsync(requestPara: UpdatePostDataService): Promise<boolean> {
        try
        {
            return this.CommandExecuteAsync(this.sqlProvider,this.configuration,"Update-Post","uspSetUserPost",requestPara);
        }
        catch(ex)
        {
            throw ex;
        }
    }

}