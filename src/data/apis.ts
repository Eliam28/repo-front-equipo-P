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
    description: "Visualiza órdenes y productos de Odoo.",
    count: 2,
  },
  {
    id: "prestashop",
    title: "Prestashop",
    description: "Visualiza catálogos, pedidos y clientes de Prestashop.",
    count: 3,
  },
  {
    id: "wordpress",
    title: "WordPress",
    description: "Visualiza contenido y recursos de WordPress.",
    count: 0,
  },
];

export const totalEndpoints = apiSections.reduce(
  (sum, section) => sum + section.count,
  0,
);
