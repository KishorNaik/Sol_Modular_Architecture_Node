import Bottle from "bottlejs";
import express from "express";
import BaseController from "./Frameworks/BaseController/BaseController";
import { IMiddlewareCollection } from "./Frameworks/Middlewares/MiddlewareCollection";
import { IModulesServiceCollection } from "./Frameworks/Services/ModulesServiceCollections";

// Extensions
import "./Modules/Users/Api/Users.Command.Api/Extension/UsersExtension";
import "./Modules/Users/Api/Users.Query.Api/Extension/UsersExtension";
import "./Modules/Posts/Api/Post.Command.Api/Extension/PostsExtension";
import "./Modules/Posts/Api/Post.Query.Api/Extension/PostsExtension";

export default class Startup{

    private app:express.Application;
    private bottle:Bottle; // This is Dependency Injection beer bottle.
    private middlewareCollections?:IMiddlewareCollection;

    constructor(bottle:Bottle){
        this.app=express();

        this.bottle=bottle;

    }

    public ConfigMiddleware(middlewareCollection:IMiddlewareCollection):Startup{

        this.middlewareCollections=middlewareCollection;

        this.middlewareCollections.AddJsonMiddleware(this.app);
        this.middlewareCollections.AddLoggerMiddleware(this.app);
        this.middlewareCollections.AddCorsMiddleware(this.app);
        this.middlewareCollections.AddGzipCompressionMiddleware(this.app);
        this.middlewareCollections.AddSecurityHeadersMiddleware(this.app);

        return this;

    }

    public ConfigModules(modulesServiceCollection:IModulesServiceCollection):Startup{

        modulesServiceCollection.AddUserCommandModule(this.bottle);
        modulesServiceCollection.AddUserQueryModule(this.bottle);

        modulesServiceCollection.AddPostCommandModule(this.bottle);
        modulesServiceCollection.AddPostQueryModule(this.bottle);
        
        return this;
    }

    public AddControllers(funcCallBack:(bottleContainer:Bottle)=> Array<BaseController>) : Startup{
        const controllerList:Array<BaseController>=funcCallBack(this.bottle);

        if(controllerList?.length>=1){
            controllerList.forEach((controller)=> {
                this.app.use("/",controller.router!);
            });
        }
        return this;
    }

    public ConfigErrorHandler():Startup{

        this.middlewareCollections?.AddExceptionMiddleware(this.app);

        return this;
    }

    public Listen():void{

        let port:number|undefined;

        if(process.env.NODE_ENV==="Development"){
            port=Number(process.env.PORT_DEVELOPMENT)
        }
        else if(process.env.NODE_ENV==="Production")
        {
            port=Number(process.env.PORT_PRODUCTION)
        }

        this.app.listen(port,()=>{
            console.log(`App listening on the port ${port}`);
        });
    }
}