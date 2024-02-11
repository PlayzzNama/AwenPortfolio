const defaultCount = 20
const ufosCount = 10

let shootCount = defaultCount;
let transleteX = 0
let transleteY = 0
let maxMove = window.screen.width / 2 - 200

let containerX = 10
let containerY = 0
let destroyed = 0
let moving

function handleKeyPress(event) {
    let key = event.key;
    let img = document.getElementById("ship");

    if(key === "ArrowLeft") {
        if(transleteX > -maxMove) {
            transleteX = transleteX - 10;
        } else {
            alert("Oops... You have reached border.")
        }
        img.style.transform = `translate(${transleteX}px, ${transleteY}px)`
    } else if(key === "ArrowRight") {
        if(transleteX < maxMove) {
            transleteX = transleteX + 10;
        } else {
            alert("Oops... You have reached border.")
        }
        img.style.transform = `translate(${transleteX}px, ${transleteY}px)`
    } else if(key === " ") {
        if(shootCount > 0) {
            shootCount = shootCount - 1
            shoot()
        } else {
            gameOver()
        }
    }
}

function startGame() {
    
    let button = document.getElementById("startButton");
    button.style.display = "none";
    
    let img = document.getElementById("ship");
    transleteY += 450;
    img.style.transform = "translateY(" + transleteY + "px)"

    let gameName = document.getElementById("gameName")
    gameName.style.display = "none"

    let modalShow = document.getElementById("myModal")
    modalShow.style.display = "none"
    
    let shootsLeft = document.getElementById("shootLeft")
    shootsLeft.style.visibility = "visible";

    const imageNames = ["./img/1.png", "./img/2.png", "./img/3.png"]
    const imageContainer = document.getElementById("imageContainer")

    let imageId = 0;
    for(let i = 0; i < 10; i++) {
        const image = document.createElement("img")
        const imageName = imageNames[imageId]
        image.src = imageName
        image.className = "ufo"
        imageContainer.appendChild(image)

        imageId++;
        
        if(imageId == 3) {
            imageId = 0
        }
    }

        moving = setInterval(function() {
        containerY += 5
        containerX *= -1
        imageContainer.style.transform = `translate(${containerX}px,${containerY}px)`

        const divRect = imageContainer.getBoundingClientRect()
        const shipRect = ship.getBoundingClientRect()

        if(divRect.bottom > shipRect.top) {
            gameOver()
        }
    }, 1000 / 4)

    window.addEventListener("keydown", handleKeyPress)
}

function resetGame() {

                    
                    clearInterval(moving)

                    let button = document.getElementById("startButton");
                    button.style.display = "block";

                    let gameName = document.getElementById("gameName")
                    gameName.style.display = "block"

                    transleteX = 0
                    transleteY = 0
                    containerX = 10
                    containerY = 0
                    destroyed = 0

                    shootCount = defaultCount

                    ship.style.transform = "translate(0px, 0px)"
                    imageContainer.style.transform = "translate(0px, 0px)"
                    imageContainer.innerHTML = ""

                    showModal()
}

function shoot() {
    
    let splashContainer = document.getElementById("splashContainer")
    let ship = document.getElementById("ship")

    let splash = document.createElement("div")
    splash.className = "splash"
    splash.style.left = window.screen.width / 2 + transleteX + "px"
    splash.style.bottom = 200 + "px"
    splashContainer.appendChild(splash)

    updateShootCountDisplay()
    updateDestroyedCountDisplay()

    const movingInterval = setInterval(function() {
        for(let i = 0; i < imageContainer.children.length; i++) {
            const childElement = imageContainer.children[i]
            if(childElement.style.visibility == "hidden")
                continue

            const divRect = childElement.getBoundingClientRect();
            const splashRect = splash.getBoundingClientRect()

            if(divRect.right >= splashRect.right && divRect.left <= splashRect.left && splashRect.top < divRect.bottom) {
                clearInterval(movingInterval)
                splashContainer.removeChild(splash)
                childElement.style.visibility = "hidden"
                destroyed++
                if(destroyed == ufosCount) {
                    resetGame()
                }
                break
            }
        }
        
        const splashPositionY = parseFloat(getComputedStyle(splash).bottom)
        const step = 10
        
        if(splashPositionY >= window.innerHeight) {
            clearInterval(movingInterval)
            splashContainer.removeChild(splash)
        } else {
            splash.style.bottom = splashPositionY + step + "px"
        }
    }, 1000 / 60)

}




  
function showModal() {

    const modal = document.getElementById("myModal");
    modal.style.display = "block";
  
};

function gameOver() {

    const gameOver = document.getElementById("gameOver")
    gameOver.style.display = "block"

}

function playAgain() {

    clearInterval(moving)

                    let button = document.getElementById("startButton");
                    button.style.display = "block";

                    let gameName = document.getElementById("gameName")
                    gameName.style.display = "block"

                    const gameOver = document.getElementById("gameOver")
                    gameOver.style.display = "none"

                    transleteX = 0
                    transleteY = 0
                    containerX = 10
                    containerY = 0
                    destroyed = 0

                    shootCount = defaultCount

                    ship.style.transform = "translate(0px, 0px)"
                    imageContainer.style.transform = "translate(0px, 0px)"
                    imageContainer.innerHTML = ""

    gameOver()
}

function updateShootCountDisplay() {
    
    const shootCountDisplay = document.getElementById("shootCountDisplay");
    shootCountDisplay.textContent = shootCount;
}

function updateDestroyedCountDisplay() {
    
    const destroyedCountDisplay = document.getElementById("destroyedCount");
    destroyedCountDisplay.textContent = destroyed + 1;
}