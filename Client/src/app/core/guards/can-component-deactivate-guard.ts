import { CanDeactivateFn } from '@angular/router';
import { ComponentDeactivatable } from '../../shared/interfaces/component-deactivatable';

export const canComponentDeactivateGuard: CanDeactivateFn<ComponentDeactivatable> = (
  component,
  currentRoute,
  currentState,
  nextState,
) => {

  if(!component.hasChanges()) 
    return true;

  return confirm('You have unsaved changes. Leave anyway?');
};
