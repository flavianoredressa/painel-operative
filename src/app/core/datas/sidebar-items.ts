import { PieChart, UserCog } from 'lucide-angular';

import { NavItem } from '@interfaces/nav-item';

export const SidebarItems: NavItem[] = [
  {
    icon: PieChart,
    name: 'Visão Geral',
    url: '/dashboard'
  },
  {
    icon: UserCog,
    name: 'Admins',
    url: '/admins'
  }
];
