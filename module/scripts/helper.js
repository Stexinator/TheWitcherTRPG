export function getCurrentCharacter() {
    return canvas.tokens.controlled[0]?.actor ?? game.user.character
}

export function getCurrentToken() {
    return canvas.tokens.controlled[0] ?? game.user.character.token
}