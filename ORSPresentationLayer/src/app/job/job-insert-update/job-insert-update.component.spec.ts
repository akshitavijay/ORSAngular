import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobInsertUpdateComponent } from './job-insert-update.component';

describe('JobInsertUpdateComponent', () => {
  let component: JobInsertUpdateComponent;
  let fixture: ComponentFixture<JobInsertUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobInsertUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
