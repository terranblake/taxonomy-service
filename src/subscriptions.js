const { Taxonomy } = require('@postilion/models');
const { Operation } = require('@postilion/pubsub');

const TaxonomyManager = require('./managers/taxonomy-manager');
const taxonomyManager = new TaxonomyManager();

module.exports = [
    {
        name: 'GetTaxonomyFileList',
        model: Taxonomy,
        operation: Operation.create,
        handler: taxonomyManager.getTaxonomyFileList,
        filters: [],
        options: {}
    },
	{
        // if a new taxonomy is created which has a supported xlsx
        // format, then we should try to format it.
        // todo: once the url and xml format type parsers are complete
        // this should be deprecated entirely because of how long it takes
        // to process and simply how bulky the files are to fetch/download
        name: 'CreateTaxonomyTreeFromXlsx',
        model: Taxonomy,
        operation: Operation.create,
        handler: taxonomyManager.createTaxonomyTreeFromXlsx,
        filters: [
            {
                $match: {
                    formats: {
                        $elemMatch: {
                            type: 'xlsx'
                        }
                    }
                }
            }
        ],
        options: {}
    },
]