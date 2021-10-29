//TODO
// faire en sorte qu'une fois une partie terminée plus rien ne soit cliquable jusqu'au reset pour éviter de changer le nom du gagnant.

const container = document.querySelector('.container');
const title = document.querySelector('.title');
const cases = document.querySelectorAll('.case')
let nB = 0;
let tabCircleIndex = [];
let tabCrossIndex = [];

let api = 'http://localhost:3000/'
const distApi = 'https://morpion-david-mi.herokuapp.com/'

if(window.location.origin !== 'http://127.0.0.1:5500'){
	api = distApi
	console.log('Pas en local')
}

const getData = (endpoint) =>{
	return fetch(`${api}${endpoint}`)
}

// on appelle getdata au chargement de la page pour afficher les éléments
getData('morpion')
.then(res => res.json())
.then(data =>{
	console.log(data)
	tabCrossIndex = data.crossindex.filter(e => e !== '')
	tabCircleIndex = data.circleindex .filter(e => e !== '')
	console.log(tabCrossIndex)
	console.log(tabCircleIndex)
	tabCrossIndex.forEach(i => cases[i].classList.add('cross'))
	tabCircleIndex.forEach(i => cases[i].classList.add('circle'))
	
})



// fonction qui va vérifier si une classe est présente
// et va incrémenter ou non nB
const addSymbol = item =>{
	let crossClass = item.classList.contains('cross');
	let circleClass = item.classList.contains('circle');
	
	// si une des classe est détéctée, on incrémente pas
	if(crossClass || circleClass){
		classAdd(item, 'wrong')
		setTimeout(() => classRemove(item, 'wrong'), 400);
	
		// si nB est pair, on ajoute la classe
		// cross sur l'élément, on incrémente nB
		// on ajoute l'index de l'élément cliqué dans
		// tabCrossIndex 
	}else if (isEven(nB)){
		obj.increment = nB
		addIndex(tabCrossIndex, item)
		obj.circleindex = tabCircleIndex
		console.log(obj)
		updateData('morpion')
		.then(data => {
			console.log(data)
		classAdd(item,'cross')
		})
		
		
		// si nB est impair, on ajoute la classe
		// circle sur l'élément, on incrémente nB
		// on ajoute l'index de l'élément cliqué dans
		// tabCircleIndex
	}else{
		obj.increment = nB
		addIndex(tabCircleIndex, item)
		obj.crossindex = tabCrossIndex
		console.log(nB)
		updateData('morpion')
		.then(data => {
		console.log(data)
		classAdd(item,'circle')
		})
	}
}

let obj = {
	name: 'morpion',
	increment: '',
	crossindex: '',
	circleindex: ''
}

const updateData = (endpoint) => {
		return fetch(`${api}${endpoint}`,{
		method: 'PUT',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(obj)
	})
	.then(res => res.json())
}



// fonction pour savoir si un nombre est pair
const isEven = nb => nb % 2 === 0;

// fonction ajouter une classe sur un élément
const classAdd = (item, classe) => item.classList.add(classe);

container.addEventListener('click', (e) => {
	let elem = e.target.closest('.case');
	if (elem){
		getData('morpion')
		.then(res => res.json())
		.then(res => {
			nB = res.increment;
			console.log(`Valeur de nB au get: ${nB}`)
			addSymbol(elem)
			checkWin()

		})

	}
})

/// RESET

const resetBtn = document.querySelector('.reset-btn');

// tableau avec toutes les classes à virer
let allClasses = ['cross', 'circle', 'wrong']

// fonction pour enlever une classe sur un élément
const classRemove = (item, classe) => item.classList.remove(classe);

// fonction pour enlever toutes les classes
const deleteAllClass = item => item.classList.remove(...allClasses);

// fonction qui remet nB à 0
// on itère à travers les cases et on supprime
// toutes les classes cross et circle
const reset = () =>{
	obj.increment = 0;
	tabCrossIndex = [];
	tabCircleIndex = [];
	nB = 0;
	updateData('morpion')
	.then(data => {
		console.log(`Increment reseted => ${data.increment}`)
		cases.forEach(elem => deleteAllClass(elem));
	})

}

// bouton pour appeler la fonction reset 
resetBtn.addEventListener('click', () =>{
	reset()
})

// Indexs //
/* 0 1 2
	 3 4 5
	 6 7 8 */

// tableau avec tous les index représentant une victoire possible
const winCases = [
	[0, 1, 2], [3, 4, 5], [6, 7, 8],
	[0, 3, 6], [1, 4, 7], [2, 5, 8],
	[0, 4, 8], [2, 4, 6]
]

// fonction pour ajouter l'id l'élément cliqué
// convertie en nombre dans un tableau, qui correspond à l'index 
// de l'élément par rapport à son parent
const addIndex = (tab, item) =>{
	tab.push(parseInt(item.id))
}

// fonction qui va checker si un des tableaux de Wincases
// est présent dans le tableau tabCircleIndex ou tabCrossIndex
const results = (elem, tab) => {
	return elem.every(e => tab.includes(e))
}

// fonction pour changer le titre
innerText = (text) => title.innerText = text

// fonction qui va check si quelqu'un à gagné
const checkWin = () =>{
	winCases.forEach(elem => {
		console.log(tabCrossIndex)
		console.log(tabCircleIndex)
		let crossWin = results(elem, tabCrossIndex);
		let circleWin = results(elem, tabCircleIndex);
			if (crossWin){
				innerText('Cross Wins !')
				setTimeout(() =>{
					reset()
					innerText('Morpion')
				}, 1500)
			}else if (circleWin){
				innerText('Circle Wins !')
				setTimeout(() =>{
				reset()
				innerText('Morpion')
				}, 1500)
			}else if(nB === 9){
				innerText('Game Over !')
				setTimeout(() =>{
				reset()
				innerText('Morpion')
				}, 1500)
			}
		})
}

// const postData = () => {
// 	fetch('http://localhost:3000/send',{
// 	method: 'POST',
// 	headers: {'Content-Type': 'application/json'},
// 	body: JSON.stringify(obj)
// })
// .then(res => res.json())
// .then(res => console.log(res))
// }