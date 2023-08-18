import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlockGUIService } from 'src/app/services/gui/blockGUI/block-gui.service';

@Component({
  selector: 'app-block-gui',
  templateUrl: './block-gui.component.html',
  styleUrls: ['./block-gui.component.css']
})
export class BlockGUIComponent {
  isBlocked: boolean = false;
  private subscription: Subscription;

  constructor(private blockGUIService: BlockGUIService) {
    this.subscription = this.blockGUIService.isBlocked$.subscribe((isBlocked) => {
      this.isBlocked = isBlocked;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
