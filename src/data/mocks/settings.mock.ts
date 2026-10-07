import type {
  BusinessProfile,
  ConnectedService,
  SettingsAlert,
  TeamMember,
  UsageMetric,
} from "@/types/settings.types";

export const businessProfileMock: BusinessProfile = {
  id: "profile-peek",
  companyName: "MÁAK",
  industry: "sustainable_technology",
  website: "maak.com",
  description:
    "Plataforma empresarial para coordinar clientes, inventario, finanzas y oportunidades cooperativas entre negocios aliados.",
  logoUrl: `${import.meta.env.BASE_URL}brand/maak-logo.svg`,
  logoAlt: "Logo de MÁAK",
};

export const teamMembersMock: TeamMember[] = [
  {
    id: "team-001",
    name: "Marcus Thorne",
    email: "m.thorne@maak.com",
    role: "owner",
    status: "active",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "team-002",
    name: "Elena Rodriguez",
    email: "elena.r@maak.com",
    role: "admin",
    status: "active",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "team-003",
    name: "Samual Kim",
    email: "s.kim@maak.com",
    role: "editor",
    status: "active",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
  },
];

export const connectedServicesMock: ConnectedService[] = [
  {
    id: "svc-cloud-storage",
    name: "Cloud Storage",
    description: "Sincroniza documentos empresariales.",
    iconName: "cloud",
    connected: true,
    category: "storage",
  },
  {
    id: "svc-finance-hub",
    name: "Finance Hub",
    description: "Administra facturacion y cobranza.",
    iconName: "credit-card",
    connected: true,
    category: "finance",
  },
  {
    id: "svc-slack",
    name: "Slack Integration",
    description: "Notificaciones del equipo en tiempo real.",
    iconName: "message-square",
    connected: false,
    category: "communication",
  },
  {
    id: "svc-email-alerts",
    name: "Email Alerts",
    description: "Reglas de correo para eventos criticos.",
    iconName: "mail",
    connected: true,
    category: "communication",
  },
];

export const usageMetricsMock: UsageMetric[] = [
  {
    id: "usage-storage",
    label: "Storage Used",
    value: "42.8",
    limit: "100",
    unit: "GB",
    percentage: 43,
    iconName: "database",
  },
  {
    id: "usage-projects",
    label: "Active Projects",
    value: "14",
    limit: "20",
    unit: "Seats",
    percentage: 70,
    iconName: "users",
  },
  {
    id: "usage-api",
    label: "API Requests",
    value: "92k",
    limit: "250k",
    unit: "requests",
    percentage: 37,
    iconName: "zap",
  },
];

export const settingsAlertsMock: SettingsAlert[] = [
  {
    id: "alert-instant",
    title: "Instant Alerts",
    description: "Recibe notificaciones prioritarias para cambios criticos del sistema y permisos del equipo.",
    actionLabel: "Configurar reglas de correo",
    type: "success",
  },
];
