'use strict';
//hàm add class tạo animation
$('#sidebar').click(function(event) {
	$(this).toggleClass('active');

});
//tạo event khi input type thay đổi giá trị
$('#input-type').focusout(function(event) {
	//lấy giá trị vừa nhập
	let petTypeValue = $('#input-type').val();
	//kiểm tra nếu trong localStorage có dữ liệu thì trả về không thì trả về mảng rỗng
	let breeds = localStorage.getItem('breeds') ? JSON.parse(localStorage.getItem('breeds')) : [];
	$('#input-breed').html('');
	//khi input type thay đổi giá trị dog hay cat thì lọc breed theo giá trị vừa thay đổi
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

//hàm render pet sau khi được lọc giá trị theo type ở trên
var renderPet = function () {
	let pets = localStorage.getItem('pets') ? JSON.parse(localStorage.getItem('pets')) : [];
	console.log(pets);
	let tableContent = '';
	let $tbody = $('#tbody');
	if(pets.length === 0 ){
		return false;
	}
	else {
		pets.forEach((pet, index) => {
			//gán index vào biến petId 
			let petId = index;
			index++;
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
			<td><button class="btn btn-warning" onclick='editPet(${petId})'>Edit</button></td>

			</tr>`
			$tbody.html(tableContent);
		});
	}
}
//Hàm edit pet xảy ra khi click vào nút editpet
function editPet(id){
	//kiểm tra nếu trong localStorage có dữ liệu thì trả về không thì trả về mảng rỗng
	let pets = localStorage.getItem('pets') ? JSON.parse(localStorage.getItem('pets')) : [];
	//khi click vào thì xóa class hide để hiển thị form nhập liệu
	$('#container-form').removeClass('hide');
	console.log(pets[id]);
	//xử lý giá trị petId để tìm được vị trí pet được click vào nút editpet
	$('#input-id').val(pets[id].id);
	$('#input-name').val(pets[id].name);
	$('#input-age').val(pets[id].age);
	$('#input-type').val(pets[id].type);
	$('#input-weight').val(pets[id].weight);
	$('#input-length').val(pets[id].length);
	$('#input-color-1').val(pets[id].color);
	
	console.log(pets[id].breed);
	//hiển thị thông tin breed dựa vào type Dog/Cat khi nhập liệu như code trong phần breed.html
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

	$('#input-breed').val(pets[id].breed);

	let vaccinatedStatus = pets[id].vaccinated;
	let dewormedStatus = pets[id].dewormed;
	let sterilizedStatus = pets[id].sterilized;

	console.log(vaccinatedStatus);
	console.log(dewormedStatus);
	console.log(sterilizedStatus);

	vaccinatedStatus === 'check' ? $('#input-vaccinated').prop('checked', true) : $('#input-vaccinated').prop('checked', false) ;
	dewormedStatus === 'check' ? $('#input-dewormed').prop('checked', true) : $('#input-dewormed').prop('checked', false) ;
	sterilizedStatus === 'check' ? $('#input-sterilized').prop('checked', true) : $('#input-sterilized').prop('checked', false) ;

};
//bắt sự kiện khi click vào nút submit
$('#submit-btn').click(function(event) {
	//kiểm tra nếu trong localStorage có dữ liệu thì trả về không thì trả về mảng rỗng
	let pets = localStorage.getItem('pets') ? JSON.parse(localStorage.getItem('pets')) : [];
	//lấy giá trị người dùng nhập vào
	let petIdValue = $('#input-id').val();
	let petNameValue = $('#input-name').val();
	let petAgeValue = $('#input-age').val();
	let petTypeValue = $('#input-type').val();
	let petWeightValue = $('#input-weight').val();
	let petLengthValue = $('#input-length').val();
	let petColorValue = $('#input-color-1').val();
	let petBreedValue = $('#input-breed').val();
	//kiểm tra trạng thái chekcbox 3 mũi tiêm
	let vaccinatedStatus = $('#input-vaccinated').prop('checked');
	let dewormedStatus = $('#input-dewormed').prop('checked');
	let sterilizedStatus = $('#input-sterilized').prop('checked');
	let vaccinatedValue = vaccinatedStatus == true ? 'check': 'x';
	let dewormedValue = dewormedStatus == true ? 'check': 'x';
	let sterilizedValue = sterilizedStatus == true ? 'check': 'x';
	//lấy idpet vừa edit để cập nhập lại nội dung 
	let idEdit = parseInt(petIdValue.slice(1)) - 1;
	
	pets[idEdit].name = petNameValue;
	pets[idEdit].age = petAgeValue;
	pets[idEdit].type = petTypeValue;
	pets[idEdit].weight = petWeightValue;
	pets[idEdit].length = petLengthValue;
	pets[idEdit].color = petColorValue;
	pets[idEdit].breed = petBreedValue;

	pets[idEdit].vaccinated = vaccinatedValue;
	pets[idEdit].dewormed = dewormedValue;
	pets[idEdit].sterilized = sterilizedValue;


	localStorage.setItem('pets', JSON.stringify(pets));

	console.log(pets);
	renderPet();

});




