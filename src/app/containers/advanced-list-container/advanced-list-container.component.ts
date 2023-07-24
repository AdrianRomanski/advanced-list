import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AdvancedListService} from "../../services/advanced-list.service";
import {
  BehaviorSubject, catchError,
  combineLatest,
  finalize,
  map,
  Observable, of,
  switchMap,
  take,
} from "rxjs";
import {Address, BrandFilter, ListSort} from "../../model/list.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-advanced-list-container',
  templateUrl: './advanced-list-container.component.html',
  styleUrls: ['./advanced-list-container.component.scss']
})
export class AdvancedListContainerComponent implements OnInit{
  destroyRef = inject(DestroyRef)
  addresses$!: Observable<Address[]>;
  filteredAndSortedAddresses$!: Observable<Address[]>;
  brandFilters$!: Observable<BrandFilter[]>;
  loadingAddresses$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  loadingBrands$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  filteredBrandIds$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
  listSort$: BehaviorSubject<ListSort> = new BehaviorSubject<ListSort>({ascending: true});
  addressDeleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private service: AdvancedListService) {}

  ngOnInit(): void {
    this.addresses$ = this.initializeAddresses()
    this.brandFilters$ = this.initializeBrands();
    this.filteredAndSortedAddresses$ = this.addressesListener();
  }

  changeSort(listSort: ListSort): void {
    this.listSort$.next(listSort);
  }

  changeFilteredBrands(brands: string[]): void {
    this.filteredBrandIds$.next(brands);
  }

  deleteAddress(id: string): void {
    this.service.deleteAddress(id).pipe(
      take(1),
      catchError((err) => of(err))
    ).subscribe((e) => {
      if(e instanceof HttpErrorResponse) {
        console.log(`Address with id:${id} was not found`)
      } else {
        this.addressDeleted$.next(true);
      }
    });
  }

  private initializeAddresses() {
    return this.addressDeleted$.pipe(
      switchMap(() => {
        return this.service.addresses();
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  private initializeBrands() {
    return this.service.brandFilters().pipe(
      take(1),
      finalize(() => this.loadingBrands$.next(false))
    );
  }

  private addressesListener(): Observable<Address[]> {
    return combineLatest([this.addresses$, this.listSort$, this.filteredBrandIds$]).pipe(
      map(([addresses, {ascending}, filteredBrandIds]: [Address[], ListSort, string[]]) => {
        return this.getSortedAndFilteredAddresses(addresses, ascending, filteredBrandIds);
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  private getSortedAndFilteredAddresses(
    addresses: Address[],
    ascending: boolean,
    filteredBrandIds: string[]
  ):Address[] {
    const sortedAddresses: Address[] = this.getSortedAddresses(addresses, ascending);
    const sortedAndFilteredAddresses: Address[] = this.getFilteredAddresses(filteredBrandIds, sortedAddresses);
    this.loadingAddresses$.next(false);
    return sortedAndFilteredAddresses;
  }

  private getSortedAddresses(
    addresses: Address[],
    ascending: boolean
  ): Address[] {
    return addresses
      .sort((address1: Address, address2: Address) => {
        return this.sort(parseInt(address1.zip, 10), parseInt(address2.zip, 10), ascending) ? -1 : 1;
      });
  }

  private sort(zip1: number, zip2: number, ascending: boolean): boolean {
    return ascending ? zip1 < zip2: zip1 > zip2;
  }

  private getFilteredAddresses(
    filteredBrandIds: string[],
    sortedAddresses: Address[]
  ): Address[] {
    return filteredBrandIds.length > 0
      ? sortedAddresses.filter((address: Address) => this.addressesFromBrand(filteredBrandIds, address))
      : sortedAddresses;
  }

  private addressesFromBrand(filteredBrandIds: string[], address: Address): boolean {
    return filteredBrandIds.some((addressId: string) => addressId === address.id);
  }
}
