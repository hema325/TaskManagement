import { Directive, inject, input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { Permissions } from '../../core/enums/permissions';

@Directive({
  selector: '[havePermissions]',
})
export class HavePermissionsDirective implements OnChanges {
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly auth = inject(Auth);  

  public havePermissions = input.required<Permissions[]>();

    ngOnChanges(): void {
    
      this.viewContainerRef.clear();

      if(this.auth.isLoggedIn() && this.havePermissions().every(p => this.auth.session()!.permissions.includes(p))) 
      {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
  }
}
