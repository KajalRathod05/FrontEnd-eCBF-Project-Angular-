export interface MenuMaster {
  pagetypeid: number;
  mastername: string;
  icon: string;
  filename: string;

  addopn: number;
  editopn: number;
  viewopn: number;
  deleteopn: number;
}

export interface MenuModule {
  moduleid: number;
  modulename: string;
  icon: string;
  masters: MenuMaster[];
}