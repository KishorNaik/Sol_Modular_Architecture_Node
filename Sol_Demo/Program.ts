/** || श्री गणेश || */
/** || श्री कृष्ण || */

import Bottle from "bottlejs";
import * as dotenv from "dotenv";
import { MiddlewareCollection } from "./Frameworks/Middlewares/MiddlewareCollection";
import { ModulesServiceCollection } from "./Frameworks/Services/ModulesServiceCollections";
import Startup from "./Startup";
dotenv.config();

new Startup(new Bottle())
    .ConfigMiddleware(new MiddlewareCollection())
    .ConfigModules(new ModulesServiceCollection())
    .AddControllers((diContainer:Bottle)=>[
        diContainer.container.userCommandController,
        diContainer.container.userQueryController,
        diContainer.container.postCommandController,
        diContainer.container.postQueryController
    ])
    .ConfigErrorHandler()
    .Listen();