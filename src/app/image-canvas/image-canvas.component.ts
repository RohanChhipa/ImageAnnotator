import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {finalize, map, switchMap, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-image-canvas',
  templateUrl: './image-canvas.component.html',
  styleUrls: ['./image-canvas.component.scss'],
})
export class ImageCanvasComponent implements AfterViewInit {

  @Input() imageSrc: string;

  @ViewChild('canvas')
  imageCanvas: ElementRef;

  annotations = [];
  isDrawing = false;

  ngAfterViewInit(): void {
    const divCanvas = this.imageCanvas.nativeElement;
    fromEvent(divCanvas, 'mousedown')
      .pipe(
        tap((x: MouseEvent) => {
          this.isDrawing = true;
          this.annotations.push({
            top: this.calculateSizeRatio(x.offsetY, divCanvas.offsetHeight),
            left: this.calculateSizeRatio(x.offsetX, divCanvas.offsetWidth),
            width: 0,
            height: 0,
          });
        }),
        switchMap(
          start => fromEvent(divCanvas, 'mousemove')
            .pipe(
              finalize(() => this.isDrawing = false),
              takeUntil(fromEvent(divCanvas, 'mouseup')),
              takeUntil(fromEvent(divCanvas, 'mouseleave')),
              map(end => [start, end]),
            ),
        ),
      ).subscribe((value: MouseEvent[]) => {

      const dx = value[1].offsetX - value[0].offsetX;
      const dy = value[1].offsetY - value[0].offsetY;

      const lastBlock = this.annotations[this.annotations.length - 1];
      if (dy < 0) {
        lastBlock.top = this.calculateSizeRatio(value[1].offsetY, divCanvas.offsetHeight);
      }

      if (dx < 0) {
        lastBlock.left = this.calculateSizeRatio(value[1].offsetX, divCanvas.offsetWidth);
      }

      lastBlock.height = Math.abs(this.calculateSizeRatio(dy, divCanvas.offsetHeight));
      lastBlock.width = Math.abs(this.calculateSizeRatio(dx, divCanvas.offsetWidth));
    });
  }

  private calculateSizeRatio(innerCoordinate: number, parentSize: number): number {
    return (innerCoordinate / parentSize) * 100;
  }
}
