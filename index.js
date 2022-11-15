const canvas = document.getElementById("canvas1")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d")

const angleXSlider = document.getElementById("angleX")
const angleYSlider = document.getElementById("angleY")
const angleZSlider = document.getElementById("angleZ")

let mouse = {
    x: undefined,
    lastX: undefined,
    y: undefined,
    lastY: undefined,
    down: false
}

let drawnCenters = []

angleXSlider.oninput = () => {
    angleX = (angleXSlider.value / 360) * Math.PI * 2
    cube.render(angleX, angleY, angleZ)
}
angleYSlider.oninput = () => {
    angleY = (angleYSlider.value / 360) * Math.PI * 2
    cube.render(angleX, angleY, angleZ)
}
angleZSlider.oninput = () => {
    angleZ = (angleZSlider.value / 360) * Math.PI * 2
    cube.render(angleX, angleY, angleZ)
}

const scale = 160
const offsetX = canvas.width / 2
const offsetY = canvas.height / 2

let angleX = 0
let angleY = 0
let angleZ = 0

let animationInterval

canvas.addEventListener("mousedown", event => {
    mouse.x = event.x
    mouse.y = event.y
    mouse.down = true
    let color = checkInside(event.x, event.y)
    if (!color) return
    let side = cube.state.findIndex(thisState => { return thisState.center == color })
    if(animationInterval) return
    if (event.button == 2) {
        //console.log("reverse")
        animationInterval = setInterval(() => { animateRotation(side, -1) }, 10)
    } else {
        //not reverse
        animationInterval = setInterval(() => { animateRotation(side, 1) }, 10)
    }
})

canvas.addEventListener("mouseup", event => {
    mouse.down = false
})

canvas.addEventListener("mousemove", event =>{
    if(!mouse.down) return

    mouse.lastX = mouse.x
    mouse.lastY = mouse.y
    mouse.x = event.x
    mouse.y = event.y

    let deltaX = mouse.lastX-mouse.x
    let deltaY = mouse.lastY-mouse.y

    angleX += -deltaY/200
    angleY += deltaX/200

    cube.render(angleX,angleY,angleZ)
})

