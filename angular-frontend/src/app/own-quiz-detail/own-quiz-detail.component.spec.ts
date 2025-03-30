import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnQuizDetailComponent } from './own-quiz-detail.component';

describe('OwnQuizDetailComponent', () => {
  let component: OwnQuizDetailComponent;
  let fixture: ComponentFixture<OwnQuizDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnQuizDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnQuizDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
