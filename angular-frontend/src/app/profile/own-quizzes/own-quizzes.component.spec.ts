import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnQuizzesComponent } from './own-quizzes.component';

describe('OwnQuizzesComponent', () => {
  let component: OwnQuizzesComponent;
  let fixture: ComponentFixture<OwnQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnQuizzesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
