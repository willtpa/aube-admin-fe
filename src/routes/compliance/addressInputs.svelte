<div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
	<div class="col-span-full">
		<label for="address_line_one" class="block text-sm font-medium text-gray-700"
			>Address Line One</label
		>
		<input
			type="text"
			id="address_line_one"
			name="address_line_one"
			required
			class="input input-bordered w-full"
		/>
	</div>
	<div class="col-span-full">
		<label for="address_line_two" class="block text-sm font-medium text-gray-700"
			>Address Line Two</label
		>
		<input
			type="text"
			id="address_line_two"
			name="address_line_two"
			required
			class="input input-bordered w-full"
		/>
	</div>
	<div class="col-span-3">
		<label for="city" class="block text-sm font-medium text-gray-700">City</label>
		<input type="text" id="city" name="city" required class="input input-bordered w-full" />
	</div>
	<div class="col-span-3">
		<label for="state_region" class="block text-sm font-medium text-gray-700">State/Region</label>
		<input
			type="text"
			id="state_region"
			name="state_region"
			required
			class="input input-bordered w-full"
		/>
	</div>
	<div class="col-span-3">
		<label for="postal_zip_code" class="block text-sm font-medium text-gray-700"
			>Postal/Zip Code</label
		>
		<input
			type="text"
			id="postal_zip_code"
			name="postal_zip_code"
			required
			class="input input-bordered w-full"
		/>
	</div>
	<div class="col-span-3">
		<label for="country" class="block text-sm font-medium text-gray-700">Country</label>
		<select id="trade_name" name="trade_name" required class="select select-bordered w-full">
			<option>Select Country</option>
		</select>
	</div>
</div>
