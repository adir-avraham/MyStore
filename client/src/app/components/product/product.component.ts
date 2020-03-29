import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Category, CategoriesRes } from '../navbar-categories/navbar-categories.component';
import { ProductsService, UpdatedProductsRes } from 'src/app/services/products/products.service';
import { Product } from '../shopping-page/shopping-page.component';
import { Subscription } from 'rxjs';
import { GalleryService } from 'src/app/services/gallery/gallery.service';
import { GalleryComponent } from '../gallery/gallery.component';
import { MatDialog } from '@angular/material/dialog';


interface UpdatedProduct {
  product_id: string;
  name: string;
  price: number;
  image: string;
  category_id: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit, OnDestroy {

  public productForm: FormGroup;
  public categories: Array<Category>;
  public editMode = true;
  public selectedProduct: Product;
  public unsubscribeSelectedProduct: Subscription;
  public product_id: string;
  public requiredMsg = "Field is required.";
  public arrayOfImages = [];
  get productName() { return this.productForm.get('name').value };
  @Output() onClose = new EventEmitter();
  
  constructor(private formBuilder: FormBuilder, private categoriesService: CategoriesService, 
    private productsService: ProductsService, private galleryService: GalleryService, private dialog: MatDialog) { 
    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      image: [null, Validators.required],
      category_id: null
    })
  };

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((categoriesRes: CategoriesRes) => {
      const { categories } = categoriesRes;
      this.categories = categories; 
    }, error =>{
      console.log(error.message);
    })

    this.unsubscribeSelectedProduct = this.productsService.selectedProduct.subscribe((selectedProduct: Product) => {
      this.editMode = true;
      const { name, price, image, category_id, _id } = selectedProduct;
      this.productForm.get('name').setValue(name);
      this.productForm.get('price').setValue(price);
      this.productForm.get('image').setValue(image);
      this.productForm.get('category_id').setValue(category_id);
      this.product_id = _id;
    })

  };

  createProduct() {  
    const newProduct: Product = {
      name: this.productForm.get('name').value,
      price: this.productForm.get('price').value,
      image: this.productForm.get('image').value,
      category_id: this.productForm.get('category_id').value
    }
    
    this.productsService.createProduct(newProduct).subscribe((updatedProductsRes: UpdatedProductsRes)=>{
      const { products, status } = updatedProductsRes;
      if (status) {
        alert('create product success');
        this.productsService.products.next(products);
        this.productForm.reset();
      }
    }, error => {
      console.log(error.message);
    });
  }

  editProduct() {
    const editedProduct: UpdatedProduct = {
      name: this.productForm.get('name').value,
      price: this.productForm.get('price').value,
      image: this.productForm.get('image').value,
      category_id: this.productForm.get('category_id').value,
      product_id: this.product_id
    }
    
    this.productsService.editProduct(editedProduct).subscribe((updatedProductsRes: UpdatedProductsRes)=>{
      const { products, status } = updatedProductsRes;
      if (status) {
        alert('edit product success');
        this.productsService.products.next(products);
        this.productForm.reset();
        this.productForm.touched;
      }
    }, error => {
      console.log(error.message);
    });
  }

  openGallery() {
    const productNameParam = this.productForm.get('name').value;
    
    const dialogRef = this.dialog.open(GalleryComponent, {data: {
      productNameParam: productNameParam
    }})
    dialogRef.afterClosed().subscribe((imageUrl: string) => {
      if (!imageUrl) return;
      this.productForm.get('image').setValue(imageUrl);
    })
  
  }

  
  createMode() {
    this.editMode = false;
    this.productForm.reset();
  };

  
  closeSideBar() {
    this.onClose.emit();
  };
  

  ngOnDestroy() {
    this.unsubscribeSelectedProduct.unsubscribe();
  };


};