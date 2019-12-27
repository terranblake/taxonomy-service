const { Identifier } = require('@postilion/models');

const sortTree = (tree) => {
    logger.info('started sorting tree');
    return tree.sort(function ({ depth: a }, { depth: b }) {
        return a < b ? -1 : 1
    });
}

module.exports.createFromUnsortedList = async (tree, version) => {
    const topLevelIdentifiers = [];
    const sortedTree = sortTree(tree);
    logger.info('finished sorting tree');
    logger.info('started creating gaap taxonomy tree');

    let depthC = 0;
    for (let identifier of sortedTree) {
        const { depth, name, parent } = identifier;
        identifier.version = version;

        if (depth > depthC) {
            logger.info(`creating depth ${depthC} leaves`);
            depthC++;
        }

        const parentIdentifierName = parent && parent.split(':').pop();
        if (parentIdentifierName) {
            logger.info(`found parent identifier for ${name} depth ${depth - 1} parent ${parentIdentifierName}`);
            identifier.parent = parentIdentifierName;
        }

        logger.info(`creating identifier ${identifier.name}`);
        identifier = await Identifier.create(identifier);

        if (depth === 0) {
            logger.info(`top-level element ${name} depth ${depth - 1}`);
            topLevelIdentifiers.push(identifier);
        }
    };

    logger.info('finished creating gaap taxonomy tree');
    return topLevelIdentifiers;
}