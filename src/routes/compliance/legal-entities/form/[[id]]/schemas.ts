import { z } from 'zod';
import type { components } from '$lib/openapi/adminapi.schema';
import {
    countryOptionsValues,
    genderOptionsValues,
    kybStatusOptionsValues,
    onboardingModeOptionsValues,
} from '$utils/form';

export const createIndividualSchema = z.object({
    kyb_status: z.enum(kybStatusOptionsValues),
    onboarding_mode: z.enum(onboardingModeOptionsValues),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    alias_names: z.string().array(),
    gender: z.enum(genderOptionsValues),
    nationalities: z.enum(countryOptionsValues).array(),
    birth_country: z.enum(countryOptionsValues),
    birth_date: z.string().date(),
    residence_country: z.enum(countryOptionsValues),
    identity_document_type: z.string().min(1),
    identity_document_number: z.string().min(1),
    identity_document_issue_date: z.string().date(),
    identity_document_expiry_date: z.string().date(),
    sources_of_fund: z.string().array(),
    addresses: z.array(
        z.object({
            address_line_one: z.string().optional(),
            address_line_two: z.string().optional(),
            city: z.string().optional(),
            state_region: z.string().optional(),
            postal_code: z.string().optional(),
            country: z.enum(countryOptionsValues),
        }),
    ),
}) satisfies z.ZodType<Omit<components['schemas']['CreateLegalEntityIndividual'], 'entity_type'>>;

export const updateIndividualSchema = createIndividualSchema.merge(
    z.object({
        addresses: z.array(
            z.object({
                id: z.string().optional(),
                address_line_one: z.string().optional(),
                address_line_two: z.string().optional(),
                city: z.string().optional(),
                state_region: z.string().optional(),
                postal_code: z.string().optional(),
                country: z.enum(countryOptionsValues),
            }),
        ),
    }),
) satisfies z.ZodType<Omit<components['schemas']['UpdateLegalEntityIndividual'], 'entity_type'>>;

export type CreateIndividualSchema = typeof createIndividualSchema;
export type UpdateIndividualSchema = typeof updateIndividualSchema;

export const createCorporateSchema = z.object({
    kyb_status: z.enum(kybStatusOptionsValues),
    onboarding_mode: z.enum(onboardingModeOptionsValues),
    company_name: z.string().min(1),
    alias_names: z.string().array(),
    trade_names: z.string().array(),
    former_registered_names: z.string().array(),
    incorporation_date: z.string().date(),
    incorporation_number: z.string().min(1),
    incorporation_country: z.enum(countryOptionsValues),
    operation_countries: z.enum(countryOptionsValues).array(),
    websites: z.string().array(),
    industry: z.string().min(1),
    mcc_codes: z.string().array(),
    business_activities: z.string().array(),
    sources_of_fund: z.string().array(),
    addresses: z.array(
        z.object({
            address_line_one: z.string().optional(),
            address_line_two: z.string().optional(),
            city: z.string().optional(),
            state_region: z.string().optional(),
            postal_code: z.string().optional(),
            country: z.enum(countryOptionsValues),
        }),
    ),
}) satisfies z.ZodType<Omit<components['schemas']['CreateLegalEntityCorporate'], 'entity_type'>>;

export const updateCorporateSchema = createCorporateSchema.merge(
    z.object({
        addresses: z.array(
            z.object({
                id: z.string().optional(),
                address_line_one: z.string().optional(),
                address_line_two: z.string().optional(),
                city: z.string().optional(),
                state_region: z.string().optional(),
                postal_code: z.string().optional(),
                country: z.enum(countryOptionsValues),
            }),
        ),
    }),
) satisfies z.ZodType<Omit<components['schemas']['UpdateLegalEntityCorporate'], 'entity_type'>>;

export type CreateCorporateSchema = typeof createCorporateSchema;
export type UpdateCorporateSchema = typeof updateCorporateSchema;
