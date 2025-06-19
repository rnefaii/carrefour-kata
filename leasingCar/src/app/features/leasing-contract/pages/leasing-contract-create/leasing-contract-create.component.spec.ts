import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasingContractCreateComponent } from './leasing-contract-create.component';

describe('LeasingContractCreateComponent', () => {
  let component: LeasingContractCreateComponent;
  let fixture: ComponentFixture<LeasingContractCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeasingContractCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeasingContractCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
