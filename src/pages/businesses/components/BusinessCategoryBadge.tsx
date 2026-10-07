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
    <span className="inline-flex rounded-full bg-[#F5F7F2] px-2.5 py-1 text-[9px] font-medium text-[#667169]">
      {businessCategoryLabels[category]}
    </span>
  );
}
