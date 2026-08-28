function getGameOverScreenOverlay() {
    return `
    <div id="game-over-screen" class="game-over-screen">
        <div class="game-over-screen-wrapper">
                    <p class="game-over-text">!GAME OVER!</p>
        </div>
        <div>
                    <button onclick="show('canvas'), hide('game-over-screen'), init()" class="btn-start-game">Restart
                        Game!</button>
        </div>
    </div>
    `
}