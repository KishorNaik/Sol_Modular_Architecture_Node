import { ValidationChain } from "express-validator";
import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import UserValidationAbstract from "../../../../Shared/User.Shared.Validation/Abstracts/UserValidationAbstract";

export class UserAuthValidation implements IRequest<ValidationChain[]>{

}

export class UserAuthValidationHandler extends UserValidationAbstract implements IRequestHandler<UserAuthValidation,ValidationChain[]>{
    
    public HandleAsync(requestPara: UserAuthValidation): Promise<ValidationChain[]> {
        return new Promise((resolve,reject)=>{
            try
            {
                let validationSummary:ValidationChain[]=new Array<ValidationChain>();
                    validationSummary.push(
                        this.EmailValidation(),
                        this.PasswordValidation()
                    );

                resolve(validationSummary);
            }
            catch(ex){
                reject(ex);
                throw ex;
            }
        })
    }

}