let cube = {
    solved: false,
    state: [
        {
            //position: {x1:-1.5,y1:-1,z1:0.5,x2:-0.5,y2:-1,z2:1.5} --> x,y,z koordinaten sind relativ zum mittelpunkt des Würfels -> in der mitte wäre 0,0,0 -> von links (-1.5) nach rechts (1.5), von oben nach undten und von vorne nach hinter
            center: "white",
            angle: { x: 0, y: 1, z: 0 },
            neighbors: [
                { side: 1, tiles: [0, 1, 2] }, // side: 1 -red white 0, blue 2, organe 3, green 4, yellow 5
                { side: 2, tiles: [0, 1, 2] },
                { side: 3, tiles: [0, 1, 2] },
                { side: 4, tiles: [0, 1, 2] }
            ],
            positions: [
                {
                    x1: -1.5, y1: -1.5, z1: 1.5,
                    x2: -0.5, y2: -1.5, z2: 1.5,
                    x3: -0.5, y3: -1.5, z3: 0.5,
                    x4: -1.5, y4: -1.5, z4: 0.5
                },
                {
                    x1: -0.5, y1: -1.5, z1: 0.5,
                    x2: 0.5, y2: -1.5, z2: 0.5,
                    x3: 0.5, y3: -1.5, z3: 1.5,
                    x4: -0.5, y4: -1.5, z4: 1.5
                },
                {
                    x1: 0.5, y1: -1.5, z1: 0.5,
                    x2: 1.5, y2: -1.5, z2: 0.5,
                    x3: 1.5, y3: -1.5, z3: 1.5,
                    x4: 0.5, y4: -1.5, z4: 1.5
                },
                {
                    x1: -1.5, y1: -1.5, z1: -0.5,
                    x2: -0.5, y2: -1.5, z2: -0.5,
                    x3: -0.5, y3: -1.5, z3: 0.5,
                    x4: -1.5, y4: -1.5, z4: 0.5
                },
                {
                    x1: -0.5, y1: -1.5, z1: -0.5,
                    x2: 0.5, y2: -1.5, z2: -0.5,
                    x3: 0.5, y3: -1.5, z3: 0.5,
                    x4: -0.5, y4: -1.5, z4: 0.5
                },
                {
                    x1: 0.5, y1: -1.5, z1: -0.5,
                    x2: 1.5, y2: -1.5, z2: -0.5,
                    x3: 1.5, y3: -1.5, z3: 0.5,
                    x4: 0.5, y4: -1.5, z4: 0.5
                },
                {
                    x1: -1.5, y1: -1.5, z1: -1.5,
                    x2: -0.5, y2: -1.5, z2: -1.5,
                    x3: -0.5, y3: -1.5, z3: -0.5,
                    x4: -1.5, y4: -1.5, z4: -0.5
                },
                {
                    x1: -0.5, y1: -1.5, z1: -1.5,
                    x2: 0.5, y2: -1.5, z2: -1.5,
                    x3: 0.5, y3: -1.5, z3: -0.5,
                    x4: -0.5, y4: -1.5, z4: -0.5
                },
                {
                    x1: 0.5, y1: -1.5, z1: -1.5,
                    x2: 1.5, y2: -1.5, z2: -1.5,
                    x3: 1.5, y3: -1.5, z3: -0.5,
                    x4: 0.5, y4: -1.5, z4: -0.5
                }
            ],
            tiles: ["white", "white", "white", "white", "white", "white", "white", "white", "white"] // reihe für reihe von oben links nach oben rechts -> mitte links nach mitte recht und unten links nach untern rechts (wenn man frontal auf die seite drauf schaut)
        },
        {
            center: "red",
            angle: { x: 0, y: 0, z: 1 },
            neighbors: [
                { side: 0, tiles: [6, 7, 8] },
                { side: 4, tiles: [2, 5, 8] },
                { side: 5, tiles: [0, 1, 2] },
                { side: 2, tiles: [0, 3, 6] }
            ],
            positions: [
                {
                    x1: -1.5, y1: -1.5, z1: -1.5,
                    x2: -0.5, y2: -1.5, z2: -1.5,
                    x3: -0.5, y3: -0.5, z3: -1.5,
                    x4: -1.5, y4: -0.5, z4: -1.5
                },
                {
                    x1: -0.5, y1: -1.5, z1: -1.5,
                    x2: 0.5, y2: -1.5, z2: -1.5,
                    x3: 0.5, y3: -0.5, z3: -1.5,
                    x4: -0.5, y4: -0.5, z4: -1.5
                },
                {
                    x1: 0.5, y1: -1.5, z1: -1.5,
                    x2: 1.5, y2: -1.5, z2: -1.5,
                    x3: 1.5, y3: -0.5, z3: -1.5,
                    x4: 0.5, y4: -0.5, z4: -1.5
                },
                {
                    x1: -1.5, y1: -0.5, z1: -1.5,
                    x2: -0.5, y2: -0.5, z2: -1.5,
                    x3: -0.5, y3: 0.5, z3: -1.5,
                    x4: -1.5, y4: 0.5, z4: -1.5
                },
                {
                    x1: -0.5, y1: -0.5, z1: -1.5,
                    x2: 0.5, y2: -0.5, z2: -1.5,
                    x3: 0.5, y3: 0.5, z3: -1.5,
                    x4: -0.5, y4: 0.5, z4: -1.5
                },
                {
                    x1: 0.5, y1: -0.5, z1: -1.5,
                    x2: 1.5, y2: -0.5, z2: -1.5,
                    x3: 1.5, y3: 0.5, z3: -1.5,
                    x4: 0.5, y4: 0.5, z4: -1.5
                },
                {
                    x1: -1.5, y1: 0.5, z1: -1.5,
                    x2: -0.5, y2: 0.5, z2: -1.5,
                    x3: -0.5, y3: 1.5, z3: -1.5,
                    x4: -1.5, y4: 1.5, z4: -1.5
                },
                {
                    x1: -0.5, y1: 0.5, z1: -1.5,
                    x2: 0.5, y2: 0.5, z2: -1.5,
                    x3: 0.5, y3: 1.5, z3: -1.5,
                    x4: -0.5, y4: 1.5, z4: -1.5
                },
                {
                    x1: 0.5, y1: 0.5, z1: -1.5,
                    x2: 1.5, y2: 0.5, z2: -1.5,
                    x3: 1.5, y3: 1.5, z3: -1.5,
                    x4: 0.5, y4: 1.5, z4: -1.5
                }
            ],
            tiles: ["red", "red", "red", "red", "red", "red", "red", "red", "red"]
        },
        {
            center: "blue",
            angle: { x: -1, y: 0, z: 0 },
            neighbors: [
                { side: 0, tiles: [2, 5, 8] },
                { side: 1, tiles: [2, 5, 8] },
                { side: 5, tiles: [2, 5, 8] },
                { side: 3, tiles: [0, 3, 6] }

            ],
            positions: [
                {
                    x1: 1.5, y1: -1.5, z1: -1.5,
                    x2: 1.5, y2: -0.5, z2: -1.5,
                    x3: 1.5, y3: -0.5, z3: -0.5,
                    x4: 1.5, y4: -1.5, z4: -0.5
                },
                {
                    x1: 1.5, y1: -1.5, z1: -0.5,
                    x2: 1.5, y2: -0.5, z2: -0.5,
                    x3: 1.5, y3: -0.5, z3: 0.5,
                    x4: 1.5, y4: -1.5, z4: 0.5
                },
                {
                    x1: 1.5, y1: -1.5, z1: 0.5,
                    x2: 1.5, y2: -0.5, z2: 0.5,
                    x3: 1.5, y3: -0.5, z3: 1.5,
                    x4: 1.5, y4: -1.5, z4: 1.5
                },
                {
                    x1: 1.5, y1: -0.5, z1: -1.5,
                    x2: 1.5, y2: 0.5, z2: -1.5,
                    x3: 1.5, y3: 0.5, z3: -0.5,
                    x4: 1.5, y4: -0.5, z4: -0.5
                },
                {
                    x1: 1.5, y1: -0.5, z1: -0.5,
                    x2: 1.5, y2: 0.5, z2: -0.5,
                    x3: 1.5, y3: 0.5, z3: 0.5,
                    x4: 1.5, y4: -0.5, z4: 0.5
                },
                {
                    x1: 1.5, y1: -0.5, z1: 0.5,
                    x2: 1.5, y2: 0.5, z2: 0.5,
                    x3: 1.5, y3: 0.5, z3: 1.5,
                    x4: 1.5, y4: -0.5, z4: 1.5
                },
                {
                    x1: 1.5, y1: 0.5, z1: -1.5,
                    x2: 1.5, y2: 1.5, z2: -1.5,
                    x3: 1.5, y3: 1.5, z3: -0.5,
                    x4: 1.5, y4: 0.5, z4: -0.5
                },
                {
                    x1: 1.5, y1: 0.5, z1: -0.5,
                    x2: 1.5, y2: 1.5, z2: -0.5,
                    x3: 1.5, y3: 1.5, z3: 0.5,
                    x4: 1.5, y4: 0.5, z4: 0.5
                },
                {
                    x1: 1.5, y1: 0.5, z1: 0.5,
                    x2: 1.5, y2: 1.5, z2: 0.5,
                    x3: 1.5, y3: 1.5, z3: 1.5,
                    x4: 1.5, y4: 0.5, z4: 1.5
                }
            ],
            tiles: ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue"]
        },
        {
            center: "orange",
            angle: { x: 0, y: 0, z: -1 },
            neighbors: [
                { side: 0, tiles: [0, 1, 2] },
                { side: 2, tiles: [2, 5, 8] },
                { side: 5, tiles: [6, 7, 8] },
                { side: 4, tiles: [0, 3, 6] }

            ],
            positions: [
                {
                    x1: 1.5, y1: -1.5, z1: 1.5,
                    x2: 0.5, y2: -1.5, z2: 1.5,
                    x3: 0.5, y3: -0.5, z3: 1.5,
                    x4: 1.5, y4: -0.5, z4: 1.5
                },
                {
                    x1: 0.5, y1: -1.5, z1: 1.5,
                    x2: -0.5, y2: -1.5, z2: 1.5,
                    x3: -0.5, y3: -0.5, z3: 1.5,
                    x4: 0.5, y4: -0.5, z4: 1.5
                },
                {
                    x1: -0.5, y1: -1.5, z1: 1.5,
                    x2: -1.5, y2: -1.5, z2: 1.5,
                    x3: -1.5, y3: -0.5, z3: 1.5,
                    x4: -0.5, y4: -0.5, z4: 1.5
                },
                {
                    x1: 1.5, y1: -0.5, z1: 1.5,
                    x2: 0.5, y2: -0.5, z2: 1.5,
                    x3: 0.5, y3: 0.5, z3: 1.5,
                    x4: 1.5, y4: 0.5, z4: 1.5
                },
                {
                    x1: 0.5, y1: -0.5, z1: 1.5,
                    x2: -0.5, y2: -0.5, z2: 1.5,
                    x3: -0.5, y3: 0.5, z3: 1.5,
                    x4: 0.5, y4: 0.5, z4: 1.5
                },
                {
                    x1: -0.5, y1: -0.5, z1: 1.5,
                    x2: -1.5, y2: -0.5, z2: 1.5,
                    x3: -1.5, y3: 0.5, z3: 1.5,
                    x4: -0.5, y4: 0.5, z4: 1.5
                },
                {
                    x1: 1.5, y1: 0.5, z1: 1.5,
                    x2: 0.5, y2: 0.5, z2: 1.5,
                    x3: 0.5, y3: 1.5, z3: 1.5,
                    x4: 1.5, y4: 1.5, z4: 1.5
                },
                {
                    x1: 0.5, y1: 0.5, z1: 1.5,
                    x2: -0.5, y2: 0.5, z2: 1.5,
                    x3: -0.5, y3: 1.5, z3: 1.5,
                    x4: 0.5, y4: 1.5, z4: 1.5
                },
                {
                    x1: -0.5, y1: 0.5, z1: 1.5,
                    x2: -1.5, y2: 0.5, z2: 1.5,
                    x3: -1.5, y3: 1.5, z3: 1.5,
                    x4: -0.5, y4: 1.5, z4: 1.5
                }
            ],
            tiles: ["orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange"]
        },
        {
            center: "green",
            angle: { x: 1, y: 0, z: 0 },
            neighbors: [
                { side: 0, tiles: [0, 3, 6] },
                { side: 3, tiles: [2, 5, 8] },
                { side: 5, tiles: [0, 3, 6] },
                { side: 1, tiles: [0, 3, 6] }
            ],
            positions: [
                {
                    x1: -1.5, y1: -1.5, z1: 1.5,
                    x2: -1.5, y2: -0.5, z2: 1.5,
                    x3: -1.5, y3: -0.5, z3: 0.5,
                    x4: -1.5, y4: -1.5, z4: 0.5
                },
                {
                    x1: -1.5, y1: -1.5, z1: 0.5,
                    x2: -1.5, y2: -0.5, z2: 0.5,
                    x3: -1.5, y3: -0.5, z3: -0.5,
                    x4: -1.5, y4: -1.5, z4: -0.5
                },
                {
                    x1: -1.5, y1: -1.5, z1: -0.5,
                    x2: -1.5, y2: -0.5, z2: -0.5,
                    x3: -1.5, y3: -0.5, z3: -1.5,
                    x4: -1.5, y4: -1.5, z4: -1.5
                },
                {
                    x1: -1.5, y1: -0.5, z1: 1.5,
                    x2: -1.5, y2: 0.5, z2: 1.5,
                    x3: -1.5, y3: 0.5, z3: 0.5,
                    x4: -1.5, y4: -0.5, z4: 0.5
                },
                {
                    x1: -1.5, y1: -0.5, z1: 0.5,
                    x2: -1.5, y2: 0.5, z2: 0.5,
                    x3: -1.5, y3: 0.5, z3: -0.5,
                    x4: -1.5, y4: -0.5, z4: -0.5
                },
                {
                    x1: -1.5, y1: -0.5, z1: -0.5,
                    x2: -1.5, y2: 0.5, z2: -0.5,
                    x3: -1.5, y3: 0.5, z3: -1.5,
                    x4: -1.5, y4: -0.5, z4: -1.5
                },
                {
                    x1: -1.5, y1: 0.5, z1: 1.5,
                    x2: -1.5, y2: 1.5, z2: 1.5,
                    x3: -1.5, y3: 1.5, z3: 0.5,
                    x4: -1.5, y4: 0.5, z4: 0.5
                },
                {
                    x1: -1.5, y1: 0.5, z1: 0.5,
                    x2: -1.5, y2: 1.5, z2: 0.5,
                    x3: -1.5, y3: 1.5, z3: -0.5,
                    x4: -1.5, y4: 0.5, z4: -0.5
                },
                {
                    x1: -1.5, y1: 0.5, z1: -0.5,
                    x2: -1.5, y2: 1.5, z2: -0.5,
                    x3: -1.5, y3: 1.5, z3: -1.5,
                    x4: -1.5, y4: 0.5, z4: -1.5
                }
            ],
            tiles: ["green", "green", "green", "green", "green", "green", "green", "green", "green"]
        },
        {
            center: "yellow",
            angle: { x: 0, y: 1, z: 0 },
            neighbors: [
                { side: 1, tiles: [6, 7, 8] },
                { side: 2, tiles: [6, 7, 8] },
                { side: 3, tiles: [6, 7, 8] },
                { side: 4, tiles: [6, 7, 8] }
            ],
            positions: [
                {
                    x1: -1.5, y1: 1.5, z1: -0.5,
                    x2: -0.5, y2: 1.5, z2: -0.5,
                    x3: -0.5, y3: 1.5, z3: -1.5,
                    x4: -1.5, y4: 1.5, z4: -1.5
                },
                {
                    x1: -0.5, y1: 1.5, z1: -0.5,
                    x2: 0.5, y2: 1.5, z2: -0.5,
                    x3: 0.5, y3: 1.5, z3: -1.5,
                    x4: -0.5, y4: 1.5, z4: -1.5
                },
                {
                    x1: 0.5, y1: 1.5, z1: -0.5,
                    x2: 1.5, y2: 1.5, z2: -0.5,
                    x3: 1.5, y3: 1.5, z3: -1.5,
                    x4: 0.5, y4: 1.5, z4: -1.5
                },
                {
                    x1: -1.5, y1: 1.5, z1: 0.5,
                    x2: -0.5, y2: 1.5, z2: 0.5,
                    x3: -0.5, y3: 1.5, z3: -0.5,
                    x4: -1.5, y4: 1.5, z4: -0.5
                },
                {
                    x1: -0.5, y1: 1.5, z1: 0.5,
                    x2: 0.5, y2: 1.5, z2: 0.5,
                    x3: 0.5, y3: 1.5, z3: -0.5,
                    x4: -0.5, y4: 1.5, z4: -0.5
                },
                {
                    x1: 0.5, y1: 1.5, z1: 0.5,
                    x2: 1.5, y2: 1.5, z2: 0.5,
                    x3: 1.5, y3: 1.5, z3: -0.5,
                    x4: 0.5, y4: 1.5, z4: -0.5
                },
                {
                    x1: -1.5, y1: 1.5, z1: 1.5,
                    x2: -0.5, y2: 1.5, z2: 1.5,
                    x3: -0.5, y3: 1.5, z3: 0.5,
                    x4: -1.5, y4: 1.5, z4: 0.5
                },
                {
                    x1: -0.5, y1: 1.5, z1: 1.5,
                    x2: 0.5, y2: 1.5, z2: 1.5,
                    x3: 0.5, y3: 1.5, z3: 0.5,
                    x4: -0.5, y4: 1.5, z4: 0.5
                },
                {
                    x1: 0.5, y1: 1.5, z1: 1.5,
                    x2: 1.5, y2: 1.5, z2: 1.5,
                    x3: 1.5, y3: 1.5, z3: 0.5,
                    x4: 0.5, y4: 1.5, z4: 0.5
                }
            ],
            tiles: ["yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow"]
        }
    ],
    render(angleX, angleY, angleZ) {
        drawnCenters = []
        let recteanglesToDraw = []
        this.state.forEach((thisStateSide) => {
            thisStateSide.tiles.forEach((thisColor, tileIndex) => {
                let thisZ1 = thisStateSide.positions[tileIndex].z1
                let thisZ2 = thisStateSide.positions[tileIndex].z2
                let thisZ3 = thisStateSide.positions[tileIndex].z3
                let thisZ4 = thisStateSide.positions[tileIndex].z4
                if (thisStateSide.center == "blue" || thisStateSide.center == "green") {
                    thisZ1 = thisStateSide.positions[tileIndex].z1
                    thisZ2 = thisStateSide.positions[tileIndex].z2
                    thisZ3 = thisStateSide.positions[tileIndex].z2
                    thisZ4 = thisStateSide.positions[tileIndex].z1
                }
                recteanglesToDraw.push(
                    {
                        color: thisColor,
                        tileIndex: tileIndex,

                        x1: rotate(thisStateSide.positions[tileIndex].x1, thisStateSide.positions[tileIndex].y1, thisStateSide.positions[tileIndex].z1, angleX, angleY, angleZ).x * scale + offsetX,
                        x2: rotate(thisStateSide.positions[tileIndex].x2, thisStateSide.positions[tileIndex].y2, thisStateSide.positions[tileIndex].z2, angleX, angleY, angleZ).x * scale + offsetX,
                        x3: rotate(thisStateSide.positions[tileIndex].x3, thisStateSide.positions[tileIndex].y3, thisStateSide.positions[tileIndex].z3, angleX, angleY, angleZ).x * scale + offsetX,
                        x4: rotate(thisStateSide.positions[tileIndex].x4, thisStateSide.positions[tileIndex].y4, thisStateSide.positions[tileIndex].z4, angleX, angleY, angleZ).x * scale + offsetX,

                        y1: rotate(thisStateSide.positions[tileIndex].x1, thisStateSide.positions[tileIndex].y1, thisStateSide.positions[tileIndex].z1, angleX, angleY, angleZ).y * scale + offsetY,
                        y2: rotate(thisStateSide.positions[tileIndex].x2, thisStateSide.positions[tileIndex].y2, thisStateSide.positions[tileIndex].z2, angleX, angleY, angleZ).y * scale + offsetY,
                        y3: rotate(thisStateSide.positions[tileIndex].x3, thisStateSide.positions[tileIndex].y3, thisStateSide.positions[tileIndex].z3, angleX, angleY, angleZ).y * scale + offsetY,
                        y4: rotate(thisStateSide.positions[tileIndex].x4, thisStateSide.positions[tileIndex].y4, thisStateSide.positions[tileIndex].z4, angleX, angleY, angleZ).y * scale + offsetY,

                        z1: rotate(thisStateSide.positions[tileIndex].x1, thisStateSide.positions[tileIndex].y1, thisStateSide.positions[tileIndex].z1, angleX, angleY, angleZ).z,
                        z2: rotate(thisStateSide.positions[tileIndex].x2, thisStateSide.positions[tileIndex].y2, thisStateSide.positions[tileIndex].z2, angleX, angleY, angleZ).z,
                        z3: rotate(thisStateSide.positions[tileIndex].x3, thisStateSide.positions[tileIndex].y3, thisStateSide.positions[tileIndex].z3, angleX, angleY, angleZ).z,
                        z4: rotate(thisStateSide.positions[tileIndex].x4, thisStateSide.positions[tileIndex].y4, thisStateSide.positions[tileIndex].z4, angleX, angleY, angleZ).z,

                        averageZ: (rotate(thisStateSide.positions[tileIndex].x1, thisStateSide.positions[tileIndex].y1, thisStateSide.positions[tileIndex].z1, angleX, angleY, angleZ).z
                            + rotate(thisStateSide.positions[tileIndex].x2, thisStateSide.positions[tileIndex].y2, thisStateSide.positions[tileIndex].z2, angleX, angleY, angleZ).z
                            + rotate(thisStateSide.positions[tileIndex].x3, thisStateSide.positions[tileIndex].y3, thisStateSide.positions[tileIndex].z3, angleX, angleY, angleZ).z
                            + rotate(thisStateSide.positions[tileIndex].x4, thisStateSide.positions[tileIndex].y4, thisStateSide.positions[tileIndex].z4, angleX, angleY, angleZ).z
                        ) / 4
                    })
            })
        })

        recteanglesToDraw.sort((a, b) => {
            return a.averageZ < b.averageZ
        })

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        recteanglesToDraw.forEach((thisRectangle) => {
            if (thisRectangle.tileIndex == 4) drawnCenters.push(thisRectangle)
            ctx.fillStyle = thisRectangle.color
            //ctx.fillRect(thisRectangle.x,thisRectangle.y,thisRectangle.width,thisRectangle.height)
            ctx.strokeStyle = "black"
            ctx.lineWidth = 5
            ctx.beginPath()
            ctx.moveTo(thisRectangle.x1, thisRectangle.y1)
            ctx.lineTo(thisRectangle.x2, thisRectangle.y2)
            ctx.lineTo(thisRectangle.x3, thisRectangle.y3)
            ctx.lineTo(thisRectangle.x4, thisRectangle.y4)
            ctx.closePath()
            ctx.fill()
            ctx.stroke()
            //console.log(thisRectangle.x1,thisRectangle.y1,thisRectangle.z1)
            //console.log(thisRectangle.x1,thisRectangle.y1, thisRectangle.x2,thisRectangle.y2, thisRectangle.x3,thisRectangle.y3, thisRectangle.x4,thisRectangle.y4)
            //ctx.strokeRect(thisRectangle.x,thisRectangle.y,thisRectangle.width,thisRectangle.height)
        })
    }
}

