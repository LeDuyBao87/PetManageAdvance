'use strict';
//tạo animation cho sidebar
$('#sidebar').click(function(event) {
	$(this).toggleClass('active');

});

//sau khi chọn type xong thì breed sẽ thay đổi theo type được chọn
$('#input-type').focusout(function(event) {
	let petTypeValue = $('#input-type').val();
	let breeds = localStorage.getItem('breeds') ? JSON.parse(localStorage.getItem('breeds')) : [];
	$('#input-breed').html('');

	const breedFilter = breeds.filter(function(breed, index) {
		return breed.type === petTypeValue;
	});

	console.log(breedFilter);
	breedFilter.forEach((breed, index) => {
		let breedValue = breed.breed;
		console.log(breedValue);

		let option = document.createElement('option');
		option.innerHTML = breedValue;
		$('#input-breed').append(option);

	});
});

$('#find-btn').click(function(event) {
	let idValue = $('#input-id').val();
	let nameValue = $('#input-name').val();
	let typeValue = $('#input-type').val();
	let breedValue = $('#input-breed').val();
	let vaccinatedStatus = $('#input-vaccinated').prop('checked');
	let dewormedStatus = $('#input-dewormed').prop('checked');
	let sterilizedStatus = $('#input-sterilized').prop('checked');
	let $tbody = $('#tbody');
	let tableContent = '';
	$tbody.html(tableContent);

	var vaccinatedValue = vaccinatedStatus == true? 'check': 'x';
	var dewormedValue = dewormedStatus == true? 'check': 'x';
	var sterilizedValue = sterilizedStatus == true? 'check': 'x';

	let pets = localStorage.getItem('pets') ? JSON.parse(localStorage.getItem('pets')) : [];
	console.log(pets);

	if(!idValue && !nameValue && (!breedValue || breedValue ==='Select Breed') && typeValue === 'Select Type' ){
		let petFilterVacc = pets.filter(function(pet, index) {
			return (pet.vaccinated ===vaccinatedValue && pet.dewormed === dewormedValue && pet.sterilized === sterilizedValue);
		});
		petFilterVacc.forEach((pet, index) => {
			tableContent += `<tr>
			<td>${pet.id}</td>
			<td>${pet.name}</td>
			<td>${pet.age}</td>
			<td>${pet.type}</td>
			<td>${pet.weight}</td>
			<td>${pet.length}</td>
			<td>${pet.breed}</td>
			<td><i class="bi bi-square-fill" style="color: ${pet.color}"></i></td>
			<td><i class="bi bi-${pet.vaccinated}-circle-fill"></td>
			<td><i class="bi bi-${pet.dewormed}-circle-fill"></td>
			<td><i class="bi bi-${pet.sterilized}-circle-fill"></td>
			<td>${pet.date}</td>

			</tr>`

			$tbody.html(tableContent);
		});

	} else {

		let petsFilterID = pets.filter(function(pet, index) {
			return (pet.id ===idValue);
		});

		if(petsFilterID.length === 0){
			let petsFilterName = pets.filter(function(pet, index) {
				return (pet.name ===nameValue);
			});

			if(petsFilterName.length === 0){
				let petsFilterType = pets.filter(function(pet, index) {
					return (pet.type ===typeValue);
				});

				if(petsFilterType.length === 0){
					return false;
				}
				else {
					if(!breedValue || breedValue ==='Select Breed'){
						petsFilterType.forEach((pet, index) => {
							tableContent += `<tr>
							<td>${pet.id}</td>
							<td>${pet.name}</td>
							<td>${pet.age}</td>
							<td>${pet.type}</td>
							<td>${pet.weight}</td>
							<td>${pet.length}</td>
							<td>${pet.breed}</td>
							<td><i class="bi bi-square-fill" style="color: ${pet.color}"></i></td>
							<td><i class="bi bi-${pet.vaccinated}-circle-fill"></td>
							<td><i class="bi bi-${pet.dewormed}-circle-fill"></td>
							<td><i class="bi bi-${pet.sterilized}-circle-fill"></td>
							<td>${pet.date}</td>

							</tr>`

							$tbody.html(tableContent);
						});
					} else {
						let petsFilterBreed = pets.filter(function(pet, index) {
							return (pet.breed ===breedValue && pet.type ===typeValue );
						});

						petsFilterBreed.forEach((pet, index) => {
							tableContent += `<tr>
							<td>${pet.id}</td>
							<td>${pet.name}</td>
							<td>${pet.age}</td>
							<td>${pet.type}</td>
							<td>${pet.weight}</td>
							<td>${pet.length}</td>
							<td>${pet.breed}</td>
							<td><i class="bi bi-square-fill" style="color: ${pet.color}"></i></td>
							<td><i class="bi bi-${pet.vaccinated}-circle-fill"></td>
							<td><i class="bi bi-${pet.dewormed}-circle-fill"></td>
							<td><i class="bi bi-${pet.sterilized}-circle-fill"></td>
							<td>${pet.date}</td>

							</tr>`

							$tbody.html(tableContent);
						});
					}

				}
			}
			else{
				petsFilterName.forEach((pet, index) => {
					tableContent += `<tr>
					<td>${pet.id}</td>
					<td>${pet.name}</td>
					<td>${pet.age}</td>
					<td>${pet.type}</td>
					<td>${pet.weight}</td>
					<td>${pet.length}</td>
					<td>${pet.breed}</td>
					<td><i class="bi bi-square-fill" style="color: ${pet.color}"></i></td>
					<td><i class="bi bi-${pet.vaccinated}-circle-fill"></td>
					<td><i class="bi bi-${pet.dewormed}-circle-fill"></td>
					<td><i class="bi bi-${pet.sterilized}-circle-fill"></td>
					<td>${pet.date}</td>

					</tr>`

					$tbody.html(tableContent);
				});

			}

		} 
		else{
			petsFilterID.forEach((pet, index) => {
				tableContent += `<tr>
				<td>${pet.id}</td>
				<td>${pet.name}</td>
				<td>${pet.age}</td>
				<td>${pet.type}</td>
				<td>${pet.weight}</td>
				<td>${pet.length}</td>
				<td>${pet.breed}</td>
				<td><i class="bi bi-square-fill" style="color: ${pet.color}"></i></td>
				<td><i class="bi bi-${pet.vaccinated}-circle-fill"></td>
				<td><i class="bi bi-${pet.dewormed}-circle-fill"></td>
				<td><i class="bi bi-${pet.sterilized}-circle-fill"></td>
				<td>${pet.date}</td>

				</tr>`

				$tbody.html(tableContent);
			});

		}
	}
	
	

});

