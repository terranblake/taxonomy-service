const { readFile, utils } = require('xlsx')
const { enums, logger } = require('@postilion/utils');

const workbookParsers = require('../utils/workbook-parsers');

class WorkbookManager {
	constructor() { }

	getIdentifiersFromXlsx(sheet, path, taxonomy) {
		// todo: determine document type from available fields in sheet being parsed
		// todo: store raw workbook objects that are less io heavy; should help
		// with load times when reparsing workbooks
		const sheets = sheet && [sheet] || enums.filingDocumentTypes;

		logger.info(`loading file ${path.split('/').pop()} into memory for parsing`);
		const workbook = readFile(path);
		logger.info(`loaded file ${path.split('/').pop()} into memory for parsing`);

		const workbookSheets = workbook.SheetNames;

		let formattedIdentifiers = [];
		for (let type of sheets) {
			const sheetRegex = new RegExp(sheet, 'i');
			const matchedSheet = workbookSheets.find(s => sheetRegex.test(s));

			if (!matchedSheet) {
				logger.error(`no sheet found that matches sheet ${type}. please try again!`);
				continue;
			}

			logger.info(`formatting raw identifiers from sheet ${type}`);

			const rawIdentifiers = utils.sheet_to_json(workbook.Sheets[matchedSheet]);
			const identifiers = workbookParsers[taxonomy.year](rawIdentifiers, type, taxonomy).filter(i => i && i.label);
			formattedIdentifiers = formattedIdentifiers.concat(identifiers);
		}

		return formattedIdentifiers;
	}
}

module.exports = WorkbookManager;