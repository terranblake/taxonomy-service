const xlsx = require('xlsx')
const { enums } = require('@postilion/utils');

class WorkbookManager {
	constructor() { }

	getIdentifiersFromXlsx(sheet, path, version) {
		// todo: determine document type from available fields in sheet being parsed
		// todo: store raw workbook objects that are less io heavy; should help
		// with load times when reparsing workbooks
		const sheets = sheet && [sheet] || enums.filingDocumentTypes;
		const workbook = xlsx.readFile(path);
		const sheets = workbook.SheetNames;

		let formattedIdentifiers = [];
		for (let type of sheets) {
			const sheetRegex = new RegExp(sheet, 'i');
			const matchedSheet = sheets.find(s => sheetRegex.test(s));

			if (!matchedSheet) {
				logger.error(`no sheet found that matches the provided sheet name. please try again!`);
				continue;
			}

			workbookIndex = sheets.indexOf(matchedSheet);
			workbookJson = xlsx.utils.sheet_to_json(workbook.Sheets[matchedSheet]);

			const identifiers = workbookParsers[version](rawIdentifiers, type, version).filter(i => i && i.label);
			formattedIdentifiers.push(identifiers);
		}

		return formattedIdentifiers;
	}
}

module.exports = WorkbookManager;