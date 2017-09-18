import { Directive, ElementRef } from '@angular/core';

/**
 * Generated class for the EduTransparentDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[edu-transparent]' // Attribute selector
})
export class EduTransparentDirective {

  constructor(public elementRef: ElementRef) {
    console.log('Hello EduTransparentDirective Directive');
    this.elementRef.nativeElement.style.backgroundColor = '#fff';
  }

}
