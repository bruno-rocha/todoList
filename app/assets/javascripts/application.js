// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//require rails-ujs
//= require jquery
//= require angular
//= require angular-resource
// require turbolinks
// require_tree .

app = angular.module("todoList", ['ngResource']);

app.factory('Task', ['$resource', function ($resource) {
    return $resource("/tasks/:id.json", {id: "@id"}, {
        update: {method: "PUT"},
        query:  {method: 'GET', isArray: true}})
}]);

app.controller('TaskCtrl', ['$scope', 'Task', function ($scope, Task) {
    $scope.tasks = Task.query();

    $scope.addTask = function (newTask) {
        var task = Task.save({name : newTask.name});
        $scope.tasks.push(task);
    };

    $scope.toggleDone = function (task) {
        task.is_done = !task.is_done;
        Task.update({'id' : task.id}, task);
    };

    $scope.editName = function (task) {
        // var  = !task.is_done;
        // task.is_done = status;
        // Task.update({'id' : task.id}, task);
    };

    $scope.deleteTask = function (oldTask) {
        Task.delete({}, {'id' : oldTask.id});
        $scope.tasks.splice( $scope.tasks.indexOf(oldTask), 1 );
    };

}]);
