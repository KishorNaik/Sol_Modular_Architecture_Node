import mssql from "mssql/msnodesqlv8";
import { IConfiguration } from "../../../../../../Frameworks/Services/Configuration/Core/Configuration";
import { ISqlProvider } from "../../../../../../Frameworks/Services/SqlProvider/Core/SqlProviders";

import UserDataServiceAbstract from "../../../../Shared/User.Shared.DataService/UserDataServiceAbstract";
import { UserQueryRequestDTO } from "../../DTO/Request/UserQueryRequestDTO";


export default class UserQueryDataServiceAbstract extends UserDataServiceAbstract{
    protected GetParameterAsync(requestPara:mssql.Request,command:string,userRequest:UserQueryRequestDTO):Promise<mssql.Request>{
        return new Promise((resolve,reject)=>{

            try
            {
                requestPara 
                    .input("Command",mssql.VarChar,command)
                    .input("Email",mssql.VarChar,userRequest?.Email);

                resolve(requestPara);
            }
            catch(ex){
                reject(ex);
                throw ex;
            }
        });
    }

    protected async QueryExecuteAsync(sqlProvider:ISqlProvider, configuration:IConfiguration,command:string,procedureName:string,userRequest:UserQueryRequestDTO): Promise<mssql.IProcedureResult<any>>{
        try
        {
            let pool:mssql.ConnectionPool=await sqlProvider.OpenSqlConnectionAsync(await this.SqlConnectionConfigAsync(configuration));

            let request:mssql.Request=await this.GetParameterAsync(pool.request(),command,userRequest!);

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