import { ResourceBase } from '@interfaces/resource-base.interface';

export interface Location extends ResourceBase {
  type: string;
  dimension: string;
  residents: string[];
}
