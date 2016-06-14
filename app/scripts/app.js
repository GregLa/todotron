(function(){

    'use strict';

    var _templateBase ='./scripts/partials';

    angular.module('app', [
        'ui.router',
        'ngMaterial',
        'ngAnimate'
    ])
    .config(appConfig)
    .service('todoService', ['$q', TodoService])
    .controller('todoController', ['$scope','todoService', '$mdDialog', TodoController]);

    function appConfig($stateProvider, $urlRouterProvider){

        // For any unmatched url, redirect to /active-todos
        $urlRouterProvider.otherwise("/active-todos");

        // Set up the states
        $stateProvider
            .state('/',{
                url: "/active-todos",
                templateUrl: _templateBase + "/active-todos.html"
            })
            .state('active-todos',{
                url: "/active-todos",
                templateUrl: _templateBase + "/active-todos.html"
            })
            .state('archived-todos',{
                url: "/archived-todos",
                templateUrl: _templateBase + "/archived-todos.html"
            });
    }

    function TodoService($q){

        return {
            getTodos: getTodos,
            getArchivedTodos : getArchivedTodos,
            addTodo: addTodo,
            archiveTodo: archiveTodo,
            deleteTodo: deleteTodo
        };

        function getTodos(){
            var deferred = $q.defer();

            Todos.find({archived : false},function(err, todos){
                if (err) deferred.reject(err);
                deferred.resolve(todos);
            });

            return deferred.promise;
        }

        function getArchivedTodos(){
            var deferred = $q.defer();

            Todos.find({archived : true},function(err, todos){
                if (err) deferred.reject(err);
                deferred.resolve(todos);
            });

            return deferred.promise;
        }

        function addTodo(text){
            var deferred = $q.defer();

            var todo = new Todos();

            todo.text = text;
            todo.done = false;
            todo.archived = false;

            Todos.insert(todo, function(err, newTodo){
                if (err) deferred.reject(err);
                deferred.resolve(newTodo);
            });

            return deferred.promise;
        }

        function archiveTodo(id){
            var deferred = $q.defer();

            Todos.update({_id: id}, { $set: { archived : true } }, {}, function(err, numReplaced){
                if (err) deferred.reject(err);
                deferred.resolve(numReplaced);
            });

            return deferred.promise;
        }

        function deleteTodo(id){
            var deferred = $q.defer();

            Todos.remove({_id: id}, function(err, numRemoved){
                if (err) deferred.reject(err);
                deferred.resolve(numRemoved);
            });

            return deferred.promise;
        }
    }

    function TodoController($scope, todoService, $mdDialog){

        $scope.todo = { text : ''};
        $scope.todos = [];
        $scope.archivedTodos = [];

        $scope.getAllTodos = function(){
            todoService.getTodos().then(function(todos){
                $scope.todos = todos;
            });
        };

        $scope.getAllArchivedTodos = function(){
            todoService.getArchivedTodos().then(function(todos){
                $scope.archivedTodos = todos;
            });
        };

        $scope.addTodo = function(){
            todoService.addTodo($scope.todo.text).then(function(newTodo){
                $scope.todo.text = '';
                $scope.getAllTodos();
            });
        };

        $scope.archiveTodo = function(ev, id){

            var confirm = $mdDialog.confirm()
                .title('Warning')
                .content('Do you really want to archive this todo ?')
                .ok('Yep')
                .cancel('Nope')
                .targetEvent(ev);

            $mdDialog.show(confirm).then(function(){
                todoService.archiveTodo(id).then(function(numReplaced){
                    $scope.getAllTodos();
                    $scope.getAllArchivedTodos();
                });
            });
        };

        $scope.deleteTodo = function(ev, id){

            var confirm = $mdDialog.confirm()
                                   .title('Warning')
                                   .content('Do you really want to delete this todo ?')
                                   .ok('Yep')
                                   .cancel('Nope')
                                   .targetEvent(ev);

            $mdDialog.show(confirm).then(function(){
                todoService.deleteTodo(id).then(function(numReplaced){
                    $scope.getAllArchivedTodos();
                });
            });
        };

        // Load initial data
        $scope.getAllTodos();
        $scope.getAllArchivedTodos();
    }

})();

