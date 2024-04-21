import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styles: [``]
})
export class PaginationComponent {  
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 10;
  @Input() totalItems: number = 10;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChanged.emit(page);
    }
  }
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.changePage(this.currentPage);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.changePage(this.currentPage);
    }
  }

  goToPage(event:Event): void {
    const page = (event.target as HTMLInputElement).value;
    const pageNumber = parseInt(page, 10);
    if (pageNumber && pageNumber >= 1 && pageNumber <= this.totalPages && pageNumber !== this.currentPage) {
      this.currentPage = pageNumber;
      this.changePage(this.currentPage);
    }
  }

}
