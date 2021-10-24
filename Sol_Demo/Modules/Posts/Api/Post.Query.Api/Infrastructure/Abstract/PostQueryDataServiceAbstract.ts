import PostDataServiceAbstract from "../../../../Shared/Post.Shared.DataService/PostDataServiceAbstract";
import PostQueryRequestDTO from "../../DTO/Request/PostQueryRequestDTO";
import mssql, { VarChar } from "mssql/msnodesqlv8";
import { ISqlProvider } from "../../../../../../Frameworks/Services/SqlProvider/Core/SqlProviders";
import { IConfiguration } from "../../../../../../Frameworks/Services/Configuration/Core/Configuration";

export default abstract class PostQueryDataServiceAbstract extends PostDataServiceAbstract{

    protected GetParameterAsync(requestPara:mssql.Request,command:string, postRequest:PostQueryRequestDTO):Promise<mssql.Request>{
        return new Promise((resolve,reject)=>{
 
             try
             {
                 requestPara
                     .input("Command",mssql.VarChar,command)
                     .input("UserIdentity",mssql.UniqueIdentifier,postRequest.UserIdentity)
                     .input("PageNumber",mssql.BigInt,postRequest?.Pagination?.PageNumber)
                     .input("RowsOfPageNumber",mssql.BigInt,postRequest?.Pagination?.RowsOfPageNumber);
 
                 resolve(requestPara);
             }
             catch(ex)
             {
                 reject(ex);
                 throw ex;
             }
 
        });
     }

     protected async QueryExecuteAsync(sqlProvider:ISqlProvider,configuration:IConfiguration,command:string,procedureName:string,postRequest:PostQueryRequestDTO):Promise<mssql.IProcedureResult<any>>{
        try
        {
            let pool:mssql.ConnectionPool=await sqlProvider.OpenSqlConnectionAsync(await this.SqlConnectionConfigAsync(configuration));

            let request:mssql.Request=await this.GetParameterAsync(pool.request(),command,postRequest!);

            let queryResult=await request.execute(procedureName);

            return queryResult;

        }
        catch(ex)
        {
            throw ex;
        }
        finally
        {
            await sqlProvider.CloseSqlConnectionAsync();
        }
    }
}