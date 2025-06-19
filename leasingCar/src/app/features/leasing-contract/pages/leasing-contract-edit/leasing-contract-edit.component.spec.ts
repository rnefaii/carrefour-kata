import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasingContractEditComponent } from './leasing-contract-edit.component';

describe('LeasingContractEditComponent', () => {
  let component: LeasingContractEditComponent;
  let fixture: ComponentFixture<LeasingContractEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeasingContractEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeasingContractEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
