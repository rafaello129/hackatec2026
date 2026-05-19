import {
  businessActivitiesMock,
  businessKpisMock,
  businessOnboardingTasksMock,
  businessesMock,
} from "@/data/mocks/businesses.mock";
import type {
  BusinessActivity,
  BusinessKpi,
  BusinessOnboardingTask,
  IntermediatedBusiness,
} from "@/types/business.types";

export async function getBusinesses(): Promise<IntermediatedBusiness[]> {
  return businessesMock;
}

export async function getBusinessById(id: string): Promise<IntermediatedBusiness | undefined> {
  return businessesMock.find((business) => business.id === id);
}

export async function getBusinessKpis(): Promise<BusinessKpi[]> {
  return businessKpisMock;
}

export async function getBusinessActivities(): Promise<BusinessActivity[]> {
  return businessActivitiesMock;
}

export async function getBusinessActivitiesByBusinessId(businessId: string): Promise<BusinessActivity[]> {
  return businessActivitiesMock.filter((activity) => activity.businessId === businessId);
}

export async function getBusinessOnboardingTasks(): Promise<BusinessOnboardingTask[]> {
  return businessOnboardingTasksMock;
}

export async function getBusinessOnboardingTasksByBusinessId(businessId: string): Promise<BusinessOnboardingTask[]> {
  return businessOnboardingTasksMock.filter((task) => task.businessId === businessId);
}
