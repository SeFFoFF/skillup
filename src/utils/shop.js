export const getUniqueTags = (games) => {
    return games?.map(game => game.tags)
        .flat()
        .filter((value, index, array) => array.indexOf(value) === index)
}