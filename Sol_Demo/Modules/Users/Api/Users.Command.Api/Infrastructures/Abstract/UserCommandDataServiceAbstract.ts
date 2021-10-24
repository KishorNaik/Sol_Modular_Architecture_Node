import mssql from "mssql/msnodesqlv8";
import { ISqlProvider } from "../../../../../../Frameworks/Services/SqlProvider/Core/SqlProviders";
import { IConfiguration } from "../../../../Shared/User.Shared.Config/Config/Core/Configuration";
import UserDataServiceAbstract from "../../../../Shared/User.Shared.DataService/UserDataServiceAbstract";
import { UserCommandRequestDTO } from "../../DTO/Request/UserCommandRequestDTO";

export default abstract class UserCommandDataServiceAbstract extends UserDataServiceAbstract{

    protected SetParameterAsync(requestPara:mssql.Request,command:string,userRequest:UserCommandRequestDTO): Promise<mssql.Request>{
        return new Promise((resolve,reject)=>{
            try
            {
                requestPara
                    .input("Command",mssql.VarChar,command)
                    .input("UserIdentity",mssql.UniqueIdentifier,userRequest.UserIdentity)
                    .input("FirstName",mssql.VarChar,userRequest.FirstName)
                    .input("LastName",mssql.VarChar,userRequest.LastName)
                    .input("Email",mssql.VarChar,userRequest.Email)
                    .input("HashPassword",mssql.VarChar,userRequest.HashPassword);

                resolve(requestPara);
            }
            catch(ex){
                reject(ex);
                throw ex;
            }
        });
    }

   

    protected async CommandExecuteAsync(sqlProvider:ISqlProvider,configuration:IConfiguration,command:string,procedureName:string,userRequest:UserCommandRequestDTO) : Promise<boolean>{
        try
        {
            let pool:mssql.ConnectionPool=await sqlProvider.OpenSqlConnectionAsync(await this.SqlConnectionConfigAsync(configuration));
            let request:mssql.Request=await this.SetParameterAsync(pool.request(),command,userRequest);
            let queryResult=await request.execute(procedureName);
            let flag=(queryResult.rowsAffected[0]>=1) ? true :false;
            return flag;
        }
        catch(ex){
            throw ex;
        }
        finally{
            await sqlProvider.CloseSqlConnectionAsync();
        }
    }

    
}