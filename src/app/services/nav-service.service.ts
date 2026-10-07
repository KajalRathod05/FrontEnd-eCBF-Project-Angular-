import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-items';
import { MenuModule } from '../models/menu-master';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavServiceService {

   menuItems: MenuItem[] = [];
   private menuLoadedSubject = new BehaviorSubject<boolean>(false);
   menuLoaded$ = this.menuLoadedSubject.asObservable();

  setMenuItems(menuItems: MenuItem[]): void {
    this.menuItems = menuItems;
    console.log('MENU ITEMS WITH PERMISSIONS:', this.menuItems);
    this.menuLoadedSubject.next(true);
  }

  getMenuItems(): MenuItem[] {
    return this.menuItems;
  }

  clearMenuItems(): void {
    this.menuItems = [];
    this.menuLoadedSubject.next(false);
  }

   hasPermission( pagetypeid: number,operation: 'ADD' | 'EDIT' | 'VIEW' | 'DELETE'): boolean {
    
    for (const module of this.menuItems) {

      const master = module.children?.find(
        item => Number(item.pagetypeid) === Number(pagetypeid)
      );

      if (master) {

        switch (operation) {

          case 'ADD':
            return Number(master.addopn) === 1;

          case 'EDIT':
            return Number(master.editopn) === 1;

          case 'VIEW':
            return Number(master.viewopn) === 1;

          case 'DELETE':
            return Number(master.deleteopn) === 1;
        }
      }
    }
    return false;
  }

  convertMenuToMenuItems(menu: MenuModule[]): MenuItem[] {
  return menu.map(module => {
    return {
      title: module.modulename,
      icon: module.icon,
      moduleid: module.moduleid,

      children: module.masters.map(master => {
        return {
          title: master.mastername,
          icon: master.icon,
          route: `/pages/${master.filename.toLowerCase()}`,
          moduleid: module.moduleid,
          pagetypeid: master.pagetypeid,
          addopn: master.addopn,
          editopn: master.editopn,
          viewopn: master.viewopn,
          deleteopn: master.deleteopn
        };
      })
    };
  });
}
}
