describe('calendar', function(){
    var scope, element, compiled, html;
    
    beforeEach(module('calendarDemoApp'));
    beforeEach(module('calendar.html'));
    
    beforeEach(inject(function($rootScope, $compile){
        html = '<calendar></calendar>';
        scope = $rootScope.$new();
        compiled = $compile(html);
        element = compiled(scope);
        scope.$digest();
    }))
    
    it('should render the element correctly', function(){
        var currDate = new Date();
        var range = CalendarRange.getMonthlyRange(currDate);
        expect(element.find('select')[0].length).toBe(12);
        expect(element.find('select')[1].length).toBe(41);
        expect(element.find('select option[selected=\'selected\']').eq(0).text()).toEqual(currDate.toLocaleString('en-us', {month: 'long'}));
        expect(element.find('select option[selected=\'selected\']').eq(1).text()).toEqual(currDate.getFullYear().toString());
        expect(element.find('.cal-cell').length).toBe(range.end.getDate());
        expect(element.find('.cal-cell-out').length).toBe(range.days.length - range.end.getDate());
    });
    
    it('should render the range correctly on April 1995', function(){
        var cusDate = new Date('1995', '3', '1');
        var range = CalendarRange.getMonthlyRange(cusDate);
        console.log(scope);
        expect(element.find('select option[selected=\'selected\']').eq(0).text()).toEqual('April');
        expect(element.find('select option[selected=\'selected\']').eq(1).text()).toEqual('1995');
    });
})