describe('Data is loaded: ', function () {
	it('should show a bunch of data', function (){
		browser.get('http://localhost:8080/#!/ui/v1/population-stats');
		
		element.all(by.repeater('populationStat in populationStats'))
			.then(function(populationStats) {
				expect(populationStats.length).toBeGreaterThan(0);
			});
		
	});
});