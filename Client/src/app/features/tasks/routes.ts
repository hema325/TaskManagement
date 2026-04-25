import { Routes } from "@angular/router";
import { TasksList } from "./tasks-list/tasks-list";
import { permissionGuard } from "../../core/guards/permission-guard";
import { Permissions } from "../../core/enums/permissions";
import { TasksCreate } from "./tasks-create/tasks-create";
import { canComponentDeactivateGuard } from "../../core/guards/can-component-deactivate-guard";
import { TasksUpdate } from "./tasks-update/tasks-update";
import { TasksMine } from "./tasks-mine/tasks-mine";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: TasksList,
        canActivate: [permissionGuard],
        data: {permissions: [Permissions.TaskRead]}
    },
    {
        path: 'create',
        component: TasksCreate,
        canActivate: [permissionGuard],
        canDeactivate: [canComponentDeactivateGuard],
        data: {permissions: [Permissions.TaskCreate]}
    },
    {
        path: 'update/:id',
        component: TasksUpdate,
        canActivate: [permissionGuard],
        canDeactivate: [canComponentDeactivateGuard],
        data: {permissions: [Permissions.TaskUpdate]}
    },
    {
        path: 'mine',
        component: TasksMine
    }
]