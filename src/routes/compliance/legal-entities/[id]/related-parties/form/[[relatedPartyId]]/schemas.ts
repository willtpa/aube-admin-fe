import { z } from 'zod';
import type { components } from '$lib/openapi/adminapi.schema';
import {
    createCorporateSchema,
    createIndividualSchema,
    updateCorporateSchema,
    updateIndividualSchema,
} from '../../../../form/[[id]]/schemas';
import { ownershipStructureOptionsValues, relatedPartyRoleOptionsValues } from '$utils/form';

export const createIndividualRelatedPartySchema = createIndividualSchema
    .omit({
        sources_of_fund: true,
        onboarding_mode: true,
    })
    .merge(
        z.object({
            roles: z.enum(relatedPartyRoleOptionsValues).array(),
        }),
    ) satisfies z.ZodType<
    Omit<components['schemas']['CreateLegalEntityRelatedPartyIndividual'], 'entity_type'>
>;

export const updateIndividualRelatedPartySchema = updateIndividualSchema.merge(
    z.object({
        roles: z.enum(relatedPartyRoleOptionsValues).array(),
    }),
) satisfies z.ZodType<
    Omit<components['schemas']['UpdateLegalEntityRelatedPartyIndividual'], 'entity_type'>
>;

export type CreateIndividualRelatedPartySchema = typeof createIndividualRelatedPartySchema;
export type UpdateIndividualRelatedPartySchema = typeof updateIndividualRelatedPartySchema;

export const createCorporateRelatedPartySchema = createCorporateSchema
    .omit({
        sources_of_fund: true,
        onboarding_mode: true,
    })
    .merge(
        z.object({
            ownership_structure: z.enum(ownershipStructureOptionsValues),
            roles: z.enum(relatedPartyRoleOptionsValues).array(),
        }),
    ) satisfies z.ZodType<
    // ownership_structure needs to be a string because it's a select input
    Omit<
        components['schemas']['CreateLegalEntityRelatedPartyCorporate'],
        'entity_type' | 'ownership_structure'
    > & { ownership_structure: string }
>;

export const updateCorporateRelatedPartySchema = updateCorporateSchema.merge(
    z.object({
        ownership_structure: z.enum(ownershipStructureOptionsValues),
        roles: z.enum(relatedPartyRoleOptionsValues).array(),
    }),
) satisfies z.ZodType<
    // ownership_structure needs to be a string because it's a select input
    Omit<
        components['schemas']['UpdateLegalEntityRelatedPartyCorporate'],
        'entity_type' | 'ownership_structure'
    > & { ownership_structure: string }
>;

export type CreateCorporateRelatedPartySchema = typeof createCorporateRelatedPartySchema;
export type UpdateCorporateRelatedPartySchema = typeof updateCorporateRelatedPartySchema;
