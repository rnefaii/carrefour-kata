import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CustomerListComponent } from './customer-list.component';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let mockCustomerService: jasmine.SpyObj<CustomerService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const dummyCustomers = [
    {
      id: '1',
      firstName: 'Alice',
      lastName: 'Smith',
      username: 'alice',
      email: 'alice@example.com',
      phone: '123456789',
      driverLicenseNumber: 'DL123',
      active: true,
    }
  ];

  beforeEach(async () => {
    mockCustomerService = jasmine.createSpyObj('CustomerService', ['getAllCustomers']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CustomerListComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressBarModule,
        MatChipsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: CustomerService, useValue: mockCustomerService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown component tags like <mat-chip>
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load customers on init', fakeAsync(() => {
    mockCustomerService.getAllCustomers.and.returnValue(of(dummyCustomers));
    fixture.detectChanges(); // triggers ngOnInit
    tick();

    expect(component.dataSource.data).toEqual(dummyCustomers);
    expect(component.isLoading).toBeFalse();
  }));

  it('should show error when loading fails', fakeAsync(() => {
    mockCustomerService.getAllCustomers.and.returnValue(throwError(() => new Error('API failed')));
    fixture.detectChanges();
    tick();

    expect(component.error).toBe('Failed to load customers');
    expect(component.isLoading).toBeFalse();
  }));

  it('should apply filter to dataSource', () => {
    component.dataSource.data = dummyCustomers;
    const event = { target: { value: 'alice' } } as unknown as Event;
    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('alice');
  });
});