function rotate(x, y, z, angleX, angleY, angleZ) {
    let newX1 = x
    let newY1 = y * Math.cos(angleX) - z * Math.sin(angleX)
    let newZ1 = y * Math.sin(angleX) + z * Math.cos(angleX)

    let newX2 = newX1 * Math.cos(angleY) + newZ1 * Math.sin(angleY)
    let newY2 = newY1
    let newZ2 = -newX1 * Math.sin(angleY) + newZ1 * Math.cos(angleY)

    let newX3 = newX2 * Math.cos(angleZ) - newY2 * Math.sin(angleZ)
    let newY3 = newX2 * Math.sin(angleZ) + newY2 * Math.cos(angleZ)
    let newZ3 = newZ2

    return { x: newX3, y: newY3, z: newZ3 }
}

function checkSolved() {
    if (
        cube.state[0].tiles.filter((thisTile) => { return thisTile == cube.state[0].center }).length == 9
        && cube.state[1].tiles.filter((thisTile) => { return thisTile == cube.state[1].center }).length == 9
        && cube.state[2].tiles.filter((thisTile) => { return thisTile == cube.state[2].center }).length == 9
        && cube.state[3].tiles.filter((thisTile) => { return thisTile == cube.state[3].center }).length == 9
        && cube.state[4].tiles.filter((thisTile) => { return thisTile == cube.state[4].center }).length == 9
        && cube.state[5].tiles.filter((thisTile) => { return thisTile == cube.state[5].center }).length == 9
    ) {
        cube.solved = true
    } else {
        cube.solved = false
    }
    return cube.solved
}

