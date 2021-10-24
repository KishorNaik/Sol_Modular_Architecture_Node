import Bottle from "bottlejs";
import { Configuration } from "../Core/Configuration";

export const AddConfigurationService=function(diContainer:Bottle):void{
    diContainer.service("configurations",Configuration);
}