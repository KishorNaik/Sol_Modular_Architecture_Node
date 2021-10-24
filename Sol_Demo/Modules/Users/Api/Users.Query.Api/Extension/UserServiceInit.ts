import Bottle from "bottlejs";
import { IMediatRRegister } from "../../../../../Frameworks/Services/MediatR/Core/MediatR";
import { UserAuthQuery, UserAuthQueryHandler } from "../Application/Features/UserAuthQueryHandler";
import { UserAuthValidation, UserAuthValidationHandler } from "../Business/Validations/UserAuthValidationHandler";
import UserQueryController from "../Controllers/UserQueryController";
import { UserAuthDataService, UserAuthDataServiceHandler } from "../Infrastructures/DataService/UserAuthDataServiceHandler";

const DataServiceHandler=(diContainer:Bottle):void=>{
   diContainer.service("userAuthDataServiceHandler",UserAuthDataServiceHandler,"sqlProvider","configurations");
}

const QueryHandler=(diContainer:Bottle):void=>{
    diContainer.service("userAuthQueryHandler",UserAuthQueryHandler,"mediatR","configurations");
}

const ValidationHandler=(diContainer:Bottle):void=>{
    diContainer.service("userAuthValidationHandler",UserAuthValidationHandler);
}

const Controller=(diContainer:Bottle):void=>{
    diContainer.service("userQueryController",UserQueryController,"mediatR","configurations");
}

const MediatRRegistration=(diContainer:Bottle):void=>{
    let mediatR:IMediatRRegister=diContainer.container.mediatR;

    // Auth User
    mediatR.RegisterRequest(UserAuthDataService,diContainer.container.userAuthDataServiceHandler);
    mediatR.RegisterRequest(UserAuthQuery,diContainer.container.userAuthQueryHandler);
    mediatR.RegisterRequest(UserAuthValidation,diContainer.container.userAuthValidationHandler);
   
}

export const UserServiceInit=(diContainer:Bottle):void=>{

    DataServiceHandler(diContainer);
    QueryHandler(diContainer);
    ValidationHandler(diContainer);

    MediatRRegistration(diContainer);

    Controller(diContainer);

}