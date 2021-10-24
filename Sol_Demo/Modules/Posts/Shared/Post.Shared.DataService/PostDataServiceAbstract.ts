import mssql, { VarChar } from "mssql/msnodesqlv8";
import { IConfiguration } from "../../../../Frameworks/Services/Configuration/Core/Configuration";
//import "../Post.Shared.Config/Config/Extension/PostConfigurationServiceExtension";

export default abstract class PostDataServiceAbstract{
    protected SqlConnectionConfigAsync(configuration:IConfiguration):Promise<mssql.config>{
        return new Promise((resolve,reject)=>{

            try
            {
                
                const sqlConfig:mssql.config={
                    server:(process.env.NODE_ENV==="Development") ? configuration?.AppSettingPostConfig?.Development?.DatabaseConnection?.Server : configuration?.AppSettingPostConfig?.Production?.DatabaseConnection?.Server,
                    driver:(process.env.NODE_ENV==="Development") ? configuration.AppSettingPostConfig?.Development?.DatabaseConnection?.Driver : configuration?.AppSettingPostConfig?.Production?.DatabaseConnection?.Driver,
                    database:(process.env.NODE_ENV==="Development") ? configuration.AppSettingPostConfig?.Development?.DatabaseConnection?.Database : configuration?.AppSettingPostConfig?.Production?.DatabaseConnection?.Database,
                    options:{
                        trustedConnection:(process.env.NODE_ENV==="Development") ? configuration?.AppSettingPostConfig?.Development?.DatabaseConnection?.Options?.TrustedConnection : configuration?.AppSettingPostConfig?.Production?.DatabaseConnection?.Options?.TrustedConnection,
                    }
                }

                resolve(sqlConfig);
            }
            catch(ex)
            {
                reject(ex);
                throw ex;
            }

        });
    }
}