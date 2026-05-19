import { useEffect, useMemo, useState } from "react";
import {
  getBusinessActivities,
  getBusinessKpis,
  getBusinessOnboardingTasks,
  getBusinesses,
} from "@/services/businesses.service";
import type {
  BusinessActivity,
  BusinessCategory,
  BusinessKpi,
  BusinessOnboardingTask,
  BusinessStatus,
  IntermediatedBusiness,
} from "@/types/business.types";

export type BusinessStatusFilter = BusinessStatus | "all";
export type BusinessCategoryFilter = BusinessCategory | "all";

export const businessStatusOptions: Array<{ value: BusinessStatusFilter; label: string }> = [
  { value: "all", label: "Todos los estados" },
  { value: "active", label: "Activo" },
  { value: "onboarding", label: "En onboarding" },
  { value: "needs_attention", label: "Requiere atención" },
  { value: "paused", label: "Pausado" },
  { value: "inactive", label: "Inactivo" },
];

export const businessCategoryOptions: Array<{ value: BusinessCategoryFilter; label: string }> = [
  { value: "all", label: "Todas las categorías" },
  { value: "food", label: "Alimentos" },
  { value: "fashion", label: "Moda" },
  { value: "textile", label: "Textil" },
  { value: "beauty", label: "Belleza" },
  { value: "regional_products", label: "Productos regionales" },
  { value: "logistics", label: "Logística" },
  { value: "services", label: "Servicios" },
  { value: "packaging", label: "Empaque" },
  { value: "other", label: "Otro" },
];

export function useBusinesses() {
  const [isLoading, setIsLoading] = useState(true);
  const [businesses, setBusinesses] = useState<IntermediatedBusiness[]>([]);
  const [kpis, setKpis] = useState<BusinessKpi[]>([]);
  const [activities, setActivities] = useState<BusinessActivity[]>([]);
  const [onboardingTasks, setOnboardingTasks] = useState<BusinessOnboardingTask[]>([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<BusinessStatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<BusinessCategoryFilter>("all");
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      setIsLoading(true);
      const [businessesData, kpisData, activitiesData, tasksData] = await Promise.all([
        getBusinesses(),
        getBusinessKpis(),
        getBusinessActivities(),
        getBusinessOnboardingTasks(),
      ]);

      if (!mounted) return;

      setBusinesses(businessesData);
      setKpis(kpisData);
      setActivities(activitiesData);
      setOnboardingTasks(tasksData);
      setSelectedBusinessId((prev) => prev ?? businessesData[0]?.id ?? null);
      setIsLoading(false);
    };

    void loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredBusinesses = useMemo(() => {
    const term = searchText.trim().toLowerCase();

    return businesses.filter((business) => {
      const matchesText =
        term.length === 0 ||
        business.name.toLowerCase().includes(term) ||
        business.ownerName.toLowerCase().includes(term) ||
        business.location.toLowerCase().includes(term) ||
        business.tags.some((tag) => tag.toLowerCase().includes(term));

      const matchesStatus = statusFilter === "all" || business.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || business.category === categoryFilter;

      return matchesText && matchesStatus && matchesCategory;
    });
  }, [businesses, categoryFilter, searchText, statusFilter]);

  useEffect(() => {
    if (filteredBusinesses.length === 0) {
      setSelectedBusinessId(null);
      return;
    }

    const selectedStillVisible = filteredBusinesses.some((business) => business.id === selectedBusinessId);
    if (!selectedStillVisible) {
      setSelectedBusinessId(filteredBusinesses[0].id);
    }
  }, [filteredBusinesses, selectedBusinessId]);

  const selectedBusiness = useMemo(
    () => filteredBusinesses.find((business) => business.id === selectedBusinessId) ?? null,
    [filteredBusinesses, selectedBusinessId],
  );

  const selectedBusinessActivities = useMemo(() => {
    if (!selectedBusiness) return [];
    return activities.filter((activity) => activity.businessId === selectedBusiness.id).slice(0, 4);
  }, [activities, selectedBusiness]);

  const selectedBusinessTasks = useMemo(() => {
    if (!selectedBusiness) return [];
    return onboardingTasks.filter((task) => task.businessId === selectedBusiness.id);
  }, [onboardingTasks, selectedBusiness]);

  const visibleOnboardingTasks = useMemo(() => onboardingTasks.slice(0, 6), [onboardingTasks]);
  const visibleActivities = useMemo(() => activities.slice(0, 6), [activities]);

  const clearFilters = () => {
    setSearchText("");
    setStatusFilter("all");
    setCategoryFilter("all");
  };

  return {
    isLoading,
    businesses,
    filteredBusinesses,
    kpis,
    activities: visibleActivities,
    onboardingTasks: visibleOnboardingTasks,
    selectedBusiness,
    selectedBusinessActivities,
    selectedBusinessTasks,
    selectedBusinessId,
    setSelectedBusinessId,
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    clearFilters,
    statusOptions: businessStatusOptions,
    categoryOptions: businessCategoryOptions,
  };
}
