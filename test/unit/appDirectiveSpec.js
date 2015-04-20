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
        var currentDate = new Date();
        
        expect(element.find('select')[0].length).toBe(12);
        expect(element.find('select')[1].length).toBe(41);
        expect(element.find('select option[selected=\'selected\']').eq(0).text()).toEqual(currentDate.toLocaleString('en-us', {month: 'long'}));
        expect(element.find('select option[selected=\'selected\']').eq(1).text()).toEqual(currentDate.getFullYear().toString());        
    });
})