import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  data: any[] = [];
  error: string = '';
  isGridView: boolean = false;
  searchText: string = '';
  filteredType: string = '';
  editingItem: any = null;
  sort: string = 'asc';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiService.getData().subscribe({
      next: (response) => {
        this.data = response.results;
        this.error = '';
      },
      error: (err) => {
        this.error = 'Failed to load data. Please try again.';
        console.error(err);
      },
    });
  }

  toggleView(): void {
    this.isGridView = !this.isGridView;
  }

  clearSearch(): void {
    this.searchText = '';
  }

  toggleSort(): void {
    this.sort = this.sort === 'asc' ? 'desc' : 'asc';
  }

  sortedData(): any[] {
    const data = this.filterData();
    return data.sort((a, b) => {
      const nameA = a.Title.toLowerCase();
      const nameB = b.Title.toLowerCase();
      if (this.sort === 'asc') {
        return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
      } else {
        return nameA < nameB ? 1 : nameA > nameB ? -1 : 0;
      }
    });
  }

  filterByType(type: string): void {
    this.filteredType = type;
  }

  getUniqueTypes(): string[] {
    return [...new Set(this.data.map((item) => item.Type))];
  }

  filterData(): any[] {
    return this.data
      .filter((item) =>
        this.filteredType ? item.Type === this.filteredType : true
      )
      .filter(
        (item) =>
          item.Title.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.Year.includes(this.searchText)
      );
  }

  formatYear(year: string): string {
    return moment(year, 'YYYYMMDD').format('DD/MM/YYYY');
  }

  editName(item: any): void {
    this.editingItem = { ...item };
  }

  updateItem(item: any): void {
    if (item.Title !== this.editingItem.Title) {
      this.apiService.updateItem(this.editingItem).subscribe({
        next: (response) => {
          item.Title = this.editingItem.Title;
          this.editingItem = null;
        },
        error: (err) => {
          console.error('Error update:', err);
          this.editingItem = null;
        },
      });
    } else {
      this.editingItem = null;
    }
  }

  goToItemDetail(id: string): void {
    this.router.navigate(['/item', id]);
  }
}
