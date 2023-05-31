import { Component, OnInit } from '@angular/core';
import { FooterService } from '../../services/footer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public name: string = '2D';

  constructor(private footerService: FooterService) { }

  ngOnInit() {
    this.footerService.getTwoF().subscribe({
        next: (result: any) => {
          this.name = result.data.getTwoF.name;
        },
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    }); 
  }

}
