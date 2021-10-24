import cleanDeep from "clean-deep";
import { IMediatR } from "../../../../../../Frameworks/Services/MediatR/Core/MediatR";
import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import GetUserPostResponseDTO from "../../DTO/Response/GetUserPostResponseDTO";
import { GetUserPostDataService } from "../../Infrastructure/DataService/GetUserPostDataServiceHandler";

export class GetUserPostQuery implements IRequest<(GetUserPostResponseDTO|undefined)[]>{
    public UserIdentity?:string;

    public PageNumber?:number;
    public RowsOfPageNumber?:number;

    constructor(getUserPostQuery:GetUserPostQuery){
        this.UserIdentity=getUserPostQuery.UserIdentity;
        this.PageNumber=getUserPostQuery.PageNumber;
        this.RowsOfPageNumber=getUserPostQuery.RowsOfPageNumber;
    }
}

export class GetUserPostQueryHandler implements IRequestHandler<GetUserPostQuery, (GetUserPostResponseDTO|undefined)[]>{
    
    private readonly mediatR:IMediatR;

    constructor(mediatR:IMediatR){
        this.mediatR=mediatR;
    }

    public async HandleAsync(requestPara: GetUserPostQuery): Promise<(GetUserPostResponseDTO|undefined)[]> {
        try
        {
            let getUserPostResponseList:(GetUserPostResponseDTO|undefined)[]=await this.mediatR.SendAsync<GetUserPostResponseDTO[],GetUserPostDataService>(new GetUserPostDataService(requestPara.UserIdentity,requestPara.PageNumber,requestPara.RowsOfPageNumber));

            getUserPostResponseList=cleanDeep(getUserPostResponseList);

            return getUserPostResponseList;
        }
        catch(ex)
        {
            throw ex;
        }
    }

}