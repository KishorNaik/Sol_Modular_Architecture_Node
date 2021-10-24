import { IConfiguration } from "../../../../../../Frameworks/Services/Configuration/Core/Configuration";
import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import { ISqlProvider } from "../../../../../../Frameworks/Services/SqlProvider/Core/SqlProviders";
import PostRequestDTO from "../../DTO/Request/PostCommandRequestDTO";
import PostCommandDataServiceAbstract from "../Abstract/PostCommandDataServiceAbstract";

export class CreatePostDataService extends PostRequestDTO implements IRequest<boolean>{

    constructor(post?:string,userIdentity?:string){
        super();
        this.Post=post;
        this.UserIdentity=userIdentity;
    }
}

export class CreatePostDataServiceHandler extends PostCommandDataServiceAbstract implements IRequestHandler<CreatePostDataService,boolean>{
    
    private readonly sqlProvider:ISqlProvider;
    private readonly configuration:IConfiguration;

    constructor(sqlProvider:ISqlProvider,configuration:IConfiguration){
        super();
        this.sqlProvider=sqlProvider;
        this.configuration=configuration;
    }
    
    public HandleAsync(requestPara: CreatePostDataService): Promise<boolean> {
        try
        {
            return this.CommandExecuteAsync(this.sqlProvider,this.configuration,"Create-Post","uspSetUserPost",requestPara);
        }
        catch(ex)
        {
            throw ex;
        }
    }

}