import express, { NextFunction } from "express";
import { ValidationChain } from "express-validator";
import BaseController from "../../../../../Frameworks/BaseController/BaseController";
import { UseAuthorize } from "../../../../../Frameworks/Middlewares/Jwt/JwtMiddlewareExtensions";
import { IMediatR } from "../../../../../Frameworks/Services/MediatR/Core/MediatR";
import { ValidationDelegateHandlerAsync } from "../../../../../Frameworks/Services/ValidationDelegates/Core/ValidationDelegateHandler";
import { CreatePostCommand } from "../Application/Features/CreatePostCommandHandler";
import { CreatePostValidation } from "../Business/Validations/CreatePostValidationHandler";
import { IConfiguration } from "../../../../../Frameworks/Services/Configuration/Core/Configuration";

// Extension
import "../../../Shared/Post.Shared.Config/Config/Extension/PostConfigurationServiceExtension";
import { UpdatePostValidation } from "../Business/Validations/UpdatePostValidationHandler";
import { UpdatePostCommand } from "../Application/Features/UpdatePostCommandHandler";
import { RemovePostCommand } from "../Application/Features/RemovePostCommandHandler";
import { RemovePostValidation } from "../Business/Validations/RemovePostValidationHandler";


export default class PostCommandController extends BaseController{
    
    private readonly mediatR:IMediatR;
    private readonly configuration:IConfiguration;
    
    constructor(mediatR:IMediatR,configuration:IConfiguration){
        super();

        this.router=express.Router();
        this.routePath="/api/post/command";

        this.mediatR=mediatR;
        this.configuration=configuration;

        this.InitializeRoutes().then((resolve)=>console.log("Post Command Route Initialize"));
    }
    
    protected async InitializeRoutes(): Promise<void> {
        // http://localhost:3002/api/post/command/create
        this.router?.post(
            `${this.routePath}/create`,
            await this.mediatR.SendAsync<ValidationChain[],CreatePostValidation>(new CreatePostValidation()),
            UseAuthorize(this.configuration.AppSettingPostConfig.Development.Secret),
            this.CreatePostAsync.bind(this)
        );

         //  http://localhost:3002/api/post/command/update
         this.router?.post(
            `${this.routePath}/update`,
            await this.mediatR.SendAsync<ValidationChain[],UpdatePostValidation>(new UpdatePostValidation()),
            UseAuthorize(this.configuration.AppSettingPostConfig.Development.Secret),
            this.UpdatePostAsync.bind(this)
        );

        // http://localhost:3002/api/post/command/remove
        this.router?.post(
            `${this.routePath}/remove`,
            await this.mediatR.SendAsync<ValidationChain[],RemovePostValidation>(new RemovePostValidation()),
            UseAuthorize(this.configuration.AppSettingPostConfig.Development.Secret),
            this.RemovePostAsync.bind(this)
        );

    }

    // http://localhost:3002/api/post/command/create
    private async CreatePostAsync(request:express.Request,response:express.Response,next:NextFunction):Promise<void>{
        try
        {
            await ValidationDelegateHandlerAsync(request,response,async()=>{
                
                let createPostCommand:CreatePostCommand=request.body;

                let flag:boolean=await this.mediatR.SendAsync<boolean,CreatePostCommand>(new CreatePostCommand(createPostCommand));
                return flag;
            });
        }
        catch(ex)
        {
            next(ex);
        }
    }

     //  http://localhost:3002/api/post/command/update
    private async UpdatePostAsync(request:express.Request,response:express.Response,next:NextFunction):Promise<void>{
        try
        {
            await ValidationDelegateHandlerAsync(request,response,async()=>{
                
                let updatePostCommand:UpdatePostCommand=request.body;

                let flag:boolean=await this.mediatR.SendAsync<boolean,UpdatePostCommand>(new UpdatePostCommand(updatePostCommand));
                return flag;
            });
        }
        catch(ex)
        {
            next(ex);
        }
    }

      // http://localhost:3002/api/post/command/remove
    private async RemovePostAsync(request:express.Request,response:express.Response,next:NextFunction):Promise<void>{
        try
        {
            await ValidationDelegateHandlerAsync(request,response,async()=>{
                
                let removePostCommand:RemovePostCommand=request.body;

                let flag:boolean=await this.mediatR.SendAsync<boolean,RemovePostCommand>(new RemovePostCommand(removePostCommand));
                return flag;
            });
        }
        catch(ex)
        {
            next(ex);
        }
    }
}