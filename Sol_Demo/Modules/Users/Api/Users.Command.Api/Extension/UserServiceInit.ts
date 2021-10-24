import Bottle from "bottlejs";
import { IMediatRRegister } from "../../../../../Frameworks/Services/MediatR/Core/MediatR";
import { RegisterUserCommand, RegisterUserCommandHandler } from "../Applications/Features/RegisterUserCommandHandler";
import { RemoveUserCommand, RemoveUserCommandHandler } from "../Applications/Features/RemoveUserCommandHandler";
import { UpdateUserCommand, UpdateUserCommandHandler } from "../Applications/Features/UpdateUserCommandHandler";
import { RegisterUserValidation, RegisterUserValidationHandler } from "../Business/Validations/RegisterUserValidationHandler";
import { RemoveUserValidation, RemoveUserValidationHandler } from "../Business/Validations/RemoveUserValidationHandler";
import { UpdateUserValidation, UpdateUserValidationHandler } from "../Business/Validations/UpdateUserValidationHandler";
import UserCommandController from "../Controllers/UserCommandController";
import { RegisterUserDataService, RegisterUserDataServiceHandler } from "../Infrastructures/DataService/RegisterUserDataServiceHandler";
import { RemoveUserDataService, RemoveUserDataServiceHandler } from "../Infrastructures/DataService/RemoveUserDataService";
import { UpdateUserDataService, UpdateUserDataServiceHandler } from "../Infrastructures/DataService/UpdateUserDataServiceHandler";

const DataServiceHandler=(diContainer:Bottle):void=>{
    diContainer.service("registerUserDataServiceHandler",RegisterUserDataServiceHandler,"sqlProvider","configurations");
    diContainer.service("updateUserDataServiceHandler",UpdateUserDataServiceHandler,"sqlProvider","configurations");
    diContainer.service("removeUserDataServiceHandler",RemoveUserDataServiceHandler,"sqlProvider","configurations");
}

const CommandHandler=(diContainer:Bottle):void=>{
    diContainer.service("registerUserCommandHandler",RegisterUserCommandHandler,"mediatR");
    diContainer.service("updateUserCommandHandler",UpdateUserCommandHandler,"mediatR");
    diContainer.service("removeUserCommandHandler",RemoveUserCommandHandler,"mediatR");
}

const ValidationHandler=(diContainer:Bottle):void=>{
    diContainer.service("registerUserValidationHandler",RegisterUserValidationHandler);
    diContainer.service("updateUserValidationHandler",UpdateUserValidationHandler);
    diContainer.service("removeUserValidationHandler",RemoveUserValidationHandler);
}

const Controller=(diContainer:Bottle):void=>{
    diContainer.service("userCommandController",UserCommandController,"mediatR","configurations");
}

const MediatRRegistration=(diContainer:Bottle):void=>{
    let mediatR:IMediatRRegister=diContainer.container.mediatR;

    // RegisterUser
    mediatR.RegisterRequest(RegisterUserDataService,diContainer.container.registerUserDataServiceHandler);
    mediatR.RegisterRequest(RegisterUserCommand,diContainer.container.registerUserCommandHandler);
    mediatR.RegisterRequest(RegisterUserValidation,diContainer.container.registerUserValidationHandler);

    // Update User
    mediatR.RegisterRequest(UpdateUserDataService,diContainer.container.updateUserDataServiceHandler);
    mediatR.RegisterRequest(UpdateUserCommand,diContainer.container.updateUserCommandHandler);
    mediatR.RegisterRequest(UpdateUserValidation,diContainer.container.updateUserValidationHandler);

    // Remove User
    mediatR.RegisterRequest(RemoveUserDataService,diContainer.container.removeUserDataServiceHandler);
    mediatR.RegisterRequest(RemoveUserCommand,diContainer.container.removeUserCommandHandler);
    mediatR.RegisterRequest(RemoveUserValidation,diContainer.container.removeUserValidationHandler);

    
}

export const UserServiceInit=(diContainer:Bottle):void=>{

    DataServiceHandler(diContainer);
    CommandHandler(diContainer);
    ValidationHandler(diContainer);

    MediatRRegistration(diContainer);

    Controller(diContainer);

}