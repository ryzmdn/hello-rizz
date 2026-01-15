import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGreetings } from './button-greetings';

describe('ButtonGreetings', () => {
  let component: ButtonGreetings;
  let fixture: ComponentFixture<ButtonGreetings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonGreetings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonGreetings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
