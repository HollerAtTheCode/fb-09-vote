import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'https://fb09bayern.de:8080';

  constructor(private http: HttpClient) { }


  public authorize(authToken: string): Observable<any> {
    const requestBody = {
      token: authToken
    };
    return this.http.post(this.baseUrl + '/authorize', requestBody);
  }

}
