import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteHomeComponent } from './vote-home.component';

describe('VoteHomeComponent', () => {
  let component: VoteHomeComponent;
  let fixture: ComponentFixture<VoteHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
