import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent {
  item: any = {};

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.apiService.getItemById(id).subscribe((data) => {
          this.item = data;
          console.log(this.item)
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  formatYear(year: string): string {
    // return `${year.slice(0, 4)}-${year.slice(4, 6)}-${year.slice(6)}`;
    return moment(year, 'YYYYMMDD').format('DD/MM/YYYY');
  }
}
