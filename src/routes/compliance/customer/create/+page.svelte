<script lang="ts">
	import AddressInputs from '../../addressInputs.svelte';

	let customerType = 'corporate';
	let corporateFieldsHidden = 'hidden';
	let individualFieldsHidden = 'hidden';
	toggleFields();
	console.log(customerType);

	function toggleFields() {
		if (customerType === 'corporate') {
			corporateFieldsHidden = '';
			individualFieldsHidden = 'hidden';
		} else if (customerType === 'individual') {
			corporateFieldsHidden = 'hidden';
			individualFieldsHidden = '';
		}
	}
</script>

<div class="mx-auto max-w-4xl mt-5">
	<h2 class="text-2xl font-bold mb-4">Create New Customer</h2>
	<form>
		<div class="grid grid-cols-4 gap-4">
			<div class="col-span-1">
				<label for="customer_type" class="block text-sm font-medium text-gray-700">Type</label>
				<select
					bind:value={customerType}
					on:change={toggleFields}
					id="customer_type"
					name="customer_type"
					required
					class="select select-bordered w-full"
				>
					<option value="">Select Type</option>
					<option value="corporate" selected>Corporate</option>
					<option value="individual">Individual</option>
				</select>
			</div>
			<!-- Individual fields -->
			<div class="col-start-1 col-span-2 {individualFieldsHidden}">
				<label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label>
				<input
					type="text"
					id="first_name"
					name="first_name"
					class="input input-bordered w-full"
					required
				/>
			</div>
			<div class="col-span-2 {individualFieldsHidden}">
				<label for="last_name" class="block text-sm font-medium text-gray-700">Last Name</label>
				<input
					type="text"
					id="last_name"
					name="last_name"
					class="input input-bordered w-full"
					required
				/>
			</div>
			<div class="col-span-4 {individualFieldsHidden}">
				<label for="alias_name" class="block text-sm font-medium text-gray-700">Alias Name</label>
				<input type="text" id="alias_name" name="alias_name" class="input input-bordered w-full" />
			</div>
			<div class="col-span-2 {individualFieldsHidden}">
				<label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
				<select id="trade_name" name="trade_name" class="select select-bordered w-full" required>
					<option>Select Gender</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="unknown">Unknown</option>
				</select>
			</div>
			<div class="col-span-2 {individualFieldsHidden}">
				<label for="nationality" class="block text-sm font-medium text-gray-700">Nationality</label>
				<select id="nationality" name="nationality" class="select select-bordered w-full" required>
					<option>Select Nationality</option>
				</select>
			</div>
			<div class="col-span-2 {individualFieldsHidden}">
				<label for="country_of_birth" class="block text-sm font-medium text-gray-700"
					>Country of Birth</label
				>
				<select
					id="country_of_birth"
					name="country_of_birth"
					class="select select-bordered w-full"
					required
				>
					<option>Select Country</option>
				</select>
			</div>
			<div class="col-span-2 {individualFieldsHidden}">
				<label for="country_of_residence" class="block text-sm font-medium text-gray-700"
					>Country of Residence</label
				>
				<select
					id="country_of_residence"
					name="country_of_residence"
					class="select select-bordered w-full"
					required
				>
					<option>Select Country</option>
				</select>
			</div>
			<div class="col-span-2 {individualFieldsHidden}">
				<label for="identity_document_type" class="block text-sm font-medium text-gray-700"
					>Identity Document Type</label
				>
				<select
					id="identity_document_type"
					name="identity_document_type"
					class="select select-bordered w-full"
					required
				>
					<option>Select Type</option>
				</select>
			</div>
			<div class="col-span-2 {individualFieldsHidden}">
				<label for="identity_document_number" class="block text-sm font-medium text-gray-700"
					>Identity Document Number</label
				>
				<input
					type="text"
					id="identity_document_number"
					name="identity_document_number"
					class="input input-bordered w-full"
					required
				/>
			</div>
			<div class="col-span-2 {individualFieldsHidden}">
				<label for="identity_document_issued_at" class="block text-sm font-medium text-gray-700"
					>Identity Document Issued Date</label
				>
				<input
					type="date"
					id="identity_document_issued_at"
					name="identity_document_issued_at"
					class="input input-bordered w-full"
					required
				/>
			</div>
			<div class="col-span-2 {individualFieldsHidden}">
				<label for="identity_document_expires_at" class="block text-sm font-medium text-gray-700"
					>Identity Expiry Date</label
				>
				<input
					type="date"
					id="identity_document_expires_at"
					name="identity_document_expires_at"
					required
					class="input input-bordered w-full"
				/>
			</div>

			<!-- Corporate fields -->
			<div class="col-span-full {corporateFieldsHidden}">
				<label for="legal_entity_name" class="block text-sm font-medium text-gray-700"
					>Company Name</label
				>
				<input
					type="text"
					id="legal_entity_name"
					name="legal_entity_name"
					class="input input-bordered w-full"
					required
				/>
			</div>
			<div class="col-span-full {corporateFieldsHidden}">
				<label for="alias_name" class="block text-sm font-medium text-gray-700">Alias Name</label>
				<input type="text" id="alias_name" name="alias_name" class="input input-bordered w-full" />
			</div>
			<div class="col-span-full {corporateFieldsHidden}">
				<label for="trade_name" class="block text-sm font-medium text-gray-700">Trade Name</label>
				<input type="text" id="trade_name" name="trade_name" class="input input-bordered w-full" />
			</div>
			<div class="col-span-full {corporateFieldsHidden}">
				<label for="former_registered_name" class="block text-sm font-medium text-gray-700"
					>Former Registered Name</label
				>
				<input
					type="text"
					id="former_registered_name"
					name="former_registered_name"
					class="input input-bordered w-full"
				/>
			</div>
			<div class="col-span-2 {corporateFieldsHidden}">
				<label for="trade_name" class="block text-sm font-medium text-gray-700">Industry</label>
				<select id="trade_name" name="trade_name" class="select select-bordered w-full" required>
					<option>Select Industry</option>
				</select>
			</div>
			<div class="col-span-2 {corporateFieldsHidden}">
				<label for="business_registration_number" class="block text-sm font-medium text-gray-700"
					>Business Registration Number</label
				>
				<input
					type="text"
					id="business_registration_number"
					name="business_registration_number"
					class="input input-bordered w-full"
					required
				/>
			</div>
			<div class="col-span-2 {corporateFieldsHidden}">
				<label for="country_of_operation" class="block text-sm font-medium text-gray-700"
					>Country of Operation</label
				>
				<select
					id="country_of_operation"
					name="country_of_operation"
					class="select select-bordered w-full"
					required
				>
					<option>Select Country</option>
					<option>Singapore</option>
					<option>Singapore</option>
				</select>
			</div>
			<div class="col-span-2 {corporateFieldsHidden}">
				<label for="country_of_incorporation" class="block text-sm font-medium text-gray-700"
					>Country of Incorporation</label
				>
				<select
					id="country_of_incorporation"
					name="country_of_incorporation"
					class="select select-bordered w-full"
					required
				>
					<option>Select Country</option>
				</select>
			</div>
			<div class="col-span-2 {corporateFieldsHidden}">
				<label for="incorporated_at" class="block text-sm font-medium text-gray-700"
					>Date of Incorporation</label
				>
				<input
					type="date"
					id="incorporated_at"
					name="incorporated_at"
					class="input input-bordered w-full"
					required
				/>
			</div>
			<div class="col-span-2 {corporateFieldsHidden}">
				<label for="mcc_code" class="block text-sm font-medium text-gray-700">MCC Code</label>
				<input
					type="text"
					id="mcc_code"
					name="mcc_code"
					class="input input-bordered w-full"
					required
				/>
			</div>
			<div class="col-span-full {corporateFieldsHidden}">
				<label for="website" class="block text-sm font-medium text-gray-700">Website</label>
				<input type="text" id="website" name="website" class="input input-bordered w-full" />
			</div>
			<div class="col-span-full {corporateFieldsHidden}">
				<label for="business_activity" class="block text-sm font-medium text-gray-700"
					>Business Activity</label
				>
				<input
					type="text"
					id="business_activity"
					name="business_activity"
					class="input input-bordered w-full"
					required
				/>
			</div>
			<div class="col-span-2">
				<label for="source_of_funds" class="block text-sm font-medium text-gray-700"
					>Source of Funds</label
				>
				<select
					id="source_of_funds"
					name="country_of_incorporation"
					class="select select-bordered w-full"
					required
				>
					<option>Select</option>
				</select>
			</div>
			<div class="col-span-2">
				<label for="onboarding_mode" class="block text-sm font-medium text-gray-700"
					>Onboarding mode</label
				>
				<select
					id="onboarding_mode"
					name="onboarding_mode"
					class="select select-bordered w-full"
					required
				>
					<option>Select</option>
				</select>
			</div>
			<div class="col-span-2">
				<!-- <label class="label cursor-pointer"> -->
				<input type="checkbox" checked="checked" class="checkbox checkbox-info" />
				<span class="label-text text-left">Active</span>
				<!-- </label> -->
			</div>

			<!-- Address -->
			<div class="col-span-full mt-5">
				<div class="divider divider-start">Address</div>
				<AddressInputs />
			</div>
			<div class="col-span-full mb-10 mt-5">
				<button
					type="submit"
					class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>Submit</button
				>
			</div>
		</div>
	</form>
</div>
