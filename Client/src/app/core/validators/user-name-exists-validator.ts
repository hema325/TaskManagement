import { Users } from "../services/users";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { catchError, debounceTime, distinctUntilChanged, first, map, Observable, of, switchMap, timer } from "rxjs";

export function userNameExists(users: Users) {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        
        if(!control.value)
            return of(null);
        
        return timer(300).pipe(
            switchMap(() => users.userNameExists(control.value)),
            map(res => res.data ? { userNameTaken: true }: null),
            catchError(() => of(null))
        );
    }
}