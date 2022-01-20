import {UserRoutes} from "./User";
import {AccountRoutes} from "./Account";
import { TransactionRoutes } from "./Transaction";


var RoutesArrays : any[][];
RoutesArrays = [
    UserRoutes,
    AccountRoutes,
    TransactionRoutes
];

export const Routes = RoutesArrays.flat(1);
