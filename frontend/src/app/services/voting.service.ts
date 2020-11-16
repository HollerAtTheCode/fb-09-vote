import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  private baseUrl = 'https://tarifrunde-mittelfranken.de:8080';

  constructor(private http: HttpClient) { }

  public vote(votingForm: any): Observable<any> {
    const vote = votingForm.vote;
    const comment = votingForm.comment;

    const token = localStorage.getItem("authToken");
    const requestBody = {
      vote,
      comment,
      token
    };
    return this.http.post(this.baseUrl + '/vote', requestBody);
  }
}
