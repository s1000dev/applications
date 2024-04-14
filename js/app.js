document.addEventListener('DOMContentLoaded', function () {

	let clear = document.getElementById('clear');
	clear.addEventListener('click', () => {localStorage.clear();localStorage.setItem('quantity', 0);localStorage.setItem('profiles', JSON.stringify({'admin': 'admin'}));localStorage.setItem('applications', JSON.stringify([]));});

	let login = document.getElementById('login');
	let register = document.getElementById('register');
	
	let nameLogin = document.getElementById('nameLogin');
	let pass = document.getElementById('pass');
	let passConfirm = document.getElementById('passConfirm');

	let loginName = document.getElementById('loginName');
	let loginPass = document.getElementById('loginPass');

	//!registration

	register.addEventListener('click', function(e){
		e.preventDefault();

		let nameLog = nameLogin.value;
		let password = pass.value;

		if(checkPasswords() && checkRegistered(nameLogin.value)){
			let profs = localStorage.getItem('profiles');
			let profsObj = JSON.parse(profs);
			profsObj[nameLog] = password;
			localStorage.setItem('profiles', JSON.stringify(profsObj));
			alert('Вы успешно зарегистрировались!');
			nameLogin.value = '';
			pass.value = '';
			passConfirm.value = '';
		} else if(!checkPasswords()){
			alert('Пароли не совпадают!');
		} else {
			alert('Такой пользователь уже существует!')
		}

	})

	function checkRegistered(name){
		let profs = localStorage.getItem('profiles');
		let profsObj = JSON.parse(profs);
		for(let key in profsObj){
			if(key == name){
				return false;
			}
		}
		return true;
	}

	function checkPasswords(){
		if(pass.value === passConfirm.value){
			return true;
		} else{
			alert('Пароли не совпадают!');
			return false;
		}
	}

	//! login

	login.addEventListener('click', function(e){
		e.preventDefault();

		let profs = localStorage.getItem('profiles');
		let profsObj = JSON.parse(profs);

		if(loginName.value == 'admin' && loginPass.value == 'admin'){
			localStorage.setItem('profile', loginName.value);
			window.location.href = 'admin.html';
			return;
		}

		for(let key in profsObj){
			if(key == loginName.value && profsObj[key] == loginPass.value){
				localStorage.setItem('profile', loginName.value);
				window.location.href = 'notes.html';
				return;
			}
		}
		alert('There`s no such person or your password is incorrect!');
	})
})
