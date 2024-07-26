import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ISearch } from '@interface/search/ISearch';
import {
  Observable,
  of,
  fromEvent,
  map,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  filter,
} from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './autocomplete.component.html',
  styles: ``,
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
  showSearches: boolean = false;
  isSearching: boolean = false;
  searchedCars: ISearch[] = [];

  @ViewChild('carSearchInput') carSearchInput!: ElementRef;
  @Output() setcarNameEvent = new EventEmitter<ISearch>();
  @Output() eventGetData = new EventEmitter<{ filter: string }>();


  @Input() textPlaceHolder: string = '';
  @Input() set cars(value: ISearch[]) {
    this.searchedCars = [...value];
  }


  constructor() {
    // this.searchedCars = this.cars;
  }

  ngAfterViewInit(): void {
    this.carSearch();
  }

  ngOnInit() {}

  getCars(name: any): Observable<any> {
    return of(this.filterCars(name));
  }

  filterCars(filter: string) {
    if (filter.length > 3) {
      this.eventGetData.emit({ filter });


    }
    // return this.cars.filter(
    //   (val: string) => val.toLowerCase().includes(filter.toLowerCase()) == true
    // );
    return this.cars;
  }

  carSearch() {
    // fromEvent for get value key enter

    const search$ = fromEvent<KeyboardEvent>(
      this.carSearchInput?.nativeElement,
      'keyup'
    ).pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(700),
      distinctUntilChanged(),
      tap(() => (this.isSearching = true)),
      switchMap((term) => (term ? this.getCars(term) : of<any>(this.cars))),
      tap(() => {
        (this.isSearching = false), (this.showSearches = true);
      })
    );

    search$.subscribe((data) => {
      this.isSearching = false;
      // this.searchedCars = data;
    });
  }

  setCarName(name: ISearch) {
    // this.searchedCars = this.filterCars(name);
    this.setcarNameEvent.emit(name);
    this.carSearchInput.nativeElement.value = name.FullName;
    this.showSearches = false;
  }

  trackById(index: any, item: { _id: void }): void {
    return item._id;
  }

  closeDropDown(): void {
    this.showSearches = false;
  }
}
