import {
  BadgeDollarSign,
  Blocks,
  CreditCard,
  HelpCircle,
  Home,
  PackageSearch,
  Settings,
  UserRoundCog,
  Users,
  Workflow
} from 'lucide-angular';

import { NavItem } from '@interfaces/nav-item';

export const SidebarItems: NavItem[] = [
  {
    icon: Home,
    name: 'Dashboard',
    url: '/dashboard'
  },
  {
    icon: UserRoundCog,
    name: 'Admins',
    url: '/admins'
  },
  {
    icon: CreditCard,
    name: 'Cartões',
    url: '/cards'
  },
  {
    icon: Workflow,
    name: 'Utils',
    url: '/utils'
  },
  {
    icon: Users,
    name: 'Usuários',
    url: '/users'
  },
  {
    icon: PackageSearch,
    name: 'Produtos',
    url: '/products'
  },
  {
    icon: BadgeDollarSign,
    name: 'Status Vendas',
    url: '/status-sales'
  }
];

export const SidebarOthersItems: NavItem[] = [
  {
    icon: Blocks,
    name: 'Integrations',
    url: '/integrations'
  },
  {
    icon: Settings,
    name: 'Configurações',
    url: '/configs'
  },
  {
    icon: HelpCircle,
    name: 'Get Help',
    url: '/help'
  }
];
