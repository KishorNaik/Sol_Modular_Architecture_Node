import { IConfiguration,Configuration } from "../../../../../../Frameworks/Services/Configuration/Core/Configuration"
import { AppSettingsConfiguration } from "../Core/AppSettingsConfiguration";


declare module '../../../../../../Frameworks/Services/Configuration/Core/Configuration'{
    export interface IConfiguration{
        AppSettingPostConfig:AppSettingsConfiguration;
    }

    export interface Configuration extends IConfiguration{
    }

}

Configuration.prototype.AppSettingPostConfig=require("../../../Post.Shared.Config/Config/appSetting.json");

export {};