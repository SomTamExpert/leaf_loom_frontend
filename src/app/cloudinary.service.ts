import {Injectable} from '@angular/core';
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private cld: Cloudinary;
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
    this.cld = new Cloudinary({
      cloud: { cloudName: 'dfbgeujx7' }
    });
  }

  public upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'vjqybkxu');
    const filename = file.name.replace(/\.[^/.]+$/, "");
    console.log("filename: " + filename);
    formData.append("public_id", filename);
    formData.append("timestamp", "1315060510");

    const url = `https://api.cloudinary.com/v1_1/dfbgeujx7/upload`; // Cloudinary upload URL

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  public getCloudinaryImage(imageName: string): CloudinaryImage {
    return this.cld.image(imageName);
  }

}
