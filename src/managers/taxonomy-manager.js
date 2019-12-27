const { createFromUnsortedList } = require('../utils/tree-creation-helper');

const WorkbookManager = require('./workbook-manager');
const { getIdentifiersFromXlsx } = new WorkbookManager();

class TaxonomyManager {
	constructor() {}

	// this job is the start of a migration to use the raw
	// xml/xsd entry points and linkbase files, which are
	// much smaller and easier to move around. this will speed
	// up the tree creation process without the need to load
	// an entire 5-10mb xlsx to rebuild the tree
	getTaxonomyFileList() {
		// tell metadata service to fetch file list from
		// http://xbrl.fasb.org/us-gaap/2019/USGAAP20190131FileList.xml
		
		// dis = disclosure
		// elts = ?
		// entire = entire
		// stm = statement

		// dfs = pd.read_html('http://xbrl.fasb.org/us-gaap/2012/')
		// print(dfs[0])
	}

	createTaxonomyTreeFromXlsx(job) {
		const { location, year } = job.data;
		
		const formattedIdentifiers = getIdentifiersFromXlsx(undefined, location, version);
		await createFromUnsortedList(formattedIdentifiers, version);
	}
}

module.exports = TaxonomyManager;