import Bottle from "bottlejs";
import { AddConfigurationService } from "../../../../../Frameworks/Services/Configuration/Extension/ConfigurationServiceExtension";
import { AddMediatR } from "../../../../../Frameworks/Services/MediatR/Extension/MediatRServiceExtension";
import { ModulesServiceCollection } from "../../../../../Frameworks/Services/ModulesServiceCollections";
import { AddSqlProviderService } from "../../../../../Frameworks/Services/SqlProvider/Extension/SqlProviderServiceExtension";
import { PostsServiceInit } from "./PostsServiceInit";

declare module '../../../../../Frameworks/Services/ModulesServiceCollections'{
    export interface IModulesServiceCollection{
        AddPostQueryModule(diContainer:Bottle):void;
    }

    export interface ModulesServiceCollection extends IModulesServiceCollection{
    }

}

// Extension
ModulesServiceCollection.prototype.AddPostQueryModule=function(diContainer:Bottle):void{

    AddConfigurationService(diContainer);

    AddSqlProviderService(diContainer);
    AddMediatR(diContainer);

    PostsServiceInit(diContainer);
}

export {};




