import type { Actions, PageServerLoad } from './$types.js';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
    // corporate
    company_name: z.string().min(2),
    incorporation_date: z.string().date(),
    incorporation_number: z.string().min(2),
    incorporation_country: z.string().min(1),
    operation_country: z.string().min(1),
    industry: z.string().min(1),
    mcc_code: z.string().min(1),
    business_activity: z.string().min(1),

    // individual
    first_name: z.string().min(2),
    gender: z.string().min(1),
    nationality: z.string().min(1),
    birth_country: z.string().min(1),
    residence_country: z.string().min(1),
    identity_document_type: z.string().min(1),
    identity_document_number: z.string().min(1),
    identity_document_issue_date: z.string().date(),
    identity_document_expiry_date: z.string().date(),

    source_of_fund: z.string().min(1),
    onboarding_mode: z.string().min(1),
});

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(schema)),
    };
};

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(schema));

        if (!form.valid) return fail(400, { form });

        return message(form, 'Customer created sucessfully!');
    },
};
