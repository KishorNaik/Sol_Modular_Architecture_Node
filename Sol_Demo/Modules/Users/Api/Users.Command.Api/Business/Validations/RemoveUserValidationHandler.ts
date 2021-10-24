import { ValidationChain } from "express-validator";
import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import UserValidationAbstract from "../../../../Shared/User.Shared.Validation/Abstracts/UserValidationAbstract";

export class RemoveUserValidation implements IRequest<ValidationChain[]>{

}

export class RemoveUserValidationHandler extends UserValidationAbstract implements IRequestHandler<RemoveUserValidation,ValidationChain[]>{
    
    public HandleAsync(requestPara: RemoveUserValidation): Promise<ValidationChain[]> {
        return new Promise((resolve,reject)=>{
            try
            {
                let validationSummary:ValidationChain[]=new Array<ValidationChain>();
                    validationSummary.push(this.UserIdentityValidation());

                resolve(validationSummary);
            }
            catch(ex)
            {
                reject(ex);
                throw ex;
            }
        });
    }

}