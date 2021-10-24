import { ValidationChain } from "express-validator";
import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import PostValidationAbstract from "../../../../Shared/Post.Shared.Validation/Abstract/PostValidationAbstract";

export class CreatePostValidation implements IRequest<ValidationChain[]>{

}

export class CreatePostValidationHandler extends PostValidationAbstract implements IRequestHandler<CreatePostValidation,ValidationChain[]>{
    

    public HandleAsync(requestPara: CreatePostValidation): Promise<ValidationChain[]> {
       return new Promise((resolve,reject)=>{
           try
           {
                let validationSummary:ValidationChain[]=new Array<ValidationChain>();
                validationSummary.push(
                    this.PostValidation(),
                    this.UserIdentityValidation()
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