const puppeteer = require('puppeteer');
const fs = require('fs');

async function getPerformanceMetrics(url, iterations) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];

  for (let i = 0; i < iterations; i++) {
    await page.goto(url);

    const performanceTiming = JSON.parse(
      await page.evaluate(() => JSON.stringify(window.performance.timing))
    );

    const resources = await page.evaluate(() => {
      return performance.getEntriesByType('resource').map((resource) => ({
        name: resource.name,
        initiatorType: resource.initiatorType,
        transferSize: resource.transferSize,
        encodedBodySize: resource.encodedBodySize,
        decodedBodySize: resource.decodedBodySize,
        duration: resource.duration,
      }));
    });

    results.push({
      iteration: i + 1,
      transferSize: performanceTiming.transferSize,
      resources,
      loadTime: performanceTiming.loadEventEnd - performanceTiming.navigationStart,
    });
  }

  await browser.close();

  // Save results to a JSON file
  fs.writeFileSync('performance-metrics.json', JSON.stringify(results, null, 2));
}

const url = 'http://127.0.0.1:8080/'; //the URL for the hosted http-server
const iterations = 50;

getPerformanceMetrics(url, iterations).then(() => {
  console.log('Performance metrics collected.');
});

//we are using a node.js module 'Puppeteer' to execute repetitive reloads and save data into a JSON file,
//which we will later use hand-in-hand with Pandas, a Python librarty, to analyse and plot graphs using Matplotlib.

/**
 * Base info:
 * Average Transfer Size: 95.52 KB
 * Average Load Time: 922.22 ms
 * 
 * Standard info:
 * Average Transfer Size: 48.34 KB
 * Average Load Time: 972.2 ms
 * 
 * Custom info:
 * Average Transfer Size: 28.44 KB
 * Average Load Time: 888.26 ms
 * 
 */



 