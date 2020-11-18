import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  private baseUrl = 'https://fb09bayern.de:8080';

  constructor(private http: HttpClient) { }

  public vote(votingForm: any): Observable<any> {
    const branche = votingForm.branche;
    const homeOffice = votingForm.homeOffice;
    const prepForHomeOffice = votingForm.prepForHomeOffice;
    const equipmentForHomeOffice = votingForm.equipmentForHomeOffice;
    const requirementsForHomeOffice = votingForm.requirementsForHomeOffice;
    const problemsInHomeOffice = votingForm.problemsInHomeOffice.toString();
    const customProblems = votingForm.customProblems;
    const workInHomeOffice = votingForm.workInHomeOffice;
    const qualificationForHomeOffice = votingForm.qualificationForHomeOffice;
    const communicationChange = votingForm.communicationChange;
    const rulesOfFutureHomeOffice = votingForm.rulesOfFutureHomeOffice;
    const savedTravelTime = votingForm.savedTravelTime;
    const gender = votingForm.gender;
    const expectationsFromVerdi = votingForm.expectationsFromVerdi;

    const token = localStorage.getItem("authToken");
    const requestBody = {
      token,
      branche,
      homeOffice,
      prepForHomeOffice,
      equipmentForHomeOffice,
      requirementsForHomeOffice,
      problemsInHomeOffice,
      customProblems,
      workInHomeOffice,
      qualificationForHomeOffice,
      communicationChange,
      rulesOfFutureHomeOffice,
      savedTravelTime,
      gender,
      expectationsFromVerdi
    };
    return this.http.post(this.baseUrl + '/vote', requestBody);
  }
}
