import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Category, CategoriesRes } from '../navbar-categories/navbar-categories.component';
import { ProductsService, UpdatedProductsRes } from 'src/app/services/products/products.service';
import { Product } from '../shopping-page/shopping-page.interfaces';
import { Subscription } from 'rxjs';
import { GalleryService } from 'src/app/services/gallery/gallery.service';
import { GalleryComponent } from '../gallery/gallery.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';


interface UpdatedProduct {
  product_id: string;
  name: string;
  price: number;
  image: string;
  category_id: string;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

export class ProductFormComponent implements OnInit, OnDestroy {

  public productForm: FormGroup;
  public categories: Array<Category>;
  public editMode = true;
  public selectedProduct: Product;
  public unsubscribeSelectedProduct: Subscription;
  public product_id: string;
  public requiredMsg = "Field is required.";
  public arrayOfImages = [];
  public images: Array<any> = [];
  public resultMessage: string = null;
  public openSidebar: boolean;
  public openSidebarSub: Subscription;
  get productName() { return this.productForm.get('name').value };
  
  constructor(private formBuilder: FormBuilder, private categoriesService: CategoriesService, 
    private productsService: ProductsService, private galleryService: GalleryService, 
    private dialog: MatDialog, private sidebarSevice: SidebarService) { 
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
      if (!selectedProduct) return;
      this.editMode = true;
      const { name, price, image, category_id, _id } = selectedProduct;
      this.productForm.get('name').setValue(name);
      this.productForm.get('price').setValue(price);
      this.productForm.get('image').setValue(image);
      this.productForm.get('category_id').setValue(category_id);
      this.product_id = _id;
    })

    this.openSidebarSub = this.sidebarSevice.openSidebar.subscribe((openSidebar: boolean) => {
      this.openSidebar = openSidebar;
    });

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
        const message = "Product has been saved successfully!";
        this.successResponse(products, message);
      } else {
        this.failureResponse();
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
        const message = "Changes have been saved successfully!"
        this.successResponse(products, message);
      } else {
        this.failureResponse();
      }
    }, error => {
      console.log(error.message);
    });
  }

  successResponse(products: Array<Product>, message: string) {
    this.productsService.products.next(products);
    this.productForm.reset();
    this.dialog.open(AlertComponent, {
      width: '450px',
      data: {
      message: message,
      title: "Success"
    }})
  }

  failureResponse() {
    this.dialog.open(AlertComponent, {
      width: '450px',
      data: {
      message: "We're sorry! Something went wrong. Please make sure you complete the form.",
      title: "Failure"
    }})
  }
  
  openGallery() {
    const productNameParam = this.productForm.get('name').value;
    
    this.galleryService.searchImages(productNameParam).subscribe((res: any)=> {
      if (!res.data.length) {
        this.resultMessage = `We're sorry! We couldn't find any result for ${productNameParam}. Please
        try another query or try later.`
      } 
      this.images = res.data.map((image: any) => {
      const { url } = image.assets.large_thumb;
      return { url };
      })
      this.passDataToGallery(productNameParam);
      }, error => {
      this.resultMessage = `We're sorry! There was something wrong with the API. Please try again later.`;
      this.passDataToGallery(productNameParam);
      console.log(error.message)
    }); 

  }

  passDataToGallery(productNameParam: string) {
    const dialogRef = this.dialog.open(GalleryComponent, {data: {
      productNameParam: productNameParam,
      resultMessage: this.resultMessage,
      images: this.images
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
    this.sidebarSevice.openSidebar.next(false);
  };
  
  ngOnDestroy() {
    this.unsubscribeSelectedProduct.unsubscribe();
    this.openSidebarSub.unsubscribe();
  };

};