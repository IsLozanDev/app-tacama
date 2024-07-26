import { Component, Input } from '@angular/core';
import { ArticleSearch } from '@interface/article/IArticleSearch';

@Component({
  selector: 'app-grilla-register',
  standalone: true,
  imports: [],
  templateUrl: './grilla-register.component.html',
  styles: ``,
})
export class GrillaRegisterComponent {
  listArticlesSelected: ArticleSearch[] = [];

  @Input() set articleSelected(value: ArticleSearch[]) {
    if (value == null) {
      return;
    }
    this.listArticlesSelected = value;
  }
}
