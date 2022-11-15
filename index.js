const canvas = document.getElementById("canvas1")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d")

const angleXSlider = document.getElementById("angleX")
const angleYSlider = document.getElementById("angleY")
const angleZSlider = document.getElementById("angleZ")

let shift = false

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

window.addEventListener("keydown" , event=>{
    if(event.key == "Shift") shift = true
})
window.addEventListener("keyup", event=>{
    if(event.key == "Shift") shift = false
})

canvas.addEventListener("click", event=>{
    let color = checkInside(event.x,event.y)
    if(!color) return
    let side = cube.state.findIndex(thisState=>{return thisState.center == color})
    if(shift){
        console.log("reverse")
        rotateSide(side, -1)
    } else {
        //not reverse
        rotateSide(side, 1)
    }

    //console.log(checkInside(event.x,event.y))
})

let cube = {
    solved: false,
    state: [
        {
            //position: {x1:-1.5,y1:-1,z1:0.5,x2:-0.5,y2:-1,z2:1.5} --> x,y,z koordinaten sind relativ zum mittelpunkt des Würfels -> in der mitte wäre 0,0,0 -> von links (-1.5) nach rechts (1.5), von oben nach undten und von vorne nach hinter
            center: "white",
            neighbors: [
                { side: 1, tiles: [0, 1, 2] }, // side: 1 -red white 0, blue 2, organe 3, green 4, yellow 5
                { side: 2, tiles: [0, 1, 2] },
                { side: 3, tiles: [0, 1, 2] },
                { side: 4, tiles: [0, 1, 2] }
            ],
            positions: [
                { x1: -1.5, y1: -1.5, z1: 0.5, x2: -0.5, y2: -1.5, z2: 1.5 },
                { x1: -0.5, y1: -1.5, z1: 0.5, x2: 0.5, y2: -1.5, z2: 1.5 },
                { x1: 0.5, y1: -1.5, z1: 0.5, x2: 1.5, y2: -1.5, z2: 1.5 },
                { x1: -1.5, y1: -1.5, z1: -0.5, x2: -0.5, y2: -1.5, z2: 0.5 },
                { x1: -0.5, y1: -1.5, z1: -0.5, x2: 0.5, y2: -1.5, z2: 0.5 },
                { x1: 0.5, y1: -1.5, z1: -0.5, x2: 1.5, y2: -1.5, z2: 0.5 },
                { x1: -1.5, y1: -1.5, z1: -1.5, x2: -0.5, y2: -1.5, z2: -0.5 },
                { x1: -0.5, y1: -1.5, z1: -1.5, x2: 0.5, y2: -1.5, z2: -0.5 },
                { x1: 0.5, y1: -1.5, z1: -1.5, x2: 1.5, y2: -1.5, z2: -0.5 }
            ],
            tiles: ["white", "white", "white", "white", "white", "white", "white", "white", "white"] // reihe für reihe von oben links nach oben rechts -> mitte links nach mitte recht und unten links nach untern rechts (wenn man frontal auf die seite drauf schaut)
        },
        {
            center: "red",
            neighbors: [
                { side: 0, tiles: [6, 7, 8] },
                { side: 4, tiles: [2, 5, 8] },
                { side: 5, tiles: [0, 1, 2] },
                { side: 2, tiles: [0, 3, 6] }
            ],
            positions: [
                { x1: -1.5, y1: -1.5, z1: -1.5, x2: -0.5, y2: -0.5, z2: -1.5 },
                { x1: -0.5, y1: -1.5, z1: -1.5, x2: 0.5, y2: -0.5, z2: -1.5 },
                { x1: 0.5, y1: -1.5, z1: -1.5, x2: 1.5, y2: -0.5, z2: -1.5 },
                { x1: -1.5, y1: -0.5, z1: -1.5, x2: -0.5, y2: 0.5, z2: -1.5 },
                { x1: -0.5, y1: -0.5, z1: -1.5, x2: 0.5, y2: 0.5, z2: -1.5 },
                { x1: 0.5, y1: -0.5, z1: -1.5, x2: 1.5, y2: 0.5, z2: -1.5 },
                { x1: -1.5, y1: 0.5, z1: -1.5, x2: -0.5, y2: 1.5, z2: -1.5 },
                { x1: -0.5, y1: 0.5, z1: -1.5, x2: 0.5, y2: 1.5, z2: -1.5 },
                { x1: 0.5, y1: 0.5, z1: -1.5, x2: 1.5, y2: 1.5, z2: -1.5 }
            ],
            tiles: ["red", "red", "red", "red", "red", "red", "red", "red", "red"]
        },
        {
            center: "blue",
            neighbors: [
                { side: 0, tiles: [2, 5, 8] },
                { side: 1, tiles: [2, 5, 8] },
                { side: 5, tiles: [2, 5, 8] },
                { side: 3, tiles: [0, 3, 6] }

            ],
            positions: [
                { x1: 1.5, y1: -1.5, z1: -1.5, x2: 1.5, y2: -0.5, z2: -0.5 },
                { x1: 1.5, y1: -1.5, z1: -0.5, x2: 1.5, y2: -0.5, z2: 0.5 },
                { x1: 1.5, y1: -1.5, z1: 0.5, x2: 1.5, y2: -0.5, z2: 1.5 },
                { x1: 1.5, y1: -0.5, z1: -1.5, x2: 1.5, y2: 0.5, z2: -0.5 },
                { x1: 1.5, y1: -0.5, z1: -0.5, x2: 1.5, y2: 0.5, z2: 0.5 },
                { x1: 1.5, y1: -0.5, z1: 0.5, x2: 1.5, y2: 0.5, z2: 1.5 },
                { x1: 1.5, y1: 0.5, z1: -1.5, x2: 1.5, y2: 1.5, z2: -0.5 },
                { x1: 1.5, y1: 0.5, z1: -0.5, x2: 1.5, y2: 1.5, z2: 0.5 },
                { x1: 1.5, y1: 0.5, z1: 0.5, x2: 1.5, y2: 1.5, z2: 1.5 }
            ],
            tiles: ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue"]
        },
        {
            center: "orange",
            neighbors: [
                { side: 0, tiles: [0, 1, 2] },
                { side: 2, tiles: [2, 5, 8] },
                { side: 5, tiles: [6, 7, 8] },
                { side: 4, tiles: [0, 3, 6] }

            ],
            positions: [
                { x1: 1.5, y1: -1.5, z1: 1.5, x2: 0.5, y2: -0.5, z2: 1.5 },
                { x1: 0.5, y1: -1.5, z1: 1.5, x2: -0.5, y2: -0.5, z2: 1.5 },
                { x1: -0.5, y1: -1.5, z1: 1.5, x2: -1.5, y2: -0.5, z2: 1.5 },
                { x1: 1.5, y1: -0.5, z1: 1.5, x2: 0.5, y2: 0.5, z2: 1.5 },
                { x1: 0.5, y1: -0.5, z1: 1.5, x2: -0.5, y2: 0.5, z2: 1.5 },
                { x1: -0.5, y1: -0.5, z1: 1.5, x2: -1.5, y2: 0.5, z2: 1.5 },
                { x1: 1.5, y1: 0.5, z1: 1.5, x2: 0.5, y2: 1.5, z2: 1.5 },
                { x1: 0.5, y1: 0.5, z1: 1.5, x2: -0.5, y2: 1.5, z2: 1.5 },
                { x1: -0.5, y1: 0.5, z1: 1.5, x2: -1.5, y2: 1.5, z2: 1.5 }
            ],
            tiles: ["orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange"]
        },
        {
            center: "green",
            neighbors: [
                { side: 0, tiles: [0, 3, 6] },
                { side: 3, tiles: [2, 5, 8] },
                { side: 5, tiles: [0, 3, 6] },
                { side: 1, tiles: [0, 3, 6] }
            ],
            positions: [
                { x1: -1.5, y1: -1.5, z1: 1.5, x2: -1.5, y2: -0.5, z2: 0.5 },
                { x1: -1.5, y1: -1.5, z1: 0.5, x2: -1.5, y2: -0.5, z2: -0.5 },
                { x1: -1.5, y1: -1.5, z1: -0.5, x2: -1.5, y2: -0.5, z2: -1.5 },
                { x1: -1.5, y1: -0.5, z1: 1.5, x2: -1.5, y2: 0.5, z2: 0.5 },
                { x1: -1.5, y1: -0.5, z1: 0.5, x2: -1.5, y2: 0.5, z2: -0.5 },
                { x1: -1.5, y1: -0.5, z1: -0.5, x2: -1.5, y2: 0.5, z2: -1.5 },
                { x1: -1.5, y1: 0.5, z1: 1.5, x2: -1.5, y2: 1.5, z2: 0.5 },
                { x1: -1.5, y1: 0.5, z1: 0.5, x2: -1.5, y2: 1.5, z2: -0.5 },
                { x1: -1.5, y1: 0.5, z1: -0.5, x2: -1.5, y2: 1.5, z2: -1.5 }
            ],
            tiles: ["green", "green", "green", "green", "green", "green", "green", "green", "green"]
        },
        {
            center: "yellow",
            neighbors: [
                { side: 1, tiles: [6, 7, 8] },
                { side: 2, tiles: [6, 7, 8] },
                { side: 3, tiles: [6, 7, 8] },
                { side: 4, tiles: [6, 7, 8] }
            ],
            positions: [
                { x1: -1.5, y1: 1.5, z1: -0.5, x2: -0.5, y2: 1.5, z2: -1.5 },
                { x1: -0.5, y1: 1.5, z1: -0.5, x2: 0.5, y2: 1.5, z2: -1.5 },
                { x1: 0.5, y1: 1.5, z1: -0.5, x2: 1.5, y2: 1.5, z2: -1.5 },
                { x1: -1.5, y1: 1.5, z1: 0.5, x2: -0.5, y2: 1.5, z2: -0.5 },
                { x1: -0.5, y1: 1.5, z1: 0.5, x2: 0.5, y2: 1.5, z2: -0.5 },
                { x1: 0.5, y1: 1.5, z1: 0.5, x2: 1.5, y2: 1.5, z2: -0.5 },
                { x1: -1.5, y1: 1.5, z1: 1.5, x2: -0.5, y2: 1.5, z2: 0.5 },
                { x1: -0.5, y1: 1.5, z1: 1.5, x2: 0.5, y2: 1.5, z2: 0.5 },
                { x1: 0.5, y1: 1.5, z1: 1.5, x2: 1.5, y2: 1.5, z2: 0.5 }
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
                let thisZ2 = thisStateSide.positions[tileIndex].z1
                let thisZ3 = thisStateSide.positions[tileIndex].z2
                let thisZ4 = thisStateSide.positions[tileIndex].z2
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
                        x1: rotate(thisStateSide.positions[tileIndex].x1, thisStateSide.positions[tileIndex].y1, thisZ1, angleX, angleY, angleZ).x * scale + offsetX,
                        x2: rotate(thisStateSide.positions[tileIndex].x2, thisStateSide.positions[tileIndex].y1, thisZ2, angleX, angleY, angleZ).x * scale + offsetX,
                        x3: rotate(thisStateSide.positions[tileIndex].x2, thisStateSide.positions[tileIndex].y2, thisZ3, angleX, angleY, angleZ).x * scale + offsetX,
                        x4: rotate(thisStateSide.positions[tileIndex].x1, thisStateSide.positions[tileIndex].y2, thisZ4, angleX, angleY, angleZ).x * scale + offsetX,

                        y1: rotate(thisStateSide.positions[tileIndex].x1, thisStateSide.positions[tileIndex].y1, thisZ1, angleX, angleY, angleZ).y * scale + offsetY,
                        y2: rotate(thisStateSide.positions[tileIndex].x2, thisStateSide.positions[tileIndex].y1, thisZ2, angleX, angleY, angleZ).y * scale + offsetY,
                        y3: rotate(thisStateSide.positions[tileIndex].x2, thisStateSide.positions[tileIndex].y2, thisZ3, angleX, angleY, angleZ).y * scale + offsetY,
                        y4: rotate(thisStateSide.positions[tileIndex].x1, thisStateSide.positions[tileIndex].y2, thisZ4, angleX, angleY, angleZ).y * scale + offsetY,

                        z1: rotate(thisStateSide.positions[tileIndex].x1, thisStateSide.positions[tileIndex].y1, thisZ1, angleX, angleY, angleZ).z,
                        z2: rotate(thisStateSide.positions[tileIndex].x2, thisStateSide.positions[tileIndex].y1, thisZ2, angleX, angleY, angleZ).z,
                        z3: rotate(thisStateSide.positions[tileIndex].x2, thisStateSide.positions[tileIndex].y2, thisZ3, angleX, angleY, angleZ).z,
                        z4: rotate(thisStateSide.positions[tileIndex].x1, thisStateSide.positions[tileIndex].y2, thisZ4, angleX, angleY, angleZ).z,

                        averageZ: (rotate(thisStateSide.positions[tileIndex].x1, thisStateSide.positions[tileIndex].y1, thisZ1, angleX, angleY, angleZ).z
                            + rotate(thisStateSide.positions[tileIndex].x2, thisStateSide.positions[tileIndex].y1, thisZ2, angleX, angleY, angleZ).z
                            + rotate(thisStateSide.positions[tileIndex].x2, thisStateSide.positions[tileIndex].y2, thisZ3, angleX, angleY, angleZ).z
                            + rotate(thisStateSide.positions[tileIndex].x1, thisStateSide.positions[tileIndex].y2, thisZ4, angleX, angleY, angleZ).z
                        ) / 4
                    })
            })
        })

        recteanglesToDraw.sort((a, b) => {
            return a.averageZ < b.averageZ
        })

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        recteanglesToDraw.forEach((thisRectangle) => {
            if(thisRectangle.tileIndex == 4) drawnCenters.push(thisRectangle)
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
        let previousState = []
        cube.state[side].neighbors.forEach((thisNeighbor, neighborIndex) => {

            thisNeighbor.tiles.forEach((thisTile, tileIndex) => {
                if (previousState.length < 3) {
                    console.log("save")
                    previousState.push(cube.state[thisNeighbor.side].tiles[thisTile])
                    console.log(previousState)
                } else if (neighborIndex < cube.state[side].neighbors.length) {
                    console.log("override")
                    console.log(thisTile, tileIndex, cube.state[thisNeighbor.side].tiles[thisTile])
                    console.log(cube.state[cube.state[side].neighbors[(neighborIndex - 1) % 4].side].tiles[cube.state[side].neighbors[(neighborIndex - 1) % 4].tiles[tileIndex]], cube.state[thisNeighbor.side].tiles[thisTile])
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

rotateSide(3, -1)



function checkInside(x,y){

    let hit = undefined

    /*ctx.strokeStyle = "white"
    ctx.lineWidth  = 2
    ctx.beginPath()
    ctx.moveTo(x,y)
    ctx.lineTo(x+1000,y)
    ctx.stroke()*/

    let drawnCentersTemp = [...drawnCenters]
    drawnCentersTemp.shift()
    drawnCentersTemp.shift()
    drawnCentersTemp.shift()
    drawnCentersTemp.forEach((thisQuad)=>{

        let points = [{x:thisQuad.x1,y:thisQuad.y1},{x:thisQuad.x2,y:thisQuad.y2},{x:thisQuad.x3,y:thisQuad.y3},{x:thisQuad.x4,y:thisQuad.y4}]
        
        let hits = 0

        points.forEach((thisPoint, pointIndex)=>{

            //coordinates of the line
            let x1 = thisPoint.x
            let y1 = thisPoint.y
            let x2 = points[(pointIndex+1)%4].x
            let y2 = points[(pointIndex+1)%4].y


            // coordinates of a ray starting at the points
            let x3 = x
            let y3 = y
            let x4 = x+1 // line goes straight to the right
            let y4 = y

            //calculating line interceptions (-> https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection)
            let t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4))
            let u = ((x1-x3)*(y1-y2)-(y1-y3)*(x1-x2))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4))

            //console.log(t,u)
            if(t >= 0 && t <= 1 && u >= 0){ // nur u>=0 weil sonst nur in bestimmtem interval geschaut werden würde
                hits++
                //console.log("hit", hits)
            }
        })

        if(hits % 2 != 0){
            hit = thisQuad.color
        }

    })
    return hit
}