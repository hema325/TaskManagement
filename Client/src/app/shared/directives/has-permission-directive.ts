import { Directive, inject, input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { Permissions } from '../../core/enums/permissions';

@Directive({
  selector: '[hasPermission]',
})
export class HasPermissionDirective {
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly auth = inject(Auth);

  public hasPermission = input.required<Permissions>();

  ngOnChanges() {
    this.viewContainerRef.clear();

    if(this.auth.isLoggedIn() && this.auth.session()!.permissions.includes(this.hasPermission()))
    {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
