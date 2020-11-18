import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      problemsInHomeOffice: new FormArray([]),
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

  onProblemChange(e, checked) {
    const value = e.target.outerText;
    if (checked) {
      this.problemsInHomeOffice.value.push(value);
    }
    else {
      this.problemsInHomeOffice.value.forEach((v, i) => {
        if (v === value) {
          this.problemsInHomeOffice.value.splice(i, 1);
        }
      });
    }
    console.log(this.problemsInHomeOffice.value);
    console.log(e.target.outerText);
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
    return this.votingForm.get("problemsInHomeOffice") as FormArray;
  }

}
