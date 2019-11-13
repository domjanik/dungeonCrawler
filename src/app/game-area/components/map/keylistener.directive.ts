import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';
import {KeyBoardService} from "../../services/key-board-service.service";

@Directive({
  selector: '[dcKeylistener]'
})
export class KeylistenerDirective {
  constructor(private keyboardService: KeyBoardService, public element: ElementRef, private render: Renderer2) {
    this.render.setAttribute(this.element.nativeElement, "tabindex", "0")
  }


  @HostListener('keydown', ['$event']) onKeyUp(e) {

    switch (e.keyCode) {
      case 38:
        this.keyboardService.sendMessage({ element: this.element, action: 'UP' })
        break;
      case 37:
        this.keyboardService.sendMessage({ element: this.element, action: 'LEFT' })
        break;
      case 40:
        this.keyboardService.sendMessage({ element: this.element, action: 'DOWN' })
        break;
      case 39:
        this.keyboardService.sendMessage({ element: this.element, action: 'RIGHT' })
        break;
    }
  }
}
