import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleThemeComponent } from './toggle-theme';

describe('ToggleThemeComponent', () => {
  let component: ToggleThemeComponent;
  let fixture: ComponentFixture<ToggleThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleThemeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleThemeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
