import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubRepoComponent } from './github-repo';

describe('GithubRepoComponent', () => {
  let component: GithubRepoComponent;
  let fixture: ComponentFixture<GithubRepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubRepoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubRepoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