//cube.render(angleX, angleY, angleZ)

function rotateSide(side, direction) {
    let steps = 1
    if (direction == -1) steps = 3
    for (let i = 0; i < steps; i++) {
        if(cube.state[side].center == "yellow"){
            cube.state[side].tiles = [
                cube.state[side].tiles[2],
                cube.state[side].tiles[5],
                cube.state[side].tiles[8],
                cube.state[side].tiles[1],
                cube.state[side].tiles[4],
                cube.state[side].tiles[7],
                cube.state[side].tiles[0],
                cube.state[side].tiles[3],
                cube.state[side].tiles[6]
            ]
        } else {
            cube.state[side].tiles = [
                cube.state[side].tiles[6],
                cube.state[side].tiles[3],
                cube.state[side].tiles[0],
                cube.state[side].tiles[7],
                cube.state[side].tiles[4],
                cube.state[side].tiles[1],
                cube.state[side].tiles[8],
                cube.state[side].tiles[5],
                cube.state[side].tiles[2]
            ]
        }
        
        let previousState = []
        cube.state[side].neighbors.forEach((thisNeighbor, neighborIndex) => {

            thisNeighbor.tiles.forEach((thisTile, tileIndex) => {
                if (previousState.length < 3) {
                    //console.log("save")
                    previousState.push(cube.state[thisNeighbor.side].tiles[thisTile])
                    //console.log(previousState)
                } else if (neighborIndex < cube.state[side].neighbors.length) {
                    //console.log("override")
                    //console.log(thisTile, tileIndex, cube.state[thisNeighbor.side].tiles[thisTile])
                    //console.log(cube.state[cube.state[side].neighbors[(neighborIndex - 1) % 4].side].tiles[cube.state[side].neighbors[(neighborIndex - 1) % 4].tiles[tileIndex]], cube.state[thisNeighbor.side].tiles[thisTile])
                    cube.state[cube.state[side].neighbors[(neighborIndex - 1) % 4].side].tiles[cube.state[side].neighbors[(neighborIndex - 1) % 4].tiles[tileIndex]] = cube.state[thisNeighbor.side].tiles[thisTile]
                    //console.log(cube.state[cube.state[side].neighbors[neighborIndex-1].side].tiles[thisTile], cube.state[thisNeighbor.side].tiles[thisTile])
                    //cube.state[(thisNeighbor.side+3)%4].tiles[thisTile] = cube.state[thisNeighbor.side].tiles[thisTile]

                }
            })
        })
        cube.state[cube.state[side].neighbors[(4 - 1) % 4].side].tiles[cube.state[side].neighbors[(4 - 1) % 4].tiles[0]] = previousState[0]
        cube.state[cube.state[side].neighbors[(4 - 1) % 4].side].tiles[cube.state[side].neighbors[(4 - 1) % 4].tiles[1]] = previousState[1]
        cube.state[cube.state[side].neighbors[(4 - 1) % 4].side].tiles[cube.state[side].neighbors[(4 - 1) % 4].tiles[2]] = previousState[2]
    }
    cube.render(angleX, angleY, angleZ)
}

