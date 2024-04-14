function getApplications(){
	let apps = localStorage.getItem('applications');
	return JSON.parse(apps);
}

function saveApplications(arr){
	let newArr = JSON.stringify(arr);
	localStorage.setItem('applications', newArr);
}

function createStatus(status){
	let element;
	switch(status){
		case '0':
			element = `<option selected value="0">не выполнено.</option>
			<option value="1">в работе.</option>
			<option value="2">выполнено.</option>`;
			break;
		case '1':
			element = `<option value="0">не выполнено.</option>
	<option selected value="1">в работе.</option>
	<option value="2">выполнено.</option>`;
			break;
		case '2':
			element = `<option value="0">не выполнено.</option>
	<option value="1">в работе.</option>
	<option selected value="2">выполнено.</option>`;
			break;
	}
	return element;
}

function getData(){
	let statsTime = document.querySelector('.stats__time');
	let statsDone = document.querySelector('.stats__done');
	let statsProblems = document.querySelector('.stats__problems');

	let appsObj = getApplications();
	let doneQuantity = 0;
	let types = [];
	let times = [];
	for(let i = 0; i < appsObj.length; i++){
		if(appsObj[i].status == '2'){
			doneQuantity++;
		}
		types.push(appsObj[i].type);

		if(appsObj[i].status == '2'){
			let reportKeys = Object.keys(appsObj[i].report);
			let time = appsObj[i].report[reportKeys[0]];
			let matches = time.replace(/\D/g, '');
			times.push(matches);
		}
	}
	statsDone.innerHTML = doneQuantity + '.';
	let problems = '';
	for(let i = 0; i < types.length;i++){
		problems += types[i];
		if(!(i + 1 == types.length)){
			problems += ', ';
		}
	}
	problems += '.';
	statsProblems.innerHTML = problems;

	let medium = 0;
	for(let i = 0; i < times.length;i++){
		medium += Number(times[i]);
	}
	medium = medium / times.length;
	statsTime.innerHTML = Math.round((medium + Number.EPSILON) * 100) / 100 + ' суток/сутки.';
}

function showApplies(){
	let apps = document.querySelector('.apps');
	apps.innerHTML = '';
	let appsObj = getApplications();
	for(let i = 0; i < appsObj.length;i++){
		let reportKeys = Object.keys(appsObj[i].report);
		let elem = `<div class="application">
		<p class="application__number">Идентификатор: ${appsObj[i].number}</p>
		<p>Время: <span class="application__time">${appsObj[i].report[reportKeys[0]]}</span></p>
		<p>Материалы: <span class="application__materials">${appsObj[i].report[reportKeys[1]]}</span></p>
		<p>Стоимость: <span class="application__price">${appsObj[i].report[reportKeys[2]]}</span></p>
		<p>Причина неисправности: <span class="application__problem">${appsObj[i].report[reportKeys[3]]}</span></p>
		<p>Оказанная помощь: <span class="application__help">${appsObj[i].report[reportKeys[4]]}</span></p>
		<p class="application__date">Дата создания: ${appsObj[i].date}</p>
		<p class="application__instruments">Оборудование: ${appsObj[i].instruments}</p>
		<p class="application__type">Тип: ${appsObj[i].type}</p>
		<p>Описание: <span class="application__description">${appsObj[i].description}</span></p>
		<p class="application__client">Клиент: ${appsObj[i].client}</p>
		<p>Рабочий: <span class="application__worker">${appsObj[i].worker}</span></p>
		Статус: <select class="application__status">${createStatus(appsObj[i].status)}
		</select>
		`
		if (appsObj[i].status == '2'){
			let report = `Время выполнения работы: ${appsObj[i].report[reportKeys[0]]}\nМатериалы: ${appsObj[i].report[reportKeys[1]]}\nЦена: ${appsObj[i].report[reportKeys[2]]}\nНеисправность: ${appsObj[i].report[reportKeys[3]]}\nОказанная помощь: ${appsObj[i].report[reportKeys[4]]}`;
			elem += `<a class="download" download="Отчёт по заявке №${appsObj[i].number}"
			href="data:text/plain;charset=utf-8,${report}">Скачать отчёт</a>`
		}
		elem += `
		</div>`
		apps.insertAdjacentHTML( 'beforeend', elem );
	}
}

function reviveHeader(){
	let exit = document.querySelector('#exit');
	let logo = document.querySelector('#logo');
	exit.addEventListener('click', quit)  
	logo.addEventListener('click', quit) 
}

function quit(e){
	e.preventDefault();
					
		if(confirm('Do you wanna quit?')){
			localStorage.setItem('profile', '');
			window.location.href = 'index.html';
		}
}

function changeElement(name, id = 'no'){
	let app = document.querySelectorAll(`.application__${name}`);
	for(let i = 0; i < app.length;i++){
		app[i].addEventListener('click', function(e){
			e.preventDefault();

			let thing = prompt(`Напечатайте новое значение колонки: "${name}"!`);
			if(thing != null){
				let appsObj = getApplications();
				if(id >= 0 && id <= 4 && id != 'no'){
					console.log('yes')
					let reportKeys = Object.keys(appsObj[i].report);
					appsObj[i].report[reportKeys[id]] = thing;
				} else {
					console.log('no')
					appsObj[i][name] = thing;
				}
				app[i].innerHTML = thing;
				saveApplications(appsObj);
			}
		})
	}
}

function changeStatus(){
	let application__statuses = document.querySelectorAll('.application__status');
	for(let i = 0; i < application__statuses.length;i++){
		application__statuses[i].addEventListener('change', function(){
			let appsObj = getApplications();
			let num = application__statuses[i].parentElement.firstElementChild.innerHTML;
			for(let j = 0; j < appsObj.length; j++){
				if(appsObj[j].number == num[num.length - 1]){
					appsObj[j].status = String(application__statuses[i].value);
					if(application__statuses[i].value == 2){
						appsObj[j].notification = 'pending';
					} else if (application__statuses[i].value == 0){
						appsObj[j].notification = 'no';
					}
				}
			}
			saveApplications(appsObj);
		})
	}
}

function createChanges(){
	changeElement('worker')
	changeElement('description')
	changeElement('time', 0)
	changeElement('materials', 1)
	changeElement('price', 2)
	changeElement('problem', 3)
	changeElement('help', 4)
}

function createDesk(){
	showApplies();
	changeStatus();
	createChanges();
	getData();
}

document.addEventListener('DOMContentLoaded', function(){
	let profile = localStorage.getItem('profile');
	if(profile != 'admin'){
		window.location.href = 'index.html';
		return;
	}
	
	reviveHeader();
	createDesk();
})