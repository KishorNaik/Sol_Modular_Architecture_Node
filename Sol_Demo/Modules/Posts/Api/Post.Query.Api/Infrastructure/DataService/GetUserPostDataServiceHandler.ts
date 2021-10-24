import PaginationModel from "../../../../../../Frameworks/Models/Pagination/PaginationModel";
import { IConfiguration } from "../../../../../../Frameworks/Services/Configuration/Core/Configuration";
import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import { ISqlProvider } from "../../../../../../Frameworks/Services/SqlProvider/Core/SqlProviders";
import PostQueryRequestDTO from "../../DTO/Request/PostQueryRequestDTO";
import GetUserPostResponseDTO from "../../DTO/Response/GetUserPostResponseDTO";
import PostQueryDataServiceAbstract from "../Abstract/PostQueryDataServiceAbstract";

export class GetUserPostDataService extends PostQueryRequestDTO implements IRequest<GetUserPostResponseDTO[]>{
    constructor(userIdentity?:string,PageNumber?:number, RowsOfPageNumber?:number){
        super();
        this.UserIdentity=userIdentity;
        this.Pagination=new PaginationModel();
        this.Pagination.PageNumber=PageNumber;
        this.Pagination.RowsOfPageNumber=RowsOfPageNumber;
    }
}


export class GetUserPostDataServiceHandler extends PostQueryDataServiceAbstract implements IRequestHandler<GetUserPostDataService,GetUserPostResponseDTO[]>{
    private readonly sqlProvider:ISqlProvider;
    private readonly configuration:IConfiguration;

    constructor(sqlProvider:ISqlProvider,configuration:IConfiguration){
        super();
        this.sqlProvider=sqlProvider;
        this.configuration=configuration;
    }
    
    public async HandleAsync(requestPara: GetUserPostDataService): Promise<GetUserPostResponseDTO[]> {
        try
        {
            let queryResult=await this.QueryExecuteAsync(this.sqlProvider,this.configuration,"Get-User-Post","uspGetUserPost",requestPara);

            let getUserPostResponseList:GetUserPostResponseDTO[]=queryResult.recordset;

            return getUserPostResponseList;
        }
        catch(ex)
        {
            throw ex;
        }
    }

}