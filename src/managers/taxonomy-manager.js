const { Identifier } = require('@postilion/models');
const { logger } = require('@postilion/utils');

const WorkbookManager = require('./workbook-manager');
const { getIdentifiersFromXlsx } = new WorkbookManager();

class TaxonomyManager {
	constructor() {}

	// this job is the start of a migration to use the raw
	// xml/xsd entry points and linkbase files, which are
	// much smaller and easier to move around. this will speed
	// up the tree creation process without the need to load
	// an entire 5-10mb xlsx to rebuild the tree
	async getTaxonomyFileList() {
		// tell metadata service to fetch file list from
		// http://xbrl.fasb.org/us-gaap/2019/USGAAP20190131FileList.xml
		
		// dis = disclosure
		// elts = ?
		// entire = entire
		// stm = statement

		// dfs = pd.read_html('http://xbrl.fasb.org/us-gaap/2012/')
		// print(dfs[0])
	}

	async createTaxonomyTreeFromXlsx(job) {
		const { year: version } = job.data;

		// todo: remove in favor of downloading from source
		let tempLocation = `${process.cwd()}/data/US_GAAP_Taxonomy_${version.toString()}.xlsx`;
		const formattedIdentifiers = getIdentifiersFromXlsx('calculation', tempLocation, job.data);
		
		logger.info(`formatted raw identifiers from xlsx ${tempLocation}`);

		for (let identifier of formattedIdentifiers) {
			await Identifier.create(identifier);
		}

		logger.info(`created identifiers from xlsx ${tempLocation}`);
	}
}

module.exports = TaxonomyManager;