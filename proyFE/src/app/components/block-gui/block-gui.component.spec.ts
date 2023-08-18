import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockGUIComponent } from './block-gui.component';

describe('BlockGUIComponent', () => {
  let component: BlockGUIComponent;
  let fixture: ComponentFixture<BlockGUIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockGUIComponent]
    });
    fixture = TestBed.createComponent(BlockGUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
