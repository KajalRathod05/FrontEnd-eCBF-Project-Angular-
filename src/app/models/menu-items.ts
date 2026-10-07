export interface MenuItem {
  title: string;
  icon?: string;
  route?: string;
  children?: MenuItem[];

  moduleid?: number;
  pagetypeid?: number;

  addopn?: number;
  editopn?: number;
  viewopn?: number;
  deleteopn?: number;
}