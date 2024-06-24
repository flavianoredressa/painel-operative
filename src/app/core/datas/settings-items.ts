import {
  CircleUserRound,
  ClipboardList,
  Coins,
  FolderGit2,
  ListTodo,
  ReceiptText,
  Tags,
  UserCog,
  Users
} from 'lucide-angular';

export const SettingsItems = [
  {
    group: 'Administradores',
    items: [{ url: '/', label: 'Administradores', icon: UserCog }]
  },
  {
    group: 'Gestão de tarefas',
    items: [
      { url: '/project-type', label: 'Tipo de Projeto', icon: FolderGit2 },
      { url: '/activity', label: 'Tarefa', icon: ClipboardList },
      { url: '/status-task', label: 'Status Tarefa', icon: ListTodo },
      { url: '/tags', label: 'Etiquetas', icon: Tags }
    ]
  },
  {
    group: 'Gestão de Colaboradores',
    items: [
      { url: '/collaborator', label: 'Colaboradores', icon: Users },
      { url: '/user-types', label: 'Tipo de usuário', icon: CircleUserRound }
    ]
  },
  {
    group: 'Comissões e Transações',
    items: [
      { url: '/cost-center', label: 'Centro de Custo', icon: Coins },
      { url: '/checklists', label: 'Checklist', icon: ReceiptText },
      { url: '/status-sales', label: 'Status Vendas' },
      { url: '/charge-type', label: 'Tipo de cobrança' }
    ]
  }
];
