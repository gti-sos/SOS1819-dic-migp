exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	chromeOnly: true,
	specs: [
		"e2e/TC01-loadDataPopulationStats.js",
		"e2e/TC02-newStat.js",
		"e2e/TC03-deleteStat.js"]

};