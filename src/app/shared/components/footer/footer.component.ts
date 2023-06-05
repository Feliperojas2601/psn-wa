import { Component, OnInit } from '@angular/core';
import { FooterService } from '../../services/footer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public name: string = '2C';
  public price: number = 0;

  constructor(private footerService: FooterService) { }

  ngOnInit() {
    this.footerService.getProduct().subscribe({
        next: (result: any) => {
          this.name = result.data.getProduct.name;
          this.price = result.data.getProduct.price;
        },
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    }); 
  }

}
