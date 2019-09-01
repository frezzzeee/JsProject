	//Ждем загрузки страницы

	"use strict";

	window.onload = function() { 

		//Создаём новый объект XMLHttpRequest

		let xhr = new XMLHttpRequest(); 

		//Создаем GET запрос 

	    xhr.open('GET', 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture');
	    
	    //Ждем загрузку с сервера

	    xhr.onload = function() {

			//Парсинг json и создание массива пользователей

	    	let array = JSON.parse (xhr.responseText).results;
	    	//let array = arr.results;

	    	//Выборка необходимых элементов DOM

	    	let wrapper = document.getElementById('wrapper');
			let mask = document.getElementById('mask');
			let body = document.getElementsByTagName('body');
			let buttonA = document.getElementById('buttonA');
			let buttonZ = document.getElementById('buttonZ');
			let height = document.documentElement.clientHeight/2 - 64;
			let width = document.documentElement.clientWidth/2 - 275;

			//Функция сравнения элементов для сортировки массива по имени

	    	function compare(a, b) {

					let comparison = 0;
					if (a.name.first.toUpperCase() > b.name.first.toUpperCase()) {
						comparison = 1;
					} else if (a.name.first.toUpperCase() < b.name.first.toUpperCase()) {
					    comparison = -1;
					};
					  return comparison;
			};

			//Функция сравнения элементов для сортировки массива по имени в обратном порядке

			function compareReverse(a, b) {

					let comparison = 0;
					if (a.name.first.toUpperCase() > b.name.first.toUpperCase()) {
						comparison = -1;
					} else if (a.name.first.toUpperCase() < b.name.first.toUpperCase()) {
					    comparison = 1;
					};
					  return comparison;
			};

			//Функция вывода массива пользователей

	    	function out(setCompare) {

	    		//Сортировка массива

	    		array.sort(setCompare);

				//Перебор всех элементов массива

		    	for(let i = 0; i < array.length; i++) {

		    		//Создание блоков div в которые будут помещены имя и аватарка пользователя

			    	let div = document.createElement('div');

			    	//Создание переменных и присваивание им значений из массива пользователей

			    	let imgLarge = "<img src='" + array[i].picture.large + "'>";
			    	let imgMedium = "<img src='" + array[i].picture.medium + "'>";
			    	let title = "<h4>" + array[i].name.title;
			    	let firstName = " " + array[i].name.first + " ";
			    	let lastName = array[i].name.last + "</h4>";
			    	let gender = "<span class='gender'><b>Gender: </b>" + array[i].gender + "</span>";
			    	let street = "<hr><p class='adress'><b>Street: </b>" + array[i].location.street + "</br><b>City: </b>";
			    	let city = array[i].location.city + "</br><b>State: </b>";
			    	let state = array[i].location.state + "</br><b>Postcode: </b>";
			    	let postcode = array[i].location.postcode + "</p>";
			    	let email = "<p class='contacts'><b>Email: </b>" + array[i].email + "</br><b>Phone: </b>";
			    	let phone = array[i].phone + "</p>";

			    	//Задание класса для блока div и помещение в него полного имени и аватарки пользователя

			    	div.className = "person";
			    	div.innerHTML = imgMedium + title + firstName + lastName;
			    	wrapper.append(div);

			    	//Функция создания всплывающего окна с полной информацией о пользователе по клику на блок div.
			    	//Создание маски для затемнения фона при показе всплывающего окна

			    	div.onclick = function() {
			    		let fullDiv = document.createElement('div');
			    		fullDiv.id = 'fullPerson';
			    		fullDiv.style.top = height + 'px';
			    		fullDiv.style.left = width + 'px';
			    		mask.style.display = "block";
			    		mask.style.height = document.documentElement.clientHeight + "px";
			    		fullDiv.innerHTML = imgLarge + gender + title + firstName + lastName + street + city + state + postcode + email + phone;
			    		body[0].append(fullDiv);
			    	};

			    	//Функция закрытия маски по клику на неё
			    	
			    	mask.onclick = function() {
			    		document.getElementById('fullPerson').remove();
			    		mask.style.display = 'none';
			    	}; 
				};
			};

			//Функция удаление списка элементов

			function deleteElements() {
				let HTMLCol = document.getElementsByClassName('person');
				let list = Array.prototype.slice.call(HTMLCol);
				for(let i = 0; i < list.length; i++){
					list[i].remove();
				}
			}

			//Вызов функции вывода пользователей

			out();

			//Функции сортировки элементов по клику на button

			buttonA.onclick = function() {
				deleteElements();
				out(compare);
			};
			buttonZ.onclick = function() {
				deleteElements();
				out(compareReverse);
			};
		};
		//Отправление запроса
		xhr.send();
	};