//rotateSide(3, -1)


function calcAnimatedRotation(side, subAngleX, subAngleY, subAngleZ) {
    //index = 4
    cube.state[side].positions.forEach((thisPos, index) => {
        let newPosX1 = rotate(cube.state[side].positions[index].x1, cube.state[side].positions[index].y1, cube.state[side].positions[index].z1, subAngleX, subAngleY, subAngleZ).x
        let newPosZ1 = rotate(cube.state[side].positions[index].x1, cube.state[side].positions[index].y1, cube.state[side].positions[index].z1, subAngleX, subAngleY, subAngleZ).z
        let newPosY1 = rotate(cube.state[side].positions[index].x1, cube.state[side].positions[index].y1, cube.state[side].positions[index].z1, subAngleX, subAngleY, subAngleZ).y

        let newPosX2 = rotate(cube.state[side].positions[index].x2, cube.state[side].positions[index].y2, cube.state[side].positions[index].z2, subAngleX, subAngleY, subAngleZ).x
        let newPosY2 = rotate(cube.state[side].positions[index].x2, cube.state[side].positions[index].y2, cube.state[side].positions[index].z2, subAngleX, subAngleY, subAngleZ).y
        let newPosZ2 = rotate(cube.state[side].positions[index].x2, cube.state[side].positions[index].y2, cube.state[side].positions[index].z2, subAngleX, subAngleY, subAngleZ).z

        let newPosX3 = rotate(cube.state[side].positions[index].x3, cube.state[side].positions[index].y3, cube.state[side].positions[index].z3, subAngleX, subAngleY, subAngleZ).x
        let newPosZ3 = rotate(cube.state[side].positions[index].x3, cube.state[side].positions[index].y3, cube.state[side].positions[index].z3, subAngleX, subAngleY, subAngleZ).z
        let newPosY3 = rotate(cube.state[side].positions[index].x3, cube.state[side].positions[index].y3, cube.state[side].positions[index].z3, subAngleX, subAngleY, subAngleZ).y

        let newPosX4 = rotate(cube.state[side].positions[index].x4, cube.state[side].positions[index].y4, cube.state[side].positions[index].z4, subAngleX, subAngleY, subAngleZ).x
        let newPosY4 = rotate(cube.state[side].positions[index].x4, cube.state[side].positions[index].y4, cube.state[side].positions[index].z4, subAngleX, subAngleY, subAngleZ).y
        let newPosZ4 = rotate(cube.state[side].positions[index].x4, cube.state[side].positions[index].y4, cube.state[side].positions[index].z4, subAngleX, subAngleY, subAngleZ).z

        cube.state[side].positions[index].x1 = newPosX1
        cube.state[side].positions[index].y1 = newPosY1
        cube.state[side].positions[index].z1 = newPosZ1

        cube.state[side].positions[index].x2 = newPosX2
        cube.state[side].positions[index].y2 = newPosY2
        cube.state[side].positions[index].z2 = newPosZ2

        cube.state[side].positions[index].x3 = newPosX3
        cube.state[side].positions[index].y3 = newPosY3
        cube.state[side].positions[index].z3 = newPosZ3

        cube.state[side].positions[index].x4 = newPosX4
        cube.state[side].positions[index].y4 = newPosY4
        cube.state[side].positions[index].z4 = newPosZ4
    })
    cube.state[side].neighbors.forEach((thisNeighbor) => {
        thisNeighbor.tiles.forEach((thisTile) => {
            let newPosX1 = rotate(cube.state[thisNeighbor.side].positions[thisTile].x1, cube.state[thisNeighbor.side].positions[thisTile].y1, cube.state[thisNeighbor.side].positions[thisTile].z1, subAngleX, subAngleY, subAngleZ).x
            let newPosZ1 = rotate(cube.state[thisNeighbor.side].positions[thisTile].x1, cube.state[thisNeighbor.side].positions[thisTile].y1, cube.state[thisNeighbor.side].positions[thisTile].z1, subAngleX, subAngleY, subAngleZ).z
            let newPosY1 = rotate(cube.state[thisNeighbor.side].positions[thisTile].x1, cube.state[thisNeighbor.side].positions[thisTile].y1, cube.state[thisNeighbor.side].positions[thisTile].z1, subAngleX, subAngleY, subAngleZ).y

            let newPosX2 = rotate(cube.state[thisNeighbor.side].positions[thisTile].x2, cube.state[thisNeighbor.side].positions[thisTile].y2, cube.state[thisNeighbor.side].positions[thisTile].z2, subAngleX, subAngleY, subAngleZ).x
            let newPosY2 = rotate(cube.state[thisNeighbor.side].positions[thisTile].x2, cube.state[thisNeighbor.side].positions[thisTile].y2, cube.state[thisNeighbor.side].positions[thisTile].z2, subAngleX, subAngleY, subAngleZ).y
            let newPosZ2 = rotate(cube.state[thisNeighbor.side].positions[thisTile].x2, cube.state[thisNeighbor.side].positions[thisTile].y2, cube.state[thisNeighbor.side].positions[thisTile].z2, subAngleX, subAngleY, subAngleZ).z

            let newPosX3 = rotate(cube.state[thisNeighbor.side].positions[thisTile].x3, cube.state[thisNeighbor.side].positions[thisTile].y3, cube.state[thisNeighbor.side].positions[thisTile].z3, subAngleX, subAngleY, subAngleZ).x
            let newPosZ3 = rotate(cube.state[thisNeighbor.side].positions[thisTile].x3, cube.state[thisNeighbor.side].positions[thisTile].y3, cube.state[thisNeighbor.side].positions[thisTile].z3, subAngleX, subAngleY, subAngleZ).z
            let newPosY3 = rotate(cube.state[thisNeighbor.side].positions[thisTile].x3, cube.state[thisNeighbor.side].positions[thisTile].y3, cube.state[thisNeighbor.side].positions[thisTile].z3, subAngleX, subAngleY, subAngleZ).y

            let newPosX4 = rotate(cube.state[thisNeighbor.side].positions[thisTile].x4, cube.state[thisNeighbor.side].positions[thisTile].y4, cube.state[thisNeighbor.side].positions[thisTile].z4, subAngleX, subAngleY, subAngleZ).x
            let newPosY4 = rotate(cube.state[thisNeighbor.side].positions[thisTile].x4, cube.state[thisNeighbor.side].positions[thisTile].y4, cube.state[thisNeighbor.side].positions[thisTile].z4, subAngleX, subAngleY, subAngleZ).y
            let newPosZ4 = rotate(cube.state[thisNeighbor.side].positions[thisTile].x4, cube.state[thisNeighbor.side].positions[thisTile].y4, cube.state[thisNeighbor.side].positions[thisTile].z4, subAngleX, subAngleY, subAngleZ).z

            cube.state[thisNeighbor.side].positions[thisTile].x1 = newPosX1
            cube.state[thisNeighbor.side].positions[thisTile].y1 = newPosY1
            cube.state[thisNeighbor.side].positions[thisTile].z1 = newPosZ1

            cube.state[thisNeighbor.side].positions[thisTile].x2 = newPosX2
            cube.state[thisNeighbor.side].positions[thisTile].y2 = newPosY2
            cube.state[thisNeighbor.side].positions[thisTile].z2 = newPosZ2

            cube.state[thisNeighbor.side].positions[thisTile].x3 = newPosX3
            cube.state[thisNeighbor.side].positions[thisTile].y3 = newPosY3
            cube.state[thisNeighbor.side].positions[thisTile].z3 = newPosZ3

            cube.state[thisNeighbor.side].positions[thisTile].x4 = newPosX4
            cube.state[thisNeighbor.side].positions[thisTile].y4 = newPosY4
            cube.state[thisNeighbor.side].positions[thisTile].z4 = newPosZ4
        })
    })



    cube.render(angleX, angleY, angleZ)
    //setTimeout(animateRotation, 20)
}



