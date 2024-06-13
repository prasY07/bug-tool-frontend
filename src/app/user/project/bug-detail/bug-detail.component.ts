import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bug-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bug-detail.component.html',
  styleUrl: './bug-detail.component.css'
})
export class BugDetailComponent {

  @Input() isOpen: boolean = false;
  @Input() bug: any;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
