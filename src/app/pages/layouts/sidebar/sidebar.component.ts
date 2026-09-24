import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../../../models/menu-items';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input() isMobile = false;
  @Input() activeModule: MenuItem | null = null;
  @Output() logout = new EventEmitter<void>();

}
