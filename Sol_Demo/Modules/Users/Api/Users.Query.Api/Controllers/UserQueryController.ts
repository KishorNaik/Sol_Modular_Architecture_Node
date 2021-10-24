import express, { NextFunction } from "express";
import { ValidationChain } from "express-validator";
import BaseController from "../../../../../Frameworks/BaseController/BaseController";
import { IMediatR } from "../../../../../Frameworks/Services/MediatR/Core/MediatR";
import { ValidationDelegateHandlerAsync } from "../../../../../Frameworks/Services/ValidationDelegates/Core/ValidationDelegateHandler";
import { UserAuthQuery } from "../Application/Features/UserAuthQueryHandler";
import { UserAuthValidation } from "../Business/Validations/UserAuthValidationHandler";
import { UserQueryResponseDTO } from "../DTO/Response/UserQueryResponseDTO";
import "../../../Shared/User.Shared.Config/Config/Extension/ConfigurationServiceExtension";
import { IConfiguration } from "../../../../../Frameworks/Services/Configuration/Core/Configuration";

export default class UserQueryController extends BaseController{
    

    private readonly mediatR:IMediatR;
    private readonly configuration:IConfiguration;

    constructor(mediatR:IMediatR,configuration:IConfiguration){
        super();

        this.router=express.Router();
        this.routePath="/api/user/query";

        this.mediatR=mediatR;
        this.configuration=configuration;

        this.InitializeRoutes().then((resolve)=>console.log("User Query Controller Initialize"));
    }

    protected async InitializeRoutes(): Promise<void> {
        // http://localhost:3001/api/user/query/auth
        this.router?.post(
            `${this.routePath}/auth`,
            await this.mediatR.SendAsync<ValidationChain[],UserAuthValidation>(new UserAuthValidation()),
            this.AuthUserAsync.bind(this)
        );
    }

    // http://localhost:3001/api/user/query/auth
    private async AuthUserAsync(request:express.Request,response:express.Response,next:NextFunction):Promise<void>{
        try
        {   
            await ValidationDelegateHandlerAsync<UserQueryResponseDTO>(request,response,async ()=>{

                let userAuthQuery:UserAuthQuery=request.body;
                let response:UserQueryResponseDTO=await this.mediatR.SendAsync<UserQueryResponseDTO,UserAuthQuery>(new UserAuthQuery(userAuthQuery));

                return response;

            });
        }
        catch(ex)
        {
            next(ex);
        }
    }
}