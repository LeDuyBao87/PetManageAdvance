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

var idCurrent = document.getElementsByClassName('id-currrent');
var idArr = [];

for(var n = 0; n < idCurrent.length; n++ ){
	idArr.push(idCurrent[n].innerText);
};

$('#submit-btn').click(function(event) {
	//gán cờ để check có lỗi xảy ra hay không
	let isError = false;
	// lấy giá trị user nhập vào các trường
	let petIdValue = $('#input-id').val();
	let petNameValue = $('#input-name').val();
	let petAgeValue = $('#input-age').val();
	let petTypeValue = $('#input-type').val();
	let petWeightValue = $('#input-weight').val();
	let petLengthValue = $('#input-length').val();
	let petColorValue = $('#input-color-1').val();
	let petBreedValue = $('#input-breed').val();
	let vaccinatedStatus = $('#input-vaccinated').prop('checked');
	let dewormedStatus = $('#input-dewormed').prop('checked');
	let sterilizedStatus = $('#input-sterilized').prop('checked');
	//xử lý date để hiển thị đúng định dạng dd/mm/yyyy
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	// toán tử 3 ngôi để thêm số 0 vào trước những tháng có 1 chữ số
	month < 10 ? month = `0${month} `: month;
	var day = date.getDate();
	var fullDate = `${day}/${month}/${year}`;
	//lấy  trạng thái của checkbox để lấy check or x thêm vào class
	var vaccinatedValue = vaccinatedStatus == true ? 'check': 'x';
	var dewormedValue = dewormedStatus == true ? 'check': 'x';
	var sterilizedValue = sterilizedStatus == true ? 'check': 'x';
//lưu giá trị vừa lấy vào object data
const data = {
	id: petIdValue,
	name: petNameValue,
	age: parseInt(petAgeValue),
	type: petTypeValue,
	weight: parseInt(petWeightValue),
	length: parseInt(petLengthValue),
	color: petColorValue,
	breed: petBreedValue,
	vaccinated: vaccinatedValue,
	dewormed: dewormedValue,
	sterilized: sterilizedValue,
	date: fullDate,

}
	//Hàm kiểm tra id mà người dùng nhập vào bằng cách:
	var checkID = function (){	
		let pets = localStorage.getItem('pets') ? JSON.parse(localStorage.getItem('pets')) : [];
	//lấy dữ liệu từ localstorage và kiểm tra số độ dài từ đó suy ra id hiện tại
		let idCurrent = pets.length+1;
		let idInput = parseInt(petIdValue.slice(1));
	//Nếu id nhập vào mà khác id hiện tại sẽ cấp thì thông báo lỗi người dùng không cần nhập id
	//id sẽ được cấp tự động

		if(idInput !== idCurrent) {
			console.log('khác nhau');
			alert(`PetID get auto, don't Input petID`);
			isError = true;
		};
	}
	// Hàm kiểm tra name người dùng nhập vào
	var checkName = function (){		
		if(!data.name){
			isError = true;
			alert('Please input pet name!');
		}
	}
	// Hàm kiểm tra Tuổi phải từ 1 đến 15 thì hợp lệ
	var checkAge = function (){		
		if(data.age == '' && data.age == 0){
			isError = true;

			alert('Please input pet age!');
		}
		else if(data.age>=1 && data.age<=15)
		{
			console.log('PetAge: ' + data.age);

		}
		else {
			isError = true;
			alert('Age must be between 1 and 15!');
		}
	}
	// Hàm kiểm tra loại pet
	var checkType = function (){		
		if(data.type == '' || data.type == 'Select Type'){
			isError = true;
			alert('Please select type!');
		} 
	}
	// Hàm kiểm tra cân nặng phải từ 1 đến 15 thì hợp lệ
	var checkWeight = function (){		
		if(!data.weight){
			isError = true;
			alert('Please select weight!');
		}
		else if(data.weight>=1 && data.weight<=15)
		{
			console.log('Weight: ' + data.weight);
		}
		else {
			isError = true;
			alert('Weight must be between 1 and 15!');
		}
	}
	// Hàm kiểm tra chiều dài 
	var checkLength = function (){		

		if(data.length == ''){
			isError = true;
			alert('Please select length!');
		}
		else if(data.length>=1 && data.length<=100)
		{
			console.log('Length: ' + data.length);

		}
		else {
			isError = true;
			alert('Length must be between 1 and 100!');
		}
	}
	// Hàm kiểm tra breed
	var checkBreed = function (){		

		if(data.breed == '' || data.breed == 'Select Breed'){
			var isError = true;
			alert('Please select breed!');
		}	

	}
	// Gọi các hàm
	checkID();
	checkName();
	checkAge();
	checkType();
	checkWeight();
	checkLength();

	if(isError === false){
		//kiểm tra mảng pet có không nếu có thì truyền giá trị về pets không thì trả về giá trị là mảng rỗng
		let pets = localStorage.getItem('pets') ? JSON.parse(localStorage.getItem('pets')) : [];
		//Thêm data vào cuối mảng
		pets.push(data);
		//Set giá trị pets vào localStorage
		localStorage.setItem('pets', JSON.stringify(pets));
		renderPet();

	}; 
	//xóa giá trị vừa nhập sau khi nhấn nút submit
	$('#input-id').val('');
	$('#input-name').val('');
	$('#input-age').val('');
	$('#input-type').val('');
	$('#input-weight').val('');
	$('#input-length').val('');
	$('#input-color-1').val('#000000');
	$('#input-breed').val('');
	loadId();
	
});
//hàm dùng để cấp id tự động đeo đúng định dạng Pxxx
var loadId =  function(){
	let pets = localStorage.getItem('pets') ? JSON.parse(localStorage.getItem('pets')): [];
	// let last = pets[pets.length];
	let idCurrent = pets.length + 1;
	if(idCurrent < 10)
	{
		$('#input-id').val(`P00${idCurrent}`);

	} else {
		idCurrent >= 10 && idCurrent < 100 ? $('#input-id').val(`P0${idCurrent}`) : $('#input-id').val(`P${idCurrent}`); 
	}
	
};

