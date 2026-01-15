import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDialog } from './video-dialog';

describe('VideoDialog', () => {
  let component: VideoDialog;
  let fixture: ComponentFixture<VideoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
