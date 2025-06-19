import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasingContractDetailComponent } from './leasing-contract-detail.component';

describe('LeasingContractDetailComponent', () => {
  let component: LeasingContractDetailComponent;
  let fixture: ComponentFixture<LeasingContractDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeasingContractDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeasingContractDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
