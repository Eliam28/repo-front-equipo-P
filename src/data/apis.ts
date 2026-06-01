export type ApiSection = {
  id: "odoo" | "prestashop" | "wordpress";
  title: string;
  description: string;
  count: number;
};

export const apiSections: ApiSection[] = [
  {
    id: "odoo",
    title: "Odoo",
    description: "Revisa órdenes, productos, categorías y proveedores.",
    count: 4,
  },
  {
    id: "prestashop",
    title: "Prestashop",
    description: "Revisa clientes, proveedores, productos, órdenes y pagos.",
    count: 5,
  },
  {
    id: "wordpress",
    title: "WordPress",
    description: "Sección en proceso de implementación.",
    count: 0,
  },
];

export const totalEndpoints = apiSections.reduce(
  (sum, section) => sum + section.count,
  0,
);
