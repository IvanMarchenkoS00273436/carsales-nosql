import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarApiService } from '../../services/car-api.service';
import { ICar, NewCar } from '../../interfaces/car';
import { CarComponent } from '../car/car.component';


@Component({
  selector: 'app-carlist',
  imports: [CommonModule, CarComponent],
  templateUrl: './carlist.component.html',
  styleUrl: './carlist.component.css'
})
export class CarlistComponent {
  carsData: ICar|any;
  show: boolean = false;

  constructor(private _carApiService: CarApiService) { }

  ngOnInit() {
    this.getCars()
  }

  getCars() {
    this._carApiService.getCarDetails().subscribe(carsData =>
      { this.carsData = carsData
    });
  }

  addCar(make:string, model:string, year:string,imageUrl:string):boolean {
    let addCar:ICar;
    addCar=new NewCar(make,model, year,imageUrl);
    this._carApiService.addCarDetails(addCar).subscribe(carsData => {
      this.carsData = carsData;
      this.getCars();
    });
    
    return false;
  }

  refreshCars() {
    this.getCars();
  }
}
