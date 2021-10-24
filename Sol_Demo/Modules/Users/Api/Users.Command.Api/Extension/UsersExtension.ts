import Bottle from "bottlejs";
import { AddConfigurationService } from "../../../../../Frameworks/Services/Configuration/Extension/ConfigurationServiceExtension";
import { AddMediatR } from "../../../../../Frameworks/Services/MediatR/Extension/MediatRServiceExtension";
import {IModulesServiceCollection,ModulesServiceCollection} from "../../../../../Frameworks/Services/ModulesServiceCollections";
import {AddSqlProviderService} from "../../../../../Frameworks/Services/SqlProvider/Extension/SqlProviderServiceExtension";
import { UserServiceInit } from "./UserServiceInit";

declare module '../../../../../Frameworks/Services/ModulesServiceCollections'{
    export interface IModulesServiceCollection{
        AddUserCommandModule(diContainer:Bottle):void;
    }

    export interface ModulesServiceCollection extends IModulesServiceCollection{
    }

}

// Extension
ModulesServiceCollection.prototype.AddUserCommandModule=function(diContainer:Bottle):void{

    AddConfigurationService(diContainer);
    AddSqlProviderService(diContainer);
    AddMediatR(diContainer);
    
    UserServiceInit(diContainer);

}

export {};
