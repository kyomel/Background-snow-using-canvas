window.onload = function() {

    // get the canvas and context and store in var
    let canvas = document.getElementById("sky");
    let ctx = canvas.getContext("2d");

    // set canvas dims to window height and width
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // generates the snowflakes and apply attributes
    let mf = 300; // max flakes
    let flakes = [];

    // loop through the empty flakes and apply attributes
    for(let i=0; i<mf; i++)
    {
        flakes.push({
            x: Math.random()*W,
            y: Math.random()*H,
            r: Math.random()*5+2,   //radius min 2px and max 7px
            d: Math.random()+1      //density of flake
        })
    }

    // draw flakes into canvas
    function drawFlakes(){
        ctx.clearRect(0,0,W,H);
        ctx.fillStyle = "white";
        ctx.beginPath();
        for(let i=0; i<mf; i++){
            let f = flakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
        }
        ctx.fill();
        moveFlakes();
    }

    // animate the flakes
    let angle = 0;
    function moveFlakes(){
        angle += 0.01;
        for(let i=0; i<mf; i++){
            // store some flakes
            let f = flakes[i];

            // update X and Y coordinates of each snowflake
            f.y += Math.pow(f.d, 2) + 1;
            f.x += Math.sin(angle) * 2;

            // if the snowflake reaches the bottom, send a new one to the top
            if(f.y > H){
                flakes[i] = {x: Math.random()*W, y:0, r:f.r, d: f.d};
            }
        }
    }
    setInterval(drawFlakes,25);
}
