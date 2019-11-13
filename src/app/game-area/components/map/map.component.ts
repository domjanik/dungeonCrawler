import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    Component,
    HostListener, OnDestroy,
    OnInit, QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {KeylistenerDirective} from "./keylistener.directive";
import {KeyBoardService} from "../../services/key-board-service.service";
import {Subscription} from "rxjs";
import {MapElement} from "./MapElement";

@Component({
    selector: 'dc-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, OnDestroy, AfterViewChecked {

    @ViewChild('canvas', {static: false}) canvasElem;
    @ViewChildren(KeylistenerDirective) inputs: QueryList<KeylistenerDirective>;
    @HostListener('onkeydown') keydown = (value) => {
        this.move(value)
    };

    ctx: CanvasRenderingContext2D;
    position = {
        x: 10,
        y: 10
    };

    maxHeight: number = 300;
    maxWidth: number = 300;
    movementSpeed = 5;
    kbSubscription: Subscription;
    elements: MapElement[] = [];
    constructor(private keyboardService: KeyBoardService) {
        this.generateRandomElements();
    }

    ngAfterViewChecked(): void {
        this.canvasElem.nativeElement.focus();
        this.ctx = this.canvasElem.nativeElement.getContext('2d');
        this.maxWidth = this.canvasElem.nativeElement.clientWidth;
        this.maxHeight = this.canvasElem.nativeElement.clientHeight;

        this.render();
    }

    ngOnInit(): void {
        this.kbSubscription = this.keyboardService.keyBoard.subscribe(res => {
            this.move(res)
        })
    }

    ngOnDestroy(): void {
        this.kbSubscription.unsubscribe();
    }

    move(object) {
        switch (object.action) {
            case "UP":
                console.log("UP");
                if ((this.position.y - this.movementSpeed) * 4 < 0) return;
                this.position.y -= this.movementSpeed;
                break;
            case "DOWN":
                console.log("DOWN");
                if ((this.position.y + this.movementSpeed + 10) * 4 > this.maxHeight) return;
                this.position.y += this.movementSpeed;
                break;
            case "LEFT":
                console.log("LEFT");
                if ((this.position.x - this.movementSpeed) * 2 < 0) return;
                this.position.x -= this.movementSpeed;
                break;
            case "RIGHT":
                console.log("RIGHT");
                if ((this.position.x + this.movementSpeed + 20) * 2 > this.maxWidth) return;
                this.position.x += this.movementSpeed;
                break;
        }

        this.render();
    }

    generateRandomElements() {
        for(let i=0; i < 10; i++) {
            let x  = Math.ceil(Math.random() % this.maxHeight * this.maxHeight);
            let y  = Math.ceil(Math.random() % this.maxWidth * this.maxWidth);
            const elem = new MapElement(x, y, '#999999');
            this.elements.push(elem);
        }
    }

    render() {
        this.ctx.clearRect(0, 0, 700, 700);
        this.ctx.save();
        this.ctx.fillRect(this.position.x, this.position.y, 20, 10);
        this.ctx.fillStyle = "#00AA00";

        this.elements.forEach(elem => {
            this.ctx.fillRect(elem.x, elem.y, 20, 10);
            this.ctx.fillStyle = elem.bgColor;
        })
    }
}
