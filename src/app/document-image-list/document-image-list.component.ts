import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-document-image-list',
    templateUrl: './document-image-list.component.html',
    styleUrls: ['./document-image-list.component.scss'],
})
export class DocumentImageListComponent implements OnInit, OnDestroy {

    images = [
        '../assets/images/kim2007-1.png',
        '../assets/images/kim2007-2.png',
        '../assets/images/kim2007-3.png',
        '../assets/images/kim2007-4.png',
        '../assets/images/kim2007-5.png',
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    documentImageLoaded(documentIndex: number) {
        console.log(documentIndex);
    }
}
