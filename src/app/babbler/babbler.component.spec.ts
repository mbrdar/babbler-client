import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabblerComponent } from './babbler.component';

describe('BabblerComponent', () => {
  let component: BabblerComponent;
  let fixture: ComponentFixture<BabblerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabblerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabblerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
