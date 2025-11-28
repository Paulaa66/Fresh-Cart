import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { PopularProductsComponent } from './components/popular-products/popular-products.component';
import { PopularCategoriesComponent } from './components/popular-categories/popular-categories.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MainSliderComponent,
    PopularProductsComponent,
    PopularCategoriesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
