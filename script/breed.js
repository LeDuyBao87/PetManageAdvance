'use strict';

//tạo animation cho sidebar
$('#sidebar').click(function(event) {
	$(this).toggleClass('active');

});
//tạo sự kiện khi nhấn nút submit
$('#submit-btn').click(function() {
	//lấy dữ liệu nhập vào của người dùng
	let breedValue = $('#input-breed').val();
	let typeValue = $('#input-type').val();
	let isError = false;
	let $tbody = $('#tbody');
	//validate dữ liệu và thông báo lỗi nhập liệu cho người dùng
	if(!breedValue){
		isError = true;
		alert('Please input breed');
	} else {
		isError = false;
	}

	if((!typeValue) || (typeValue === 'Select Type' )){
		isError = true;
		alert('Please input type');
	} else {
		isError = false;
	}

	if(isError === false){
		//lấy dữ liệu trên localStorage nếu có thì trả về mảng có giá trị không thì trả về mảng rỗng
		let breeds = localStorage.getItem('breeds') ? JSON.parse(localStorage.getItem('breeds')) : [];
		//thêm giá trị vừa nhập vào mảng chứa giá trị lúc đầu
		breeds.push({
			breed: breedValue,
			type: typeValue
		});

		localStorage.setItem('breeds', JSON.stringify(breeds));
		renderBreeds();
	}


});

// Hàm render Breeds ra giao diện table người dùng
function renderBreeds(){
	let breeds = localStorage.getItem('breeds') ? JSON.parse(localStorage.getItem('breeds')) : [];
	let $tbody = $('#tbody');
	if(breeds.length === 0) {
		return false;
	};

	let tableContent = '';
	breeds.forEach((breed, index) =>{
		let breedId = index;
		index++;
		tableContent += (`<tr>
			<td>${index}</td>
			<td>${breed.breed}</td>
			<td>${breed.type}</td>
			<td><button class="btn btn-danger" onclick='deleteBreed(${breedId})'>Delete</button></td>

			</tr>`);
		$tbody.html(tableContent);
	});	
}

function deleteBreed(id){
	let breeds = localStorage.getItem('breeds') ? JSON.parse(localStorage.getItem('breeds')) : [];
	breeds.splice(id, 1);
	localStorage.setItem('breeds', JSON.stringify(breeds));
	renderBreeds();
}




