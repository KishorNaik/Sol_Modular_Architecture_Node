import Bottle from "bottlejs";
import { IMediatRRegister } from "../../../../../Frameworks/Services/MediatR/Core/MediatR";
import { GetUserPostQuery, GetUserPostQueryHandler } from "../Application/Features/GetUserPostQueryHandler";
import { GetUserPostPostValidation, GetUserPostPostValidationHandler } from "../Business/Validation/GetUserPostPostValidationHandler";
import PostQueryController from "../Controllers/PostQueryController";
import { GetUserPostDataService, GetUserPostDataServiceHandler } from "../Infrastructure/DataService/GetUserPostDataServiceHandler";


const DataServiceHandler=(diContainer:Bottle):void=>{
    diContainer.service("getUserPostDataServiceHandler",GetUserPostDataServiceHandler,"sqlProvider","configurations");
}

const QueryHandler=(diContainer:Bottle):void=>{
    diContainer.service("getUserPostQueryHandler",GetUserPostQueryHandler,"mediatR");
}

const ValidationHandler=(diContainer:Bottle):void=>{
    diContainer.service("getUserPostValidation",GetUserPostPostValidationHandler);
}

const Controller=(diContainer:Bottle):void=>{
    diContainer.service("postQueryController",PostQueryController,"mediatR","configurations");
}

const MediatRRegistration=(diContainer:Bottle):void=>{
    let mediatR:IMediatRRegister=diContainer.container.mediatR;

   // Get User Post
   mediatR.RegisterRequest(GetUserPostDataService,diContainer.container.getUserPostDataServiceHandler);
   mediatR.RegisterRequest(GetUserPostQuery,diContainer.container.getUserPostQueryHandler);
   mediatR.RegisterRequest(GetUserPostPostValidation,diContainer.container.getUserPostValidation);

}

export const PostsServiceInit=(diContainer:Bottle):void=>{

    DataServiceHandler(diContainer);
    QueryHandler(diContainer);
    ValidationHandler(diContainer);

    MediatRRegistration(diContainer);

    Controller(diContainer);

}