import mssql from "mssql/msnodesqlv8";
import { IConfiguration } from "../../../../Frameworks/Services/Configuration/Core/Configuration";

export default abstract class UserDataServiceAbstract {
    protected SqlConnectionConfigAsync(configuration:IConfiguration):Promise<mssql.config>{
        return new Promise((resolve,reject)=>{
            try
            {
                const sqlConfig:mssql.config={
                    server:(process.env.NODE_ENV==="Development") ? configuration?.AppSettingUserConfig?.Development?.DatabaseConnection?.Server : configuration?.AppSettingUserConfig?.Production?.DatabaseConnection?.Server,
                    driver:(process.env.NODE_ENV==="Development") ? configuration.AppSettingUserConfig?.Development?.DatabaseConnection?.Driver : configuration?.AppSettingUserConfig?.Production?.DatabaseConnection?.Driver,
                    database:(process.env.NODE_ENV==="Development") ? configuration.AppSettingUserConfig?.Development?.DatabaseConnection?.Database : configuration?.AppSettingUserConfig?.Production?.DatabaseConnection?.Database,
                    options:{
                        trustedConnection:(process.env.NODE_ENV==="Development") ? configuration?.AppSettingUserConfig?.Development?.DatabaseConnection?.Options?.TrustedConnection : configuration?.AppSettingUserConfig?.Production?.DatabaseConnection?.Options?.TrustedConnection,
                    }
                }

                resolve(sqlConfig);
            }
            catch(ex){
                reject(ex);
                throw ex;
            }
        });
    }
}