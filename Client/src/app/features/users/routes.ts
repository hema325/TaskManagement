import { Routes } from "@angular/router";
import { UsersList } from "./users-list/users-list";
import { permissionGuard } from "../../core/guards/permission-guard";
import { Permissions } from "../../core/enums/permissions";
import { UsersCreate } from "./users-create/users-create";
import { UsersUpdate } from "./users-update/users-update";
import { canComponentDeactivateGuard } from "../../core/guards/can-component-deactivate-guard";

export const routes:Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'create',
        component: UsersCreate,
        canActivate: [permissionGuard],
        canDeactivate: [canComponentDeactivateGuard],
        data: {permissions: [Permissions.UserCreate]}
    },
    {
        path: 'update/:id',
        component: UsersUpdate,
        canActivate: [permissionGuard],
        canDeactivate: [canComponentDeactivateGuard],
        data: {permissions: [Permissions.UserChangePermission]}
    },
    {
        path: 'list',
        component: UsersList,
        canActivate: [permissionGuard],
        data: {permissions: [Permissions.UserRead]}
    }
]