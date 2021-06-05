import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarandbrandadminpanelComponent } from './carandbrandadminpanel.component';

describe('CarandbrandadminpanelComponent', () => {
  let component: CarandbrandadminpanelComponent;
  let fixture: ComponentFixture<CarandbrandadminpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarandbrandadminpanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarandbrandadminpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
