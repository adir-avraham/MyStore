import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GalleryService } from 'src/app/services/gallery/gallery.service';

interface PassedData {
  productNameParam: string;
}


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  public images: Array<any> = [];
  public resultMessage: string = null;
  get param() { return this.passedData.productNameParam };
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: PassedData, private galleryService: GalleryService) { }
  

  ngOnInit(): void {
  
    this.galleryService.searchImages(this.param).subscribe((res: any)=> {
      if (!res || !res.data || ! res.data.image) {
        return this.resultMessage = `We're sorry! We couldn't find any result for ${this.param}. Please
         try another query or try later.`
      }
      this.images = res.data.map((image: any) => {
        const { url } = image.assets.large_thumb;
        return { url };
      })
    }); 
  
  }

};