import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { Product } from '../../../../core/models/product.interface';
import { ProductsService } from '../../../../core/services/products/products.service';

@Component({
  selector: 'app-popular-products',
  imports: [ProductCardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit {
  // Inject ProductsService to access product APIs
  private readonly productsService = inject(ProductsService);

  productsList: Product[] = [];
  isLoading = false;
  errorMessage = '';
  skeletons = Array.from({ length: 8 });

  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.productsService.getAllProducts().subscribe({
      next: (res: any) => {
        this.productsList = (res?.data ?? []) as Product[];
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Failed to load products. Please try again.';
        this.isLoading = false;
      },
    });
  }

  trackByProductId(item: Product): string {
    return item._id || item.id;
  }
}
