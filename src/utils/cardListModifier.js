function sortList(defaultCardList, cardList, option)
{
    // the sort method will mutate the original array
    // make a new copy of the list and apply sorting to the new list
    switch(option)
    {
        case "default":
            return defaultCardList;
        case "costLH":
            return cardList.slice().sort((first, second) => first.cost-second.cost);
        case "costHL":
            return cardList.slice().sort((first, second) => second.cost-first.cost);
        case "powerLH":
            return cardList.slice().sort((first, second) => first.power-second.power);
        case "powerHL":
            return cardList.slice().sort((first, second) => second.power-first.power);
        default:
            return cardList;
    }
}

function filterList(cardList, filterOption)
{
    let checkSingleCode = (code, codeList) => {
        return codeList.length === 0 || codeList.includes(code);
    };

    let checkMultiCode = (codes, codeList) => {
        if(codeList.length === 0) return true; // nothing is specified in filter
        if(codes === undefined || codes.length === 0) return false; // nothing to check

        // if we do 'return codeList.includes(codes[index])' directly, process won't check further the list
        let index;
        for(index = 0; index < codes.length; ++index)
        {
            if(codeList.includes(codes[index])) return true;
        }
        return false;
    };

    let checkRange = (value, range) => {
        if((range[0] + range[1]) === "") return true; // range is not specified
        
        if(range[0] === "") return value <= Number(range[1]); // at most range[1]

        if(range[1] === "") return value >= Number(range[0]); // at least range[0]

        return value >= Number(range[0]) && value <= Number(range[1]); // between range[0] and range[1]
    };

    return cardList.filter(card => checkSingleCode(card.type, filterOption.filterCardType)) // filter by card type first
        .filter(card => checkSingleCode(card.rarityCd, filterOption.filterRarity)) // filter by rarity
        .filter(card => checkRange(card.cost, filterOption.filterCostRange)) // filter by cost
        .filter(card => checkRange(card.power, filterOption.filterPowerRange)) // filter by power
        .filter(card => checkMultiCode(card.civilizations, filterOption.filterCivil)) // filter by civilization
        .filter(card => checkMultiCode(card.races, filterOption.filterRace));  // filter by race
}

export { sortList, filterList }