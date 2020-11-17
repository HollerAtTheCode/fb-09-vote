import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VotingService } from '../services/voting.service';

@Component({
  selector: 'app-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.scss']
})
export class VotingPageComponent implements OnInit {

  public votingForm: FormGroup;

  constructor(private fb: FormBuilder, private votingService: VotingService, private router: Router) {
    this.votingForm = fb.group({
      branche: ['', Validators.required],
      homeOffice: ['', Validators.required],
      prepForHomeOffice: ['', Validators.required],
      equipmentForHomeOffice: ['', Validators.required],
      requirementsForHomeOffice: ['', Validators.required],
      problemsInHomeOffice: ['', Validators.required],
      customProblems: [''],
      workInHomeOffice: ['', Validators.required],
      qualificationForHomeOffice: ['', Validators.required],
      communicationChange: ['', Validators.required],
      rulesOfFutureHomeOffice: ['', Validators.required],
      savedTravelTime: ['', Validators.required],
      gender: ['', Validators.required],
      expectationsFromVerdi: ['']
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.votingService.vote(this.votingForm.value).subscribe((resp) => {
      if (resp.changedRows === 1) {
        localStorage.removeItem('authToken');
        this.router.navigate(['/voting-completed']);
      }
    });
  }

  //Getter
  get problemsInHomeOffice(){
    return this.votingForm.get("problemsInHomeOffice").value;
  }

}
