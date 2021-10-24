import express, { NextFunction } from "express";
import { ValidationChain } from "express-validator";
import BaseController from "../../../../../Frameworks/BaseController/BaseController";
import { UseAuthorize } from "../../../../../Frameworks/Middlewares/Jwt/JwtMiddlewareExtensions";
import { IConfiguration } from "../../../../../Frameworks/Services/Configuration/Core/Configuration";
import { IMediatR } from "../../../../../Frameworks/Services/MediatR/Core/MediatR";
import { ValidationDelegateHandlerAsync } from "../../../../../Frameworks/Services/ValidationDelegates/Core/ValidationDelegateHandler";
import { GetUserPostQuery } from "../Application/Features/GetUserPostQueryHandler";
import { GetUserPostPostValidation } from "../Business/Validation/GetUserPostPostValidationHandler";
import GetUserPostResponseDTO from "../DTO/Response/GetUserPostResponseDTO";

// Extension
import "../../../Shared/Post.Shared.Config/Config/Extension/PostConfigurationServiceExtension";

export default class PostQueryController extends BaseController{
    
    private readonly mediatR:IMediatR;
    private readonly configuration:IConfiguration;

    constructor(mediatR:IMediatR,configuration:IConfiguration){
        super();

        this.router=express.Router();
        this.routePath="/api/post/query";

        this.mediatR=mediatR;
        this.configuration=configuration;

        this.InitializeRoutes().then((resolve)=>console.log("Post Route Initialize"));
    }
    
    protected async InitializeRoutes(): Promise<void> {
        // http://localhost:3002/api/post/query/getuserposts
        this.router?.post(
            `${this.routePath}/getuserposts`,
            await this.mediatR.SendAsync<ValidationChain[],GetUserPostPostValidation>(new GetUserPostPostValidation()),
            UseAuthorize(this.configuration.AppSettingPostConfig.Development.Secret),
            this.GetUserPostsAsync.bind(this)
        );
    }

     // http://localhost:3002/api/post/query/getuserposts
    private async GetUserPostsAsync(request:express.Request,response:express.Response,next:NextFunction):Promise<void>{
        try
        {
            await ValidationDelegateHandlerAsync(request,response,async()=>{
               
                let getUserPostQuery:GetUserPostQuery=request.body;

                let getUserPostResponseList:(GetUserPostResponseDTO|undefined)[] =await this.mediatR.SendAsync<(GetUserPostResponseDTO|undefined)[],GetUserPostQuery>(new GetUserPostQuery(getUserPostQuery));
                return getUserPostResponseList;
            });
        }
        catch(ex)
        {
            next(ex);
        }
    }

}