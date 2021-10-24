import jwt from "jsonwebtoken";
import cleanDeep from "clean-deep";
import { IMediatR } from "../../../../../../Frameworks/Services/MediatR/Core/MediatR";
import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import { UserQueryResponseDTO } from "../../DTO/Response/UserQueryResponseDTO";
import { UserAuthDataService } from "../../Infrastructures/DataService/UserAuthDataServiceHandler";
import bcrypt from "bcryptjs";
import { HttpException } from "../../../../../../Frameworks/Middlewares/ExceptionHandling/ExceptionMiddlewareExtension";
import { IConfiguration } from "../../../../../../Frameworks/Services/Configuration/Core/Configuration";

export class UserAuthQuery implements IRequest<UserQueryResponseDTO>{

    public Email:string|undefined;
    public Password:string|undefined;

    constructor(userAuthQuery:UserAuthQuery){
        this.Email=userAuthQuery.Email;
        this.Password=userAuthQuery.Password;
    }
}

export class UserAuthQueryHandler implements IRequestHandler<UserAuthQuery,UserQueryResponseDTO>{

    private readonly mediatR:IMediatR;
    private readonly configuration:IConfiguration;

    constructor(mediatR:IMediatR,configuration:IConfiguration){
        this.mediatR=mediatR;
        this.configuration=configuration;
    }


    public async HandleAsync(requestPara: UserAuthQuery): Promise<UserQueryResponseDTO> {
        try
        {
            let userQueryResponse=await this.mediatR.SendAsync<UserQueryResponseDTO,UserAuthDataService>(new UserAuthDataService(requestPara.Email));

            // Compare Hash Password
            if(!userQueryResponse || !bcrypt.compareSync(requestPara.Password!,userQueryResponse?.HashPassword!)){
                throw new HttpException(200,"UserName or Password does not match");
            }

            // jwt
            const token=jwt.sign({sub:userQueryResponse.UserIdentity},this.configuration.AppSettingPostConfig.Development.Secret,{expiresIn:"7d",algorithm:"HS256"});
            
            userQueryResponse!.HashPassword=undefined;
            userQueryResponse.Token=token;
            
            // Clear all null values
            userQueryResponse=cleanDeep(userQueryResponse);

            return userQueryResponse;

        }
        catch(ex){
            throw ex;
        }
    }

}