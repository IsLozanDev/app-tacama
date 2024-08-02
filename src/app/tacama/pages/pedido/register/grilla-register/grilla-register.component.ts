import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleSearch } from '@interface/article/IArticleSearch';

@Component({
  selector: 'app-grilla-register',
  standalone: true,
  imports: [],
  templateUrl: './grilla-register.component.html',
  styles: ``,
})
export class GrillaRegisterComponent {
  @Output() onDeleteItem = new EventEmitter<boolean>();

  listArticlesSelected: ArticleSearch[] = [];

  @Input() set articleSelected(value: ArticleSearch[]) {
    if (value == null) {
      return;
    }
    this.listArticlesSelected = value;
  }

  deleteItem(idArticulo: number) {
    this.listArticlesSelected.splice(
      this.listArticlesSelected.findIndex((x) => x.IdArticulo === idArticulo),
      1
    );
    this.onDeleteItem.emit(true);
  }
}
