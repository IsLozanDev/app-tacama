import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  showModal: boolean = false;

  @Output() onAccept = new EventEmitter<any>();

  @Input() title!: string;
  @Input() menssage: string = 'Aviso';
  @Input() type!: string | null;

  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  openModal() {
    this.dialog.nativeElement.showModal();
    this.dialog.nativeElement.classList.add('opened');
  }

  closeModal() {
    this.dialog.nativeElement.close();
    this.dialog.nativeElement.classList.remove('opened');
  }

  aceptar() {
    this.onAccept.emit({ tipo: this.type, result: true });
    this.closeModal();
  }
}
