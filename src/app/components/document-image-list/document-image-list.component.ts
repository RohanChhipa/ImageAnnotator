import { Component } from '@angular/core';
import { Annotation } from 'src/app/models/annotation.model';

@Component({
    selector: 'ai-document-image-list',
    templateUrl: './document-image-list.component.html',
    styleUrls: ['./document-image-list.component.scss'],
})
export class DocumentImageListComponent {

    images = [
        '../assets/images/kim2007-1.png',
        '../assets/images/kim2007-2.png',
        '../assets/images/kim2007-3.png',
        '../assets/images/kim2007-4.png',
        '../assets/images/kim2007-5.png',
    ];

    public onAnnotationClick(annotation: Annotation): void {
        console.log(annotation);
    }
}
