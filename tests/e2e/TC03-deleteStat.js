describe("Check if a rate can be removed: ", function() {
    it("List should decrease after the rate removing", function() {
        browser.get("http://localhost:8080/#!/ui/v1/population-stats");
        element(by.css('[value=siguiente]')).click();
        element(by.css('[value=siguiente]')).click();
        element(by.css('[value=siguiente]')).click();
        element.all(by.repeater("populationStat in populationStats"))
            .then(function(initialPopulationStats) {
                
                element.all(by.css('[value=delete]')).last().click();
                
                element.all(by.repeater("populationStat in populationStats"))
                    .then(function (finalPopulationStats) {
                        expect(finalPopulationStats.length).toEqual(initialPopulationStats.length-1);
                    });
            });
    });
});