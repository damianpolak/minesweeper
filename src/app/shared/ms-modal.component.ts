import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Modal } from 'src/app/core/interfaces/global.interface';

@Component({
  selector: 'ms-modal',
  template: `
    <div class="modal" [style.width]="width">
      <ng-content></ng-content>
    </div>
    <div class="blackened" (click)="onBlackenedClick()"></div>
  `,
  styles: [`
    :host {
      width: 100%;
      height: 100%;
    }

    :host, .modal {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    :host > .modal {
      font-weight: bold;
      font-size: 1.2rem;
      text-shadow: 2px 2px #2c0c0c;
      background-color: var(--primary-bgcolor);
      padding: 1rem;
      z-index: 99;
      gap: 1rem;
      border-image: url("../../assets/gfx/border.png") 10 / 10px round;
      border-image-outset: 8px;
      user-select: none;
      padding: 1rem 2.5rem;
    }

    :host > .blackened {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.634);
      width: 100%;
      height: 100%;
      z-index: 98;
    }
  `]
})
export class MsModalComponent {


  /**
   * @TODO Hmm.. it's doesn't work. Don't know why.
   */
  // @HostBinding('class.modal') get _width() {
  //   return this.width;
  // }

  @HostBinding('style.display') get _visible() {
    return this.visible ? 'flex':  'none';
  }

  @Input() visible: boolean = false;
  @Input() width: string = 'auto';
  @Output() onClose: EventEmitter<Modal.EventMessage> = new EventEmitter<Modal.EventMessage>();
  @Output() onAction: EventEmitter<Modal.EventMessage> = new EventEmitter<Modal.EventMessage>();

  public onBlackenedClick(): void {
    this.visible = false;
    this.onClose.emit({
      event: 'onClose',
    })
  }
}
