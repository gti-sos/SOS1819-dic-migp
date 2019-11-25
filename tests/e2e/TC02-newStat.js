describe("Check if a new rate can be created: ", function() {
    it("List should grow after the rate creation", function() {
        browser.get("http://localhost:8080/#!/ui/v1/population-stats");
        element(by.css('[value=siguiente]')).click();
        element(by.css('[value=siguiente]')).click();
        element(by.css('[value=siguiente]')).click();
        element.all(by.repeater("populationStat in populationStats"))
            .then(function(initialPopulationStats) {
                element(by.model('newRate.country')).sendKeys("USA");
                element(by.model('newRate.year')).sendKeys(2018);
                element(by.model('newRate.population')).sendKeys(12);
                element(by.model('newRate.density')).sendKeys(20);
                element(by.model('newRate.natality')).sendKeys(11);
                element(by.model('newRate.mortality')).sendKeys(12);
                element(by.css('[value=add]')).click();
                
                element.all(by.repeater("populationStat in populationStats"))
                    .then(function(finalPopulationStats){
                       expect(finalPopulationStats.length).toEqual(initialPopulationStats.length+1);
                    });
                
            })
    })
});