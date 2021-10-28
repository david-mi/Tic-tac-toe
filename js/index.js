//TODO
// faire en sorte qu'une fois une partie terminée plus rien ne soit cliquable jusqu'au reset pour éviter de changer le nom du gagnant.

const container = document.querySelector('.container');
const title = document.querySelector('.title');
const cases = document.querySelectorAll('.case')
let nB = 0;
let tabCircleIndex = [];
let tabCrossIndex = [];

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
		nB++
		classAdd(item,'cross')
		addIndex(tabCrossIndex, item)
		
		// si nB est impair, on ajoute la classe
		// circle sur l'élément, on incrémente nB
		// on ajoute l'index de l'élément cliqué dans
		// tabCircleIndex
	}else{
		nB++
		classAdd(item,'circle')
		addIndex(tabCircleIndex, item)
	}
	
}

// fonction pour savoir si un nombre est pair
const isEven = nb => nb % 2 === 0;

// fonction ajouter une classe sur un élément
const classAdd = (item, classe) => item.classList.add(classe);

container.addEventListener('click', (e) => {
	let elem = e.target.closest('.case');
	if (elem){
		addSymbol(elem)
		checkWin()
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
	tabCrossIndex = [];
	tabCircleIndex = [];
	nB = 0;
	cases.forEach(elem => deleteAllClass(elem));
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