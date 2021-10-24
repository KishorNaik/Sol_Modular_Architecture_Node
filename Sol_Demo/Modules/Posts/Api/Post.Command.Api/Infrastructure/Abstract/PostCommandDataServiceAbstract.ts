import PostDataServiceAbstract from "../../../../Shared/Post.Shared.DataService/PostDataServiceAbstract";
import mssql, { VarChar } from "mssql/msnodesqlv8";
import { ISqlProvider } from "../../../../../../Frameworks/Services/SqlProvider/Core/SqlProviders";
import { IConfiguration } from "../../../../../../Frameworks/Services/Configuration/Core/Configuration";
import PostCommandRequestDTO from "../../DTO/Request/PostCommandRequestDTO";

export default abstract class PostCommandDataServiceAbstract extends PostDataServiceAbstract{

    protected SetParameterAsync(requestPara:mssql.Request,command:string,postRequest:PostCommandRequestDTO):Promise<mssql.Request>{
        return new Promise((resolve,reject)=>{
            try
            {
                requestPara
                    .input("Command",mssql.VarChar,command)
                    .input("PostIdentity",mssql.UniqueIdentifier,postRequest.PostIdentity)
                    .input("Post",mssql.VarChar,postRequest.Post)
                    .input("UserIdentity",mssql.UniqueIdentifier,postRequest.UserIdentity);

                resolve(requestPara);
            }
            catch(ex){
                reject(ex);
                throw ex;
            }
        });
    }

    protected async CommandExecuteAsync(sqlProvider:ISqlProvider, configuration:IConfiguration, command:string,procedureName:string,postRequest:PostCommandRequestDTO):Promise<boolean>{
        try
        {
            let pool:mssql.ConnectionPool=await sqlProvider.OpenSqlConnectionAsync(await this.SqlConnectionConfigAsync(configuration));

            let request:mssql.Request=await this.SetParameterAsync(pool.request(),command,postRequest);

            let queryResult=await request.execute(procedureName);

            let flag=(queryResult.rowsAffected[0]>=1) ? true :false;

            return flag;
        }
        catch(ex){
            throw ex;
        }
        finally
        {
            await sqlProvider.CloseSqlConnectionAsync();
        }
    }

}