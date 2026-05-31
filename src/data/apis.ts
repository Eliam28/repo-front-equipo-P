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
    description: "Prueba órdenes y después agrega más endpoints aquí.",
    count: 4,
  },
  {
    id: "prestashop",
    title: "Prestashop",
    description: "Visualiza catálogos, pedidos y clientes de Prestashop.",
    count: 5,
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
