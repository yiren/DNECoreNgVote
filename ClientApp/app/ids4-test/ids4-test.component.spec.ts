import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ids4TestComponent } from './ids4-test.component';

describe('Ids4TestComponent', () => {
  let component: Ids4TestComponent;
  let fixture: ComponentFixture<Ids4TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ids4TestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ids4TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
