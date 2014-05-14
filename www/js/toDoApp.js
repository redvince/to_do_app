/* AngularJS Controller and ViewModel(scope): toDoApp.js
*  Author: Vincent Redmond
*  Assignment 2: WE3.0 Mobile Web Applications, Digital Skills Academy
*  Student ID: D13126159
*  Date : 2014/05/14
*/
var toDoApp = angular.module('toDoApp', []);
//inject scope object into controller, scope is model for the controller
toDoApp.controller('ToDoListController', function($scope) {
	//add properties to scope object, list of to do tasks
	$scope.toDo = [
					{ what:'Learn JavaScript', when: new Date(2014, 4, 21), done: false, details:'UPC Like JavaScript'},
					{ what:'Submit this', when: new Date(2014, 4, 14), done: true, details:'Has to be Submitted'},
					{ what:'Take a break', when: new Date(2015, 6, 6), done: false, details:'Will be necessary' },
					{ what:'Make Daniel lol', when: new Date(2014, 4, 14), done: true, details:'You Just Did, lol'}
	];
	//array of default values to order list in view
	$scope.sorts = ['done', 'when', 'what'];
	//function to format today's date
	var todayDate = function() {

		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth()+1;
		var year = date.getFullYear();
			
		if (day < 10) {
			day ='0'+ day;
		} 
		
		if (month < 10) {
			month ='0' + month;
		} 
		
		var today = year + '-' + month + '-' + day;
		
		return today;
	}
	//default date in view
	$scope.newToDOwhen = todayDate();
	//function to add new tasks to the list
	$scope.addToDo = function() {

		$scope.toDo.push({
			what: $scope.newToDOwhat,
			when: $scope.newToDOwhen,
			done:false,
			details: $scope.newToDOdetails
		});
		//reset default form values
		$scope.newToDOwhat = '';
		$scope.newToDOwhen = todayDate();
		$scope.newToDOdetails = '';
	};
	//delete task from list
	$scope.delete = function(toDo) {

		$scope.toDo.splice($scope.toDo.indexOf(toDo), 1);
	};
	//deletes all completed tasks
	$scope.deleteAll = function() {
		//copy all tasks
		var tempToDo = $scope.toDo;
		//empty scope list
		$scope.toDo = [];
		//re-add tasks not done
		angular.forEach(tempToDo, function(toDo) {
			if (!toDo.done) { 
				$scope.toDo.push(toDo);
			}
		});
	};
	//alert details for task
	$scope.itemInfo = function(toDo) {

		alert(toDo.what + ' : ' +toDo.details);
	};
	//toggle view either complete or incompleted tasks
	$scope.toggleDone = function() {
		//set scope property for filtering task list
		if ($scope.completed === 'true') {
			$scope.completed = 'false';	
		}
		else {
			$scope.completed = 'true';
		}	
	};
	//view all tasks regardless of done status
	$scope.viewAll = function() {
		//reset for filter
		$scope.completed = '';			
	};
	//sets sort array to order list in view
	$scope.sortDate = function() {

	 	if ($scope.sorts[0] === 'when') {
			$scope.sorts[0] = '-when';	
		}
		else {
			$scope.sorts[0] = 'when';
		}

		$scope.sorts[1] = 'what'; 
		$scope.sorts[2] = 'done';
	};
	//sets sort array to order list in view
	$scope.sortTask = function() {

	 	if ($scope.sorts[0] === 'what') {
			$scope.sorts[0] = '-what';	
		}
		else {
			$scope.sorts[0] = 'what';
		}

		$scope.sorts[1] = 'when'; 
		$scope.sorts[2] = 'done';
	};
	//sets sort array to order list in view
	$scope.sortDone = function() {

	 	if ($scope.sorts[0] === 'done') {
			$scope.sorts[0] = '-done';	
		}

		else{
			$scope.sorts[0] = 'done';
		}

		$scope.sorts[1] = 'when'; 
		$scope.sorts[2] = 'what';
	};
	//counts the tasks left to complete
	$scope.tasksLeft = function() {

		var count = 0;
		//traverses toDo array counting undone tasks
		angular.forEach($scope.toDo, function(toDo) {
			count += toDo.done ? 0 : 1;
		});
		
		return count;
	};
});