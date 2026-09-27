import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../../../models/menu-items';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() isMobile = false;
  @Input() username: string | null = '';
  @Input() menuItems: MenuItem[] = [];
  @Input() selectedModule: MenuItem | null = null;

  @Output() toggleDrawer = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
  @Output() moduleSelected = new EventEmitter<MenuItem>();

  selectModule(item: MenuItem): void {
    this.moduleSelected.emit(item);
  }
}
