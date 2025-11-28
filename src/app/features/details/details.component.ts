import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { Product } from '../../core/models/product.interface';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetailsService);

  //here i identify if as a string but it need initial value so its string or null and null = null for initial value too.
  id: string | null = null;

  // changeImage(src): void {
  //   document.getElementById('mainImage').src = src;
  // }

  productDetails: Product = {} as Product;

  ngOnInit(): void {
    this.getProductId();
    this.getProductDetailsData();
  }

  //To get id from URL using ActivatedRoute and saving it inside id property
  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.id = urlParams.get('id');
      },
    });
  }

  //After Getting the id using getProductId function passing it to getProductDetail Service to send it to API to get details of the specific product
  getProductDetailsData(): void {
    this.productDetailsService.getProductDetails(this.id).subscribe({
      next: (res) => {
        this.productDetails = res.data;
        console.log(this.productDetails);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
