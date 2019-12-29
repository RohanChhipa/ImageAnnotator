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

  @ViewChild('canvas', {static: false})
  imageCanvas: ElementRef;

  annotations = [];
  public isDrawing = false;

  ngAfterViewInit(): void {
    const divCanvas = this.imageCanvas.nativeElement;
    fromEvent(divCanvas, 'mousedown')
      .pipe(
        tap((x: MouseEvent) => {
          this.isDrawing = true;
          this.annotations.push({
            top: (x.offsetY / divCanvas.offsetHeight) * 100,
            left: (x.offsetX / divCanvas.offsetWidth) * 100,
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
      const dx = ((value[1].offsetX - value[0].offsetX) / divCanvas.offsetWidth) * 100;
      const dy = ((value[1].offsetY - value[0].offsetY) / divCanvas.offsetHeight) * 100;

      const lastBlock = this.annotations[this.annotations.length - 1];

      lastBlock.height = Math.abs(dy);
      lastBlock.width = Math.abs(dx);

      // if (dx < 0) {
      //   lastBlock.left = value[1].offsetX;
      // }
      //
      // if (dy < 0) {
      //   lastBlock.top = value[1].offsetY;
      // }
    });
  }
}
