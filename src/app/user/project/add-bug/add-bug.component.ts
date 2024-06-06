import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-bug',
  standalone: true,
  imports: [],
  templateUrl: './add-bug.component.html',
  styleUrl: './add-bug.component.css'
})
export class AddBugComponent {

  @Input() isOpen:boolean= false;
  @Output() close = new EventEmitter<void>();



  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }



}
