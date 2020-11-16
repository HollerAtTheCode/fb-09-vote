import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingCompletedComponent } from './voting-completed.component';

describe('VotingCompletedComponent', () => {
  let component: VotingCompletedComponent;
  let fixture: ComponentFixture<VotingCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