let currentInteration = 0
function animateRotation(side, direction) {
    //console.log(currentInteration)
    currentInteration++

    
        calcAnimatedRotation(side, Math.PI / 20 * direction * cube.state[side].angle.x, Math.PI / 20 * direction * cube.state[side].angle.y, Math.PI / 20 * direction * cube.state[side].angle.z)

    if (currentInteration >= 10) {
        clearInterval(animationInterval)
        animationInterval = undefined
        currentInteration = 0
        calcAnimatedRotation(side, Math.PI / 2 * (-direction) * cube.state[side].angle.x, Math.PI / 2 * (-direction) * cube.state[side].angle.y, Math.PI / 2 * (-direction) * cube.state[side].angle.z)
        rotateSide(side, direction)
    }
}


function checkInside(x, y) {

    let hit = undefined

    let drawnCentersTemp = [...drawnCenters]
    drawnCentersTemp.shift()
    drawnCentersTemp.shift()
    drawnCentersTemp.shift()
    drawnCentersTemp.forEach((thisQuad) => {

        let points = [{ x: thisQuad.x1, y: thisQuad.y1 }, { x: thisQuad.x2, y: thisQuad.y2 }, { x: thisQuad.x3, y: thisQuad.y3 }, { x: thisQuad.x4, y: thisQuad.y4 }]

        let hits = 0

        points.forEach((thisPoint, pointIndex) => {

            //coordinates of the line
            let x1 = thisPoint.x
            let y1 = thisPoint.y
            let x2 = points[(pointIndex + 1) % 4].x
            let y2 = points[(pointIndex + 1) % 4].y


            // coordinates of a ray starting at the points
            let x3 = x
            let y3 = y
            let x4 = x + 1 // line goes straight to the right
            let y4 = y

            //calculating line interceptions (-> https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection)
            let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4))
            let u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4))

            //console.log(t,u)
            if (t >= 0 && t <= 1 && u >= 0) { // nur u>=0 weil sonst nur in bestimmtem interval geschaut werden würde
                hits++
                //console.log("hit", hits)
            }
        })

        if (hits % 2 != 0) {
            hit = thisQuad.color
        }

    })
    return hit
}

cube.render(angleX, angleY, angleZ)


let scrambles = 0
function shuffle(){
    
    let randomSide = Math.floor(Math.random()*6)
    let randomDirection = (Math.floor(Math.random()*2)-0.5)*2
    if(animationInterval) return
    console.log(randomSide,randomDirection)
    scrambles++
    animationInterval = setInterval(() => { animateRotation(randomSide, randomDirection)}, 10)
    if(scrambles > 15) clearInterval(shuffleInterval)
}

let shuffleInterval = setInterval(shuffle, 10)