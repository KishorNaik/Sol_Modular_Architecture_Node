import { IConfiguration,Configuration } from "../../../../../../Frameworks/Services/Configuration/Core/Configuration"
import { AppSettingsConfiguration } from "../Core/AppSettingsConfiguration";


declare module '../../../../../../Frameworks/Services/Configuration/Core/Configuration'{
    export interface IConfiguration{
        AppSettingUserConfig:AppSettingsConfiguration;
    }

    export interface Configuration extends IConfiguration{
    }

}

Configuration.prototype.AppSettingUserConfig=require("../../../User.Shared.Config/Config/appSetting.json");

export {};