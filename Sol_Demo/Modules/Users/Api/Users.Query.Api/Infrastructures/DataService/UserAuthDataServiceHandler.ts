import { IConfiguration } from "../../../../../../Frameworks/Services/Configuration/Core/Configuration";
import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import { ISqlProvider } from "../../../../../../Frameworks/Services/SqlProvider/Core/SqlProviders";
import { UserQueryRequestDTO } from "../../DTO/Request/UserQueryRequestDTO";
import { UserQueryResponseDTO } from "../../DTO/Response/UserQueryResponseDTO";
import UserQueryDataServiceAbstract from "../Abstract/UserQueryDataServiceAbstract";

export class UserAuthDataService extends UserQueryRequestDTO implements IRequest<UserQueryResponseDTO>{
    
    constructor(email:string|undefined){
        super();

        this.Email=email;
    }
}

export class UserAuthDataServiceHandler extends UserQueryDataServiceAbstract implements IRequestHandler<UserAuthDataService,UserQueryResponseDTO>{
    
    private readonly sqlProvider:ISqlProvider;
    private readonly configuration:IConfiguration;

    constructor(sqlProvider:ISqlProvider,configuration:IConfiguration){
        super();
        this.sqlProvider=sqlProvider;
        this.configuration=configuration;
    }

    public async HandleAsync(requestPara: UserAuthDataService): Promise<UserQueryResponseDTO> {
        try
        {
             let query=await this.QueryExecuteAsync(this.sqlProvider,this.configuration,"Auth","uspGetUser",requestPara);
 
             let queryResult=query.recordset[0];
 
             // Map query Result into User Model
             let userQueryResponse:UserQueryResponseDTO=new UserQueryResponseDTO();
                userQueryResponse.FirstName=queryResult.FirstName;
                 userQueryResponse.LastName=queryResult.LastName;
                
 
                 userQueryResponse.Email=queryResult.Email;
                 userQueryResponse.HashPassword=queryResult.HashPassword;
 
             return userQueryResponse;
        }
        catch(ex)
        {
            throw ex;
        }
    }

}