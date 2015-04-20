angular.module('calendarDemoApp', [])

.factory('cdDateUtil', function(){
    function getMonths(){
        return [
            {label: "January", value: 0}, {label: "February", value: 1},
            {label: "March", value: 2}, {label: "April", value: 3},
            {label: "May", value: 4}, {label: "June", value: 5},
            {label: "July", value: 6}, {label: "August", value: 7},
            {label: "September", value: 8}, {label: "October", value: 9},
            {label: "November", value: 10}, {label: "December", value: 11}
        ];
    }
    
    function getYears(currentYear){
        var nyears = 20;
        var years = [];
        for(var i=currentYear-nyears; i<=currentYear+nyears; i++){
            years.push({label: i, value: i});
        }
        return years;
    }
    
    return {
        getMonths: getMonths,
        getYears: getYears
    }
})

.controller('CalendarCtrl', ['$scope', '$element', '$attrs', 'cdDateUtil', function($scope, $element, $attrs, cdDateUtil){
    var vm = $scope;
    vm.range = CalendarRange.getMonthlyRange(new Date());
    
    var currentYear = vm.range.start.getFullYear();
    var currentMonth = vm.range.start.toLocaleString('en-us', {month: 'long'});
    
    vm.years = cdDateUtil.getYears(currentYear);
    angular.forEach(vm.years, function(year){
        if(currentYear == year.label)
            vm.yearSelected = year;
    });
    
    vm.months = cdDateUtil.getMonths();
    angular.forEach(vm.months, function(month){
        if(currentMonth == month.label)
            vm.monthSelected = month;
    });
    
    vm.setRange = function(year, month){
        vm.range = CalendarRange.getMonthlyRange(new Date(year, month, '1'));
    };
    
    $scope.$watch('yearSelected', function(ys){
        vm.setRange(ys.value, vm.monthSelected.value);
    });
    
    $scope.$watch('monthSelected', function(ms){
        vm.setRange(vm.yearSelected.value, ms.value);
    });
    
    vm.isOut = function(idx, day){
        if(idx >= 0 && idx < 7){
            for(var i=0; i<7; i++){
                if(idx == i && day > 7)
                    return true;
            }
        }
        
        if(idx >= vm.range.days.length-7 && idx < vm.range.days.length){
            for(var i=vm.range.days.length-7; i<vm.range.days.length; i++){
                if(idx == i && day < 8)
                   return true;
            }
        }
        
        return false;
    };
}])

.directive('calendar', function(){
    return {
        restrict: 'E',
        scope: true,
        transclude: false,
        templateUrl: 'calendar.html',
        controller: 'CalendarCtrl',
        link: function(scope, element, attrs){
        }
    };
})