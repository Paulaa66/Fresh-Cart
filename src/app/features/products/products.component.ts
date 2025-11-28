import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductsService } from '../../core/services/products/products.service';
import { Product } from '../../core/models/product.interface';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  // Inject ProductsService to access product APIs
  private readonly productsService = inject(ProductsService);

  productsList: Product[] = [];
  isLoading = false;
  errorMessage = '';
  skeletons = Array.from({ length: 8 });
  pageSize!: number;
  p!: number;
  total!: number;

  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData(pageNumber: number = 1): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.productsService.getAllProducts(pageNumber).subscribe({
      next: (res: any) => {
        this.productsList = (res?.data ?? []) as Product[];
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
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
