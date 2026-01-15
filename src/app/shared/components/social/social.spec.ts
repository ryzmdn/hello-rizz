import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialComponent } from './social';

describe('SocialComponent', () => {
  let component: SocialComponent;
  let fixture: ComponentFixture<SocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
