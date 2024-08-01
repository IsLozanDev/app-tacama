import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
// import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfJsViewerModule, PdfJsViewerComponent } from 'ng2-pdfjs-viewer';
// import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

@Component({
  selector: 'app-report-view',
  standalone: true,
  imports: [CommonModule, PdfJsViewerModule],
  templateUrl: './ReportView.component.html',
  styleUrl: './ReportView.component.css',
})
export class ReportViewComponent {

  // @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand!: PdfJsViewerComponent;

  @ViewChild('pdfViewerOnDemand') public embeddedPdfViewer!: PdfJsViewerComponent;

/**
 *
 */
// constructor() {
//   this.embeddedPdfViewer = new PdfJsViewerComponent();

// }
  pdfSrc: any;
  base64: any;

  @Input() set setPdf(value: any) {

    if (value) {
       this.pdfSrc = value;
      console.log('valuePdf',value);

      this.embeddedPdfViewer.pdfSrc = this.pdfSrc;
      this.embeddedPdfViewer.refresh();
    }


    // if (value.startsWith('data:application/pdf;base64,')) {
    //   this.base64 = value;
    //   this.pdfSrc = value.replace('data:application/pdf;base64,', '');
    // }


  }

  /**
   *
   */
  onDocumentLoad(value: any) {
    // this.pdfViewerOnDemand.pdfSrc  = this.pdfSrc;

    // console.log(this.embeddedPdfViewer);

    // console.log('onDocumentLoad', value);




  }
}