//Hàm dùng để render ra pet lên màn hình
var renderPet = function (){
	let pets = localStorage.getItem('pets') ? JSON.parse(localStorage.getItem('pets')): [];
	loadId();
	// console.log(pets);
	let tableContent = '';
	let $tbody = $('#tbody');
	if (pets.length == 0) {
		return false;
	} 
	else {
		pets.forEach((pet, index) => {
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
			<td><a href="./page/edit.html"><button class="btn btn-warning">Edit</button></a></td>

			</tr>`;	
			$tbody.html(tableContent);
		});	
	}	
};

//Hàm hiển thị ra những pet đã được tiêm đủ 3 mũi
var isChange = false;

$('#healthy-btn').click(function(event) {
	let pets = localStorage.getItem('pets') ? JSON.parse(localStorage.getItem('pets')) : [];
	console.log(pets);
	if(isChange == false){
		//sau khi nhấn vào Show Healthy Pet thì đổi tên button thành show all pet
		$('#healthy-btn').text('Show all pet');
		let tableContent = '';
		let $tbody = $('#tbody');
		var petOutput = pets.filter((pet, index) => {
			//trả về mảng pet có điều kiện là đã chích đủ 3 mũi
			return (pet.vaccinated == 'check'&& pet.dewormed == 'check' && pet.sterilized == 'check');
		});
		console.log(petOutput);
		
		petOutput.forEach((pet, index) => {
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
			<td><a href="./page/edit.html"><button class="btn btn-warning">Edit</button></a></td>
			</tr>`;	
			$tbody.html(tableContent);
		});

		return isChange = true;
	} else
	$('#healthy-btn').text('Show Healthy pet');

	// hiển thị thông tin tất cả các pet
	var table = document.getElementById('tbody');
	table.innerHTML = "";

	for(let i = 0; i < pets.length; i++){
		var row = `<tr>
		<th scope="row" class="id-currrent">${pets[i].id}</th>
		<td>${pets[i].name}</td>
		<td>${pets[i].age}</td>
		<td>${pets[i].type}</td>
		<td>${pets[i].weight} kg</td>
		<td>${pets[i].length} cm</td>
		<td>${pets[i].breed}</td>
		<td><i class="bi bi-square-fill" style="color: ${pets[i].color}"></i></td>
		<td><i class="bi bi-${pets[i].vaccinated}-circle-fill"></td>
		<td><i class="bi bi-${pets[i].dewormed}-circle-fill"></td>
		<td><i class="bi bi-${pets[i].sterilized}-circle-fill"></td>
		<td>${pets[i].date}</td>
		<td><a href="./page/edit.html"><button class="btn btn-warning">Edit</button></a>
		</td></tr>`;

		table.innerHTML += row;
	}

	return isChange = false;
});

