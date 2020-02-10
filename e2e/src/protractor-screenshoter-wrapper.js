const fs = require('fs');
const protractorScreenshoter = require('protractor-screenshoter-plugin')

const ProtractorScreenshoterWrapper = function(){}

// Make protractorScreenshoter base of ProtractorScreenshoterWrapper
Object.setPrototypeOf(ProtractorScreenshoterWrapper.prototype, protractorScreenshoter);

ProtractorScreenshoterWrapper.prototype.teardown = function() {
    return protractorScreenshoter.teardown.call(this).then(() => {
        if (this.config.injectToHtml) {
            const indexFile = this.config.screenshotPath + '/index.html';
            const endOfHead = /(<\/head\s*>)/i;
            let html = fs.readFileSync(indexFile, {encoding: 'utf-8'});
            html = html.replace(endOfHead, match => { return this.config.injectToHtml + match; });
            fs.writeFileSync(indexFile, html, {encoding: 'utf-8'})
        }
        return;
    });
}

module.exports = new ProtractorScreenshoterWrapper();
