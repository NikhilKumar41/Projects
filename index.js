const BACKGROUND_ = "#010101ff"
const FOREGROUND = "#FF0000"
console.log(game)
game.width = 800
game.height = 800
const ctx = game.getContext("2d")
console.log(ctx)

function clear() {
    ctx.fillStyle = BACKGROUND_
    ctx.fillRect(0, 0, game.width, game.height) 
}

function point ({x, y}) {
    const s = 20
    ctx.fillStyle = FOREGROUND
    ctx.fillRect(x - s/2, y - s/2, s, s)
}

function screen (p) {
    // -1 ...1 => 0....2 => 0...1 => 1......0 => 0 ... width/height
    return {
        x : (p.x + 1)/2 * game.width,
        y : (1 - (p.y + 1)/2) * game.height,
    }
}

function project ({x, y , z}) {
    return {
        x : x/z,
        y : y/z,
    }
}

const FPS = 165;

function translate_z({x, y, z}, dz) {
    return { x, y, z: z + dz };
}

function rotate_xz({x, y, z}, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return{
        x: x*c - z*s,
        y: y,
        z: x*s + z*c, 
    }

}

function line(p1, p2) {
    ctx.Strokewidth = 5;
    ctx.strokeStyle = FOREGROUND;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

//Cube 3D renderer
/*const vs = [
  { x:-0.25, y: 0.25, z: 0.25 }, 
  { x: 0.25, y: 0.25, z: 0.25 }, 
  { x: 0.25, y:-0.25, z: 0.25 }, 
  { x:-0.25, y:-0.25, z: 0.25 }, 

  
  { x:-0.25, y: 0.25, z:-0.25 }, 
  { x: 0.25, y: 0.25, z:-0.25 }, 
  { x: 0.25, y:-0.25, z:-0.25 }, 
  { x:-0.25, y:-0.25, z:-0.25 }, 
];

const fs = [
    [0,1,2,3],
    [4,5,6,7],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
]
*/

// DNA double helix renderer
const vs = [
  {x: 0.20, y:-0.60, z: 0.00},
  {x: 0.17, y:-0.55, z: 0.10},
  {x: 0.10, y:-0.50, z: 0.17},
  {x: 0.00, y:-0.45, z: 0.20},
  {x:-0.10,y:-0.40, z: 0.17},
  {x:-0.17,y:-0.35, z: 0.10},
  {x:-0.20,y:-0.30, z: 0.00},
  {x:-0.17,y:-0.25, z:-0.10},
  {x:-0.10,y:-0.20, z:-0.17},
  {x: 0.00,y:-0.15, z:-0.20},
  {x: 0.10,y:-0.10, z:-0.17},
  {x: 0.17,y:-0.05, z:-0.10},

  {x: 0.20,y: 0.00, z: 0.00},
  {x: 0.17,y: 0.05, z: 0.10},
  {x: 0.10,y: 0.10, z: 0.17},
  {x: 0.00,y: 0.15, z: 0.20},
  {x:-0.10,y: 0.20, z: 0.17},
  {x:-0.17,y: 0.25, z: 0.10},
  {x:-0.20,y: 0.30, z: 0.00},
  {x:-0.17,y: 0.35, z:-0.10},
  {x:-0.10,y: 0.40, z:-0.17},
  {x: 0.00,y: 0.45, z:-0.20},
  {x: 0.10,y: 0.50, z:-0.17},
  {x: 0.17,y: 0.55, z:-0.10},

  {x:-0.20,y:-0.60, z: 0.00},
  {x:-0.17,y:-0.55, z:-0.10},
  {x:-0.10,y:-0.50, z:-0.17},
  {x: 0.00,y:-0.45, z:-0.20},
  {x: 0.10,y:-0.40, z:-0.17},
  {x: 0.17,y:-0.35, z:-0.10},
  {x: 0.20,y:-0.30, z: 0.00},
  {x: 0.17,y:-0.25, z: 0.10},
  {x: 0.10,y:-0.20, z: 0.17},
  {x: 0.00,y:-0.15, z: 0.20},
  {x:-0.10,y:-0.10, z: 0.17},
  {x:-0.17,y:-0.05, z: 0.10},

  {x:-0.20,y: 0.00, z: 0.00},
  {x:-0.17,y: 0.05, z:-0.10},
  {x:-0.10,y: 0.10, z:-0.17},
  {x: 0.00,y: 0.15, z:-0.20},
  {x: 0.10,y: 0.20, z:-0.17},
  {x: 0.17,y: 0.25, z:-0.10},
  {x: 0.20,y: 0.30, z: 0.00},
  {x: 0.17,y: 0.35, z: 0.10},
  {x: 0.10,y: 0.40, z: 0.17},
  {x: 0.00,y: 0.45, z: 0.20},
  {x:-0.10,y: 0.50, z: 0.17},
  {x:-0.17,y: 0.55, z: 0.10},
];

const fs = [
  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],

  [24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47],

  [0,24],[1,25],[2,26],[3,27],[4,28],[5,29],
  [6,30],[7,31],[8,32],[9,33],[10,34],[11,35],
  [12,36],[13,37],[14,38],[15,39],[16,40],[17,41],
  [18,42],[19,43],[20,44],[21,45],[22,46],[23,47],
  
];


let dz = 1;
let angle = 0;
function frame () {
    const dt = 1/FPS;
    //dz += 1*dt;
    angle += Math.PI * dt;
    clear()
    /* Uncomment to see points only
    for (const v of vs){
    point (screen(project(translate_z(rotate_xz(v, angle), dz))))
    }
    */
    for (const f of fs) {
        for (let i = 0; i < f.length; ++i) {
            const a= vs[f[i]];
            const b = vs[f[(i+1)%f.length]]; 
             line (screen(project(translate_z(rotate_xz(a, angle), dz))),
             screen(project(translate_z(rotate_xz(b, angle), dz))))
        }        
    }
    setTimeout(frame, 1200/FPS);
}
setTimeout(frame, 1200/FPS);