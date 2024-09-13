// Options for the select fields
import type { components } from '$lib/openapi/adminapi.schema';
import { getCountryDataList, type TCountryCode } from 'countries-list';

export const kybStatusOptions: { label: string; value: components['schemas']['KybStatus'] }[] = [
    { value: 'accepted', label: 'Accepted' },
    { value: 'pending', label: 'Pending' },
    { value: 'rejected', label: 'Rejected' },
];

export const kybStatusOptionsValues = kybStatusOptions.map((option) => option.value) as [
    components['schemas']['KybStatus'],
    ...components['schemas']['KybStatus'][],
];

export const onboardingModeOptions: {
    label: string;
    value: components['schemas']['OnboardingMode'];
}[] = [
    { value: 'face_to_face', label: 'Face to Face' },
    { value: 'non_face_to_face', label: 'Non Face to Face' },
];

export const onboardingModeOptionsValues = onboardingModeOptions.map((option) => option.value) as [
    components['schemas']['OnboardingMode'],
    ...components['schemas']['OnboardingMode'][],
];

export const genderOptions: { label: string; value: components['schemas']['Gender'] }[] = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
];

export const genderOptionsValues = genderOptions.map((option) => option.value) as [
    components['schemas']['Gender'],
    ...components['schemas']['Gender'][],
];

export const relatedPartyRoleOptions: {
    label: string;
    value: components['schemas']['RelatedPartyRoles'];
}[] = [
    { value: 'director', label: 'Director' },
    { value: 'shareholder', label: 'Shareholder' },
    { value: 'ultimate_beneficial_owner', label: 'Ultimate beneficial owner' },
    { value: 'other', label: 'Other' },
    { value: 'unknown', label: 'Unknown' },
];

export const relatedPartyRoleOptionsValues = relatedPartyRoleOptions.map(
    (option) => option.value,
) as [components['schemas']['RelatedPartyRoles'], ...components['schemas']['RelatedPartyRoles'][]];

export const ownershipStructureOptions: { label: string; value: string }[] = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3 or more' },
];

export const ownershipStructureOptionsValues = ownershipStructureOptions.map(
    (option) => option.value,
) as [string, ...string[]];

export const countryOptions: { label: string; value: components['schemas']['CountryCode2'] }[] =
    getCountryDataList()
        .map((country) => ({ label: country.name, value: country.iso2 }))
        .filter((option) => option.value !== 'XK') as {
        label: string;
        value: Exclude<TCountryCode, 'XK'>;
    }[];

export const countryOptionsValues = countryOptions.map((option) => option.value) as [
    components['schemas']['CountryCode2'],
    ...components['schemas']['CountryCode2'][],
];
