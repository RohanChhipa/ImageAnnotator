import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ImageCanvasComponent} from './image-canvas/image-canvas.component';
import {DocumentImageListComponent} from './document-image-list/document-image-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageCanvasComponent,
    DocumentImageListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
