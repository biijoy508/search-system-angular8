import { Component, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';



interface UrvalValues {
  myndighet: string[];
}

interface Urval {
  myndighet: string;
}

@Component({
  selector: 'app-mass-hantering',
  templateUrl: './mass-hantering.component.html',
  styleUrls: ['./mass-hantering.component.scss']
})
export class MassHanteringComponent implements AfterViewInit {
  arendeSomKommerAttPaverkas = 2200;
  showSpinner = false;
  successStatus = false;
  urvalValuesHolder: UrvalValues = {
    myndighet: ['']
  };

  urval: Urval = {
    myndighet:''
  };

  constructor(private apiService: ApiService) { }

  ngAfterViewInit() {
    this.hamtaMyndighetFranIntr();
  }


  hamtaMyndighetFranIntr() {
    this.apiService.getData(environment.myndighetUrl).subscribe((data: any) => {
      for (let i=0; i < data.length; i++) {
        this.urvalValuesHolder.myndighet.push(data[i].namn);
      }
    });
  }

  changearendeSomKommerAttPaverkas() {
    this.arendeSomKommerAttPaverkas = this.arendeSomKommerAttPaverkas - 145;
  }

  andraStatus() {
    this.toogleSpinner();
    setTimeout(() => {
      this.toogleSpinner();
      this.tooglesuccessBanner();
    }, 3500);
  }
  toogleSpinner() {
    this.showSpinner = !this.showSpinner;
  }
  tooglesuccessBanner() {
    this.successStatus = !this.successStatus;
  }

}
