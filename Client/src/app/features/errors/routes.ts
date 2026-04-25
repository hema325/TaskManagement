import { Routes } from "@angular/router";
import { NotFound } from "./not-found/not-found";
import { Forbidden } from "./forbidden/forbidden";
import { ServerError } from "./server-error/server-error";

export const routes: Routes = 
[
    {
        path: '404',
        component: NotFound
    },
    {
        path: '403',
        component: Forbidden
    },
    {
        path: '500',
        component: ServerError
    }
];