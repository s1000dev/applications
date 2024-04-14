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
			localStorage.setItem('working', false);
			window.location.href = 'index.html';
		}
}

export {reviveHeader, quit}