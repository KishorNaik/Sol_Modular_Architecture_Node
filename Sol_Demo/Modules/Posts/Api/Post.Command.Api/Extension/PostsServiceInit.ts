import Bottle from "bottlejs";
import { IMediatRRegister } from "../../../../../Frameworks/Services/MediatR/Core/MediatR";
import { CreatePostCommand, CreatePostCommandHandler } from "../Application/Features/CreatePostCommandHandler";
import { RemovePostCommand, RemovePostCommandHandler } from "../Application/Features/RemovePostCommandHandler";
import { UpdatePostCommand, UpdatePostCommandHandler } from "../Application/Features/UpdatePostCommandHandler";
import { CreatePostValidation, CreatePostValidationHandler } from "../Business/Validations/CreatePostValidationHandler";
import { RemovePostValidation, RemovePostValidationHandler } from "../Business/Validations/RemovePostValidationHandler";
import { UpdatePostValidation, UpdatePostValidationHandler } from "../Business/Validations/UpdatePostValidationHandler";
import PostCommandController from "../Controllers/PostCommandController";
import { CreatePostDataService, CreatePostDataServiceHandler } from "../Infrastructure/DataService/CreatePostDataServiceHandler";
import { RemovePostDataService, RemovePostDataServiceHandler } from "../Infrastructure/DataService/RemovePostDataServiceHandler";
import { UpdatePostDataService, UpdatePostDataServiceHandler } from "../Infrastructure/DataService/UpdatePostDataServiceHandler";

const DataServiceHandler=(diContainer:Bottle):void=>{
    diContainer.service("createPostDataServiceHandler",CreatePostDataServiceHandler,"sqlProvider","configurations");
    diContainer.service("updatePostDataServiceHandler",UpdatePostDataServiceHandler,"sqlProvider","configurations");
    diContainer.service("removePostDataServiceHandler",RemovePostDataServiceHandler,"sqlProvider","configurations");
}

const CommandHandler=(diContainer:Bottle):void=>{
    diContainer.service("createPostCommandHandler",CreatePostCommandHandler,"mediatR");
    diContainer.service("updatePostCommandHandler",UpdatePostCommandHandler,"mediatR");
    diContainer.service("removePostCommandHandler",RemovePostCommandHandler,"mediatR");
}

const ValidationHandler=(diContainer:Bottle):void=>{
   diContainer.service("createPostValidationHandler",CreatePostValidationHandler);
   diContainer.service("updatePostValidationHandler",UpdatePostValidationHandler);
   diContainer.service("removePostValidationHandler",RemovePostValidationHandler);
}

const Controller=(diContainer:Bottle):void=>{
    diContainer.service("postCommandController",PostCommandController,"mediatR","configurations");
}

const MediatRRegistration=(diContainer:Bottle):void=>{
    let mediatR:IMediatRRegister=diContainer.container.mediatR;

    // Create Post
    mediatR.RegisterRequest(CreatePostDataService,diContainer.container.createPostDataServiceHandler);
    mediatR.RegisterRequest(CreatePostCommand,diContainer.container.createPostCommandHandler);
    mediatR.RegisterRequest(CreatePostValidation,diContainer.container.createPostValidationHandler);

     // Update Post
     mediatR.RegisterRequest(UpdatePostDataService,diContainer.container.updatePostDataServiceHandler);
     mediatR.RegisterRequest(UpdatePostCommand,diContainer.container.updatePostCommandHandler);
     mediatR.RegisterRequest(UpdatePostValidation,diContainer.container.updatePostValidationHandler);

    // Remove Post
    mediatR.RegisterRequest(RemovePostDataService,diContainer.container.removePostDataServiceHandler);
    mediatR.RegisterRequest(RemovePostCommand,diContainer.container.removePostCommandHandler);
    mediatR.RegisterRequest(RemovePostValidation,diContainer.container.removePostValidationHandler);

}

export const PostsServiceInit=(diContainer:Bottle):void=>{

    DataServiceHandler(diContainer);
    CommandHandler(diContainer);
    ValidationHandler(diContainer);

    MediatRRegistration(diContainer);

    Controller(diContainer);

}