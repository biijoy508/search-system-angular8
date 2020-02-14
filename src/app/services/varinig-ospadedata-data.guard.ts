import { Injectable, Component } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanDeactivateComponentDeactivate {
canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;

}

@Injectable()
export class VarinigOspadedataDataGuard implements CanDeactivate<CanDeactivateComponentDeactivate> {
  canDeactivate(component: CanDeactivateComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
