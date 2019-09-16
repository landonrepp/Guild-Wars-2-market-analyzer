import {
  Injectable,
  ComponentFactoryResolver,
  ComponentFactory,
  ComponentRef,
  Type,
  ViewContainerRef,
  ViewChild,
} from '@angular/core';

/**
 * Usage:
 * 1. Inject service as any other angular service:
 *      private dynamic: DynamicComponentService
 * 2. Add an empty template container in HTML:
 *      <ng-template #example-space></ng-template>
 * 3. Reference the container in TypeScript:
 *      @ViewChild('example-space', { read: ViewContainerRef }) exampleContainer;
 * 4. Create the component at runtime:
 *      this.dynamic.create(ExampleComponent, this.exampleContainer);
 */
@Injectable()
export class DynamicComponentService {
  constructor(private resolver: ComponentFactoryResolver) {}

  /**
   * @returns component reference.
   *  To subscribe to outputs: reference.instance.output.subscribe(event => console.log(event));
   */
  create(component: Type<any>, where: ViewContainerRef, append: boolean = false): ComponentRef<any> {
    !append && where.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
    const reference = where.createComponent(factory);
    return reference;
  }
  
}