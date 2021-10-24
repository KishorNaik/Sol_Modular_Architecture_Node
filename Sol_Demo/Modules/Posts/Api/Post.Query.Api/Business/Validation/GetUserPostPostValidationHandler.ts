import { ValidationChain } from "express-validator";
import IRequest from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/Services/MediatR/Core/Request/IRequestHandler";
import PostValidationAbstract from "../../../../Shared/Post.Shared.Validation/Abstract/PostValidationAbstract";

export class GetUserPostPostValidation implements IRequest<ValidationChain[]>{

}

    

export class GetUserPostPostValidationHandler extends PostValidationAbstract implements IRequestHandler<GetUserPostPostValidation,ValidationChain[]>{
    

    public HandleAsync(requestPara: GetUserPostPostValidation): Promise<ValidationChain[]> {
       return new Promise((resolve,reject)=>{
           try
           {
                let validationSummary:ValidationChain[]=new Array<ValidationChain>();
                validationSummary.push(
                    this.UserIdentityValidation(),
                    this.PageNumberValidation(),
                    this.RowsOfPageNumberValidation()
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