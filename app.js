// Lista de compas JS
	
	const form = document.querySelector('#task-form');
	const taskList = document.querySelector('.collection');
	const clearBtn = document.querySelector('.clear-tasks');
	const filter = document.querySelector('#filter');
	const taskInput = document.querySelector('#task');	

	const tableList = document.querySelector('#lista-de-comprados');
	const valorTotal = document.querySelector('#valor-total');
	const clearProdutoBtn = document.querySelector('.clear-produtos');
	var somatoriaValorTotal = 0.0;
		
	loadEventListeners();
	
	function loadEventListeners() {
	  	  
	  document.addEventListener('DOMContentLoaded', getTasks);

	  form.addEventListener('submit', addTask);
	  
	  taskList.addEventListener('click', removeTask);
	  
	  tableList.addEventListener('click', removeProduto);	
	
	  clearBtn.addEventListener('click', clearTasks);
	
	  clearProdutoBtn.addEventListener('click', clearProdutos);
	
	  filter.addEventListener('keyup', filterTasks); 
	}
	
	function getTasks() {
	  getTabelaValorDaCompra();
	  let tasks;
	  if(localStorage.getItem('tasks') === null){
	    tasks = [];
	  } else {
	    tasks = JSON.parse(localStorage.getItem('tasks'));
	  }	

	  tasks.forEach(function(task) {
	    const li = document.createElement('li');

	    li.className = 'collection-item';
	
	    li.appendChild(document.createTextNode(task));
	
	    const link = document.createElement('a');
	

	    link.className = 'delete-item secondary-content';
	
	    link.innerHTML = '<i class="fa fa-remove"></i>';
	
	    li.appendChild(link);
	
	    taskList.appendChild(li);
	  });
	}
	function getTabelaValorDaCompra() {
	  let produtos;
	  let valores;
	  let valorTotalLS;

	  if(localStorage.getItem('produtos') === null){
	    produtos = [];
	  } else {
	    produtos = JSON.parse(localStorage.getItem('produtos'));
	  }

	  if(localStorage.getItem('valores') === null){
	    valores = [];
	  } else {
	    valores = JSON.parse(localStorage.getItem('valores'));
	  }
	
	  for(let i = 0; i < produtos.length; i++) {

	    const trow = document.createElement('tr');

	    const tdNome = document.createElement('td');
	    tdNome.innerHTML = `${produtos[i]}`;
	
	    const tdValor = document.createElement('td');
	    tdValor.innerHTML = `${valores[i]}`;
	

	    const tdIcone = document.createElement('td');
	
	    const link = document.createElement('a');

	    link.className = 'delete-item';
	

	    link.innerHTML = '<i class="fa fa-remove"></i>';	

	    tdIcone.appendChild(link);	

	    trow.appendChild(tdNome);	

	    trow.appendChild(tdValor);
	
	    trow.appendChild(tdIcone);	

	    tableList.appendChild(trow);	

	    somatoriaValorTotal += parseFloat(valores[i]);
	  };
	
	  valorTotal.innerHTML = `Valor Total: <br> R$: ${somatoriaValorTotal}`;
	}
		function addTask(e) {
	  if(taskInput.value === '') {
	    alert('Insira um nome do produto');
	  } else {    
	    const li = document.createElement('li');
		    li.className = 'collection-item';
		    li.appendChild(document.createTextNode(taskInput.value));
	    const link = document.createElement('a');  
	    link.className = 'delete-item secondary-content';   
	    link.innerHTML = '<i class="fa fa-remove"></i>';
		    li.appendChild(link);    
	    taskList.appendChild(li);	
	    storeTaskInLocalStorage(taskInput.value);
	    taskInput.value = '';
		    e.preventDefault();
	  }
	}
		function addValorNaTabelaValorDaCompra(nomeDoProduto, valor) {
	  const trow = document.createElement('tr');
	  const tdNome = document.createElement('td');
	  tdNome.innerHTML = `${nomeDoProduto}`;
	  const tdValor = document.createElement('td');
	  tdValor.innerHTML = `${valor}`;
	  const tdIcone = document.createElement('td');
	  const link = document.createElement('a');
	  link.className = 'delete-item';
	  link.innerHTML = '<i class="fa fa-remove"></i>';
	  tdIcone.appendChild(link);
	
	  trow.appendChild(tdNome);
	

	  trow.appendChild(tdValor);
	

	  trow.appendChild(tdIcone);
	

	  tableList.appendChild(trow);
	
	  valor = parseFloat(valor);
	  atualizarValorTotal(valor);
	

	  salvarNomeProdutoCompradoNoLocalStorage(nomeDoProduto);
	

	  salvarValorProdutoCompradoNoLocalStorage(valor);
	

	}
	
	function adicionarItemNaTabelaValorDaCompra(produtoComprado){
	  let valor;
	  let nomeDoProduto;
	

	  nomeDoProduto = produtoComprado.textContent;
	  
	  valor = prompt(`Qual o valor do(a): ${nomeDoProduto}`, '');
	  
	  while(isNaN(valor) || valor == '') {
	    alert("Por favor digite somente números e ponto . no lugar da vírgula ,")
	    valor = prompt(`Qual o valor do(a): ${nomeDoProduto}`, '');
	  }

	  addValorNaTabelaValorDaCompra(nomeDoProduto, valor);
	}
	


	function atualizarValorTotal(valor){
	  
	  somatoriaValorTotal += valor;
	

	  valorTotal.innerHTML = `Valor Total: <br> R$: ${somatoriaValorTotal}`;
	  
	}
	

	function storeTaskInLocalStorage(task) {
	  let tasks;

	  if(localStorage.getItem('tasks') === null){
	    tasks = [];
	  } else {
	    tasks = JSON.parse(localStorage.getItem('tasks'));
	  }
	

	  tasks.push(task);
	


	  localStorage.setItem('tasks', JSON.stringify(tasks));
	}
	
	function salvarNomeProdutoCompradoNoLocalStorage(produtoComprado) {
	  let produtos;
	

	  if(localStorage.getItem('produtos') === null){
	    produtos = [];
	  } else {
	    produtos = JSON.parse(localStorage.getItem('produtos'));
	  }
	

	  produtos.push(produtoComprado);
	
	  localStorage.setItem('produtos', JSON.stringify(produtos));
	}
	


	function salvarValorProdutoCompradoNoLocalStorage(valor) {
	  let valores;
	

	  if(localStorage.getItem('valores') === null){
	    valores = [];
	  } else {
	    valores = JSON.parse(localStorage.getItem('valores'));
	  }
	
	  valores.push(valor);
	
	  localStorage.setItem('valores', JSON.stringify(valores));
	}
	

	function filterTasks(e) {
	  const text = e.target.value.toLowerCase();
	

	  document.querySelectorAll('.collection-item').forEach(function(task){
	    const item = task.firstChild.textContent;

	    if(item.toLowerCase().indexOf(text) != -1){
	      task.style.display = 'block';
	    } else {
	      task.style.display = 'none';
	    }
	  });
	}
	


	function removeTask(e) {
	  if(e.target.parentElement.classList.contains('delete-item')) {

	    if(confirm('Você quer deletar o item?')) {
	      e.target.parentElement.parentElement.remove();
	

	      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
	

	      adicionarItemNaTabelaValorDaCompra(e.target.parentElement.parentElement);
	    }
	  }
	}
	

	function removeTaskFromLocalStorage(taskItem) {
	  let tasks;
	  if(localStorage.getItem('tasks') === null){
	    tasks = [];
	  } else {
	    tasks = JSON.parse(localStorage.getItem('tasks'));
	  }
	

	  tasks.forEach(function(task, index){
	    if(taskItem.textContent === task){
	      
	      tasks.splice(index, 1);
	    }
	  });
	

	
	  localStorage.setItem('tasks', JSON.stringify(tasks));
	}
	


	function clearTasks() {
	  
	  if(confirm('Você quer deletar a lista?')){
	    while(taskList.firstChild) {
	      taskList.removeChild(taskList.firstChild);
	    }
	

	    
	    clearTasksFromLocalStorage();
	  }
	}
	

	
	function clearTasksFromLocalStorage() {
	  
	  localStorage.removeItem('tasks');
	}
	

	
	function removeProduto(e) {
	  let nomeDoProduto = e.target.parentElement.parentElement.parentElement.firstChild.textContent;
	  let valor = e.target.parentElement.parentElement.parentElement.firstChild.nextElementSibling.textContent;
	

	  if(e.target.parentElement.classList.contains('delete-item')) {
	    
	    if(confirm('Você quer deletar o item?')) {
	      e.target.parentElement.parentElement.parentElement.remove();
	

	      
	      removeProdutoDoLocalStorage(nomeDoProduto,valor);  
	    }
	  }
	}
	

	
	function removeProdutoDoLocalStorage(produto, valor) {
	  let produtos;
	  let valores;
	

	  atualizarValorTotal(-(valor));
	

	  
	  if(localStorage.getItem('produtos') === null){
	    produtos = [];
	  } else {
	    produtos = JSON.parse(localStorage.getItem('produtos'));
	  }
	

	  
	  if(localStorage.getItem('valores') === null){
	    valores = [];
	  } else {
	    valores = JSON.parse(localStorage.getItem('valores'));
	  }
	

	  if(produtos.indexOf(produto) > -1){
	    produtos.splice(produtos.indexOf(produto),1);
	    valores.splice(valores.indexOf(parseFloat(valor),1));
	  }
	

	 
	  localStorage.setItem('produtos', JSON.stringify(produtos));
	  localStorage.setItem('valores', JSON.stringify(valores));
	}
	

	
	function clearProdutos() {
	  
	  if(confirm('Você quer deletar a lista?')){
	    while(tableList.firstChild) {
	      tableList.removeChild(tableList.firstChild);
	    }
	

	    atualizarValorTotal(-(somatoriaValorTotal));
	

	    
	    clearProdutosFromLocalStorage();
	  }
	}

	
	function clearProdutosFromLocalStorage() {
	    localStorage.removeItem('produtos');
	    localStorage.removeItem('valores');
	}