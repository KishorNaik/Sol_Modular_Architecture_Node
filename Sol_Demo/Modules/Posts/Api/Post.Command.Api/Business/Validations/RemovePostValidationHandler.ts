import { ValidationChain } from "express-validator";
import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import PostValidationAbstract from "../../../../Shared/Post.Shared.Validation/Abstract/PostValidationAbstract";

export class RemovePostValidation implements IRequest<ValidationChain[]>{

}

export class RemovePostValidationHandler extends PostValidationAbstract implements IRequestHandler<RemovePostValidation,ValidationChain[]>{
    

    public HandleAsync(requestPara: RemovePostValidation): Promise<ValidationChain[]> {
       return new Promise((resolve,reject)=>{
           try
           {
                let validationSummary:ValidationChain[]=new Array<ValidationChain>();
                validationSummary.push(
                    this.PostIdentityValidation()
                );

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