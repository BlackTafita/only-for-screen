import { Directive, Input, OnDestroy, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';


enum IConfig {
  mobile = 320,
  tablet = 760,
}

@Directive({
  selector: '[appOnlyForScreen]',
})
export class OnlyForScreenDirective implements OnDestroy {

  @Input()
  appOnlyForScreen: 'mobile' | 'desktop' | 'tablet';

  private windowSize$: Subject<number> = new Subject<number>();

  constructor(
    private renderer: Renderer2,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    // Resize event listener
    this.renderer.listen('window', 'resize', (a) => this.windowSize$.next(a.target.innerWidth));

    this.windowSize$.pipe(
      startWith(window.innerWidth),
    ).subscribe((windowSize) => (this.filterValue(windowSize)) ? this.setElement() : this.viewContainer.clear());
  }

  ngOnDestroy() {
    this.windowSize$.unsubscribe();
  }

  filterValue(width) {
    switch (this.appOnlyForScreen) {
      case 'mobile':
        return width > IConfig.mobile;
      case 'tablet':
        return IConfig.mobile <= width && width < IConfig.tablet;
      case 'desktop':
        return IConfig.tablet > width;
    }
  }

  setElement() {
    if (!this.viewContainer.get(0)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}
