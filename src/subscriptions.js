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
    },
	{
        // get all filing documents associated with a new filing
        name: 'CreateTaxonomyTreeFromXlsx',
        model: Taxonomy,
        operation: Operation.create,
        handler: taxonomyManager.createTaxonomyTreeFromXlsx,
        filters: [
            {
                $match: {
                    type: 'xlsx'
                }
            }
        ],
        options: {}
    },
]