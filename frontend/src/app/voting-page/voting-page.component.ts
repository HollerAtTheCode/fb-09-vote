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

  public submitted = false;

  constructor(private fb: FormBuilder, private votingService: VotingService, private router: Router) {
    this.votingForm = fb.group({
      branche: ['0', Validators.required],
      homeOffice: ['0', Validators.required],
      prepForHomeOffice: ['0', Validators.required],
      equipmentForHomeOffice: [''],
      requirementsForHomeOffice: [''],
      problemsInHomeOffice: new FormArray([]),
      customProblems: [''],
      workInHomeOffice: ['0', Validators.required],
      qualificationForHomeOffice: [''],
      communicationChange: [''],
      rulesOfFutureHomeOffice: [''],
      savedTravelTime: ['0', Validators.required],
      gender: ['0', Validators.required],
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
    this.submitted = true;
    console.log(this.votingForm.value);
    if (this.votingForm.valid) {
      this.votingService.vote(this.votingForm.value).subscribe((resp) => {
        if (resp.changedRows === 1) {
          localStorage.removeItem('authToken');
          this.router.navigate(['/voting-completed']);
        }
      });
    }
  }

  //Getter
  get problemsInHomeOffice(){
    return this.votingForm.get("problemsInHomeOffice") as FormArray;
  }

}
