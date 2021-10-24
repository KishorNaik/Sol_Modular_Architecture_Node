export type AppSettingsConfiguration={
    Production:{
        DatabaseConnection:{
            Server: string,
            Driver: string,
            Database: string,
            Options: {
                TrustedConnection: boolean
            }
        },
        Secret:string
    },
    Development:{
        DatabaseConnection:{
            Server: string,
            Driver: string,
            Database: string,
            Options: {
                TrustedConnection: boolean
            }
        }
        Secret:string
    }
}