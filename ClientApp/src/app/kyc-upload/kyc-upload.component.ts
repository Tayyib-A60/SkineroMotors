import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Photo } from '../models/Photo.model';
import { Vehicle } from '../models/vehicle.model';
import { PhotoService } from '../services/photo.service';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-kyc-upload',
  templateUrl: './kyc-upload.component.html',
  styleUrls: ['./kyc-upload.component.css']
})
export class KycUploadComponent implements OnInit {

  vehicleId: number;
  vehicle: Vehicle;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileInput2') fileInput2: ElementRef;
  @ViewChild('videoInput') videoInput: ElementRef;
  input: string;
  accountId: string;
  response: any;

  photos: Photo[];
  currentPage = 'photos';
  detailsTab = false;
  photosTab = true;
  progress: number;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private photoService: PhotoService,
    private vehicleService: VehicleService) {
      // route.params.subscribe(p => {
      //   this.vehicleId = +p['id'];
      //   if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
      //     router.navigate(['/vehicles']);
      //     return;
      //   }
      // });
     }

  ngOnInit() {
    // this.getVehicle();
    // this.photoService.getPhotos(this.vehicleId).subscribe(photos =>
    //   this.photos = photos as Photo[]
    //   );
  }
  private getVehicle() {
    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v as Vehicle,
        err => {
          if (err.status === 404) {
            this.router.navigate(['/vehicles']);
            return;
          }
        });
  }
  changePage(page) {
    this.currentPage = page;
    if (page === 'details') {
      this.detailsTab = true;
      this.photosTab = false;
    }
    if (page === 'photos') {
      this.detailsTab = false;
      this.photosTab = true;
    }
  }

  onDocUpload(){
    let nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    const file = nativeElement.files[0];
    nativeElement = '' as any;
    console.log(file);
  }

  onPhotoUpload() {
    let nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    const file = nativeElement.files[0];
    nativeElement = '' as any;

    // let nativeElement2: HTMLInputElement = this.fileInput2.nativeElement;
    // const file2 = nativeElement2.files[0];
    // nativeElement = '' as any;

    let nativeVideoElement: HTMLInputElement = this.videoInput.nativeElement;
    const videoFile = nativeVideoElement.files[0];
    nativeVideoElement = '' as any;

    console.log(videoFile);


    var data = {
      'documentType': 'passport',
      'inputs': this.input,
      'AccountId': this.accountId
    };

    this.photoService.uploadKycDocs(data, file, videoFile)
    .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
             console.log('Request sent');
             this.toastr.success('Kyc Docs uploaded succesfully', 'Success');
            break;
          case HttpEventType.UploadProgress:
            const percentage = Math.round(100 * event.loaded / event.total);
            this.progress = percentage;
            break;
          case HttpEventType.Response:
            // this.photos.push(event.body);
            console.log(event);
            this.response = event.body;
            this.toastr.success('Kyc Docs uploaded succesfully', 'Success');
        }
    }, err => {
      console.log('Error', err);
      console.log(err.error);
      this.toastr.error(err.error, 'Error');
    });
  }
}
