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
    count: 2,
  },
  {
    id: "prestashop",
    title: "Prestashop",
    description: "Espacio reservado para catálogos, pedidos y clientes.",
    count: 0,
  },
  {
    id: "wordpress",
    title: "WordPress",
    description: "Espacio reservado para contenido y recursos.",
    count: 0,
  },
];

export const totalEndpoints = apiSections.reduce(
  (sum, section) => sum + section.count,
  0,
);
