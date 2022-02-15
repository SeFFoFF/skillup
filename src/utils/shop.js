export const getUniqueTags = (games) => {
    return games?.map(game => game.tags)
        .flat()
        .filter((value, index, array) => array.indexOf(value) === index)
}

export const getFilteredGamesByTags = (games, tags) => {
    if (tags && tags.length > 0) return games.filter(game => game.tags.some((game) => tags.includes(game)))
    else return games
}

export const getAllGames = () => {
    return fetch("https://my-json-server.typicode.com/SeFFoFF/skillup/games")
        .then(res => res.json())
        .then(data => data)
}