import type { BusinessCategory } from "@/types/business.types";

export const businessCategoryLabels: Record<BusinessCategory, string> = {
  food: "Alimentos",
  fashion: "Moda",
  textile: "Textil",
  beauty: "Belleza",
  regional_products: "Productos regionales",
  logistics: "Logística",
  services: "Servicios",
  packaging: "Empaque",
  other: "Otro",
};

export default function BusinessCategoryBadge({ category }: { category: BusinessCategory }) {
  return (
    <span className="inline-flex rounded-full bg-[#e8e9e2] px-2.5 py-1 text-xs font-semibold text-[#42493f]">
      {businessCategoryLabels[category]}
    </span>
  );
}
