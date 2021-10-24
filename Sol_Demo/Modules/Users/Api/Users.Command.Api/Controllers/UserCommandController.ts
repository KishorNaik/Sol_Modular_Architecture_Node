import BaseController from "../../../../../Frameworks/BaseController/BaseController";
import { IMediatR } from "../../../../../Frameworks/Services/MediatR/Core/MediatR";
import express, { NextFunction } from "express";
import { ValidationChain } from "express-validator";
import { RegisterUserValidation } from "../Business/Validations/RegisterUserValidationHandler";
import { ValidationDelegateHandlerAsync } from "../../../../../Frameworks/Services/ValidationDelegates/Core/ValidationDelegateHandler";
import { RegisterUserCommand } from "../Applications/Features/RegisterUserCommandHandler";
import { UpdateUserValidation } from "../Business/Validations/UpdateUserValidationHandler";
import { UseAuthorize } from "../../../../../Frameworks/Middlewares/Jwt/JwtMiddlewareExtensions";
import { UpdateUserCommand } from "../Applications/Features/UpdateUserCommandHandler";
import { RemoveUserCommand } from "../Applications/Features/RemoveUserCommandHandler";
import { RemoveUserValidation } from "../Business/Validations/RemoveUserValidationHandler";
import "../../../Shared/User.Shared.Config/Config/Extension/ConfigurationServiceExtension";
import { IConfiguration } from "../../../../../Frameworks/Services/Configuration/Core/Configuration";

export default class UserCommandController extends BaseController{
    

    private readonly mediatR:IMediatR;
    private readonly configuration:IConfiguration;

    constructor(mediatR:IMediatR,configuration:IConfiguration){
        super();

        this.router=express.Router();
        this.routePath="/api/user/command";

        this.mediatR=mediatR;
        this.configuration=configuration;

        this.InitializeRoutes().then((resolve)=>console.log("User Command Controller Initialize"));
    }

    protected async InitializeRoutes(): Promise<void> {
        // http://localhost:3001/api/user/command/register
        this.router?.post(
            `${this.routePath}/register`,
            await this.mediatR.SendAsync<ValidationChain[],RegisterUserValidation>(new RegisterUserValidation()),
            this.RegisterUserAsync.bind(this)
        );

        // http://localhost:3001/api/user/command/update
        this.router?.post(
            `${this.routePath}/update`,
            await this.mediatR.SendAsync<ValidationChain[],UpdateUserValidation>(new UpdateUserValidation()),
            UseAuthorize(this.configuration.AppSettingUserConfig.Development.Secret), // Auth for All Role
            this.UpdateUserAsync.bind(this)
        );

         // http://localhost:3001/api/user/command/remove
         this.router?.post(
            `${this.routePath}/remove`,
            await this.mediatR.SendAsync<ValidationChain[],RemoveUserValidation>(new RemoveUserValidation()),
            UseAuthorize(this.configuration.AppSettingUserConfig.Development.Secret), // Auth for All Role
            this.RemoveUserAsync.bind(this)
        );
    }

    // http://localhost:3001/api/user/command/register
    private async RegisterUserAsync(request:express.Request,response:express.Response,next:NextFunction):Promise<void>{
        try
        {   
            await ValidationDelegateHandlerAsync<boolean>(request,response,async ()=>{

                let registerCommand:RegisterUserCommand=request.body;
                let flag:boolean=await this.mediatR.SendAsync<boolean,RegisterUserCommand>(new RegisterUserCommand(registerCommand));

                return flag;

            });
        }
        catch(ex)
        {
            next(ex);
        }
    }

    // http://localhost:3001/api/user/command/update
    private async UpdateUserAsync(request:express.Request,response:express.Response,next:NextFunction):Promise<void>{
        try
        {
            await ValidationDelegateHandlerAsync<boolean>(request,response,async ()=>{

                let updateUserCommand:UpdateUserCommand=request.body;

                let flag:boolean=await this.mediatR.SendAsync<boolean,UpdateUserCommand>(new UpdateUserCommand(updateUserCommand));
                return flag;

            });
        }
        catch(ex){
            next(ex);
        }
    }

    // http://localhost:3001/api/user/command/remove
    private async RemoveUserAsync(request:express.Request,response:express.Response,next:NextFunction):Promise<void>{
        try
        {
            await ValidationDelegateHandlerAsync<boolean>(request,response,async ()=>{

                let removeUserCommand:RemoveUserCommand=request.body;

                let flag:boolean=await this.mediatR.SendAsync<boolean,RemoveUserCommand>(new RemoveUserCommand(removeUserCommand));
                return flag;

            });
        }
        catch(ex){
            next(ex);
        }
    }
}