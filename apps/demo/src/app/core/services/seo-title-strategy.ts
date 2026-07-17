import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { Subscription, combineLatest, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeoTitleStrategy extends TitleStrategy {
  private title = inject(Title);
  private meta = inject(Meta);
  private transloco = inject(TranslocoService);
  private sub?: Subscription;

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.sub?.unsubscribe();

    let route = snapshot.root;
    while (route.firstChild) route = route.firstChild;
    const titleKey = route.data['title'];
    const descriptionKey = route.data['description'];

    this.sub = combineLatest([
      titleKey ? this.transloco.selectTranslate(titleKey) : of(''),
      descriptionKey ? this.transloco.selectTranslate(descriptionKey) : of(''),
    ]).subscribe(([title, description]) => {
      if (title) this.title.setTitle(title);
      if (description) {
        this.meta.updateTag({ name: 'description', content: description });
      }
    });
  }
}
