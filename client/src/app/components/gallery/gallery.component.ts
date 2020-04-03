import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GalleryService } from 'src/app/services/gallery/gallery.service';

interface PassedData {
  productNameParam: string;
  images: string;
  resultMessage: string;
}


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  get images() {return this.passedData.images};
  get resultMessage() {return this.passedData.resultMessage};
  get param() { return this.passedData.productNameParam };
  
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: PassedData, private galleryService: GalleryService) { }


  ngOnInit(): void {
  
  }


};