var cols=50,rows=50,start,end,w,h,path=[],noSolution;
var grid=new Array(cols);
var openSet=[];
var closedSet=[];

function removeFromArray(arr,elt)
{
    for (var i = arr.length-1; i >=0 ; i--) {
        if(arr[i]==elt)
            arr.splice(i,1);
    }
}

function heuristic(a,b)
{
    return dist(a.i,a.j,b.i,b.j);
}
function setup() {
    createCanvas(600,600);

    w=width/cols;
    h=height/rows;

    for (var i = 0; i < grid.length; i++) {
      grid[i]=new Array(rows);
    }
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
          grid[i][j]=new Spot(i,j);
      }
    }
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
          grid[i][j].addNeighbours(grid);
      }
    }
    start=grid[0][0];
    end=grid[cols-1][rows-1];
    start.wall=false;
    end.wall=false;

    openSet.push(start);
}

function draw() {
    if(openSet.length>0)
    {
        var winner=0;
        for (var i = 0; i < openSet.length; i++) {
            if(openSet[i].f<openSet[winner].f)
                winner=i;
        }
        var current=openSet[winner];
        if(current==end) {
            noLoop();
            console.log("Done");
        }

        removeFromArray(openSet,current);
        closedSet.push(current);

        var neighbours=current.neighbours;
        for (var i = 0; i < neighbours.length; i++) {
            var neighbour=neighbours[i];
            if(!closedSet.includes(neighbour)&&!neighbour.wall) {
                var tempG=dist(neighbour.i,neighbour.j,current.i,current.j);//curret.g+1;
                if(openSet.includes(neighbour)) {
                    if(tempG<neighbour.g)
                        neighbour.g=tempG;
                }
                else {
                    neighbour.g=tempG;
                    openSet.push(neighbour);
                }

                neighbour.h=heuristic(neighbour,end);
                neighbour.f=neighbour.g+neighbour.h;
                neighbour.previous=current;
            }
        }
    }
    else
    {
        console.log("No Solution");
        noLoop();
        return;
    }
    background(150);
    fill(color(255,0,100));
    noStroke();
    rect(start.i*w,start.j*h,w,h);
    fill(color(0,255,100));
    rect(end.i*w,end.j*h,w,h);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
    path=[];
    var temp=current;
    path.push(temp);
    while(temp.previous) {
        path.push(temp.previous);
        temp=temp.previous;
    }

    // for (var i = 0; i < openSet.length; i++) {
    //     //openSet[i].show(color(0,255,100));
    // }
    // for (var i = 0; i < closedSet.length; i++) {
    //     //closedSet[i].show(color(255,0,100));
    // }

    noFill();
    strokeWeight(3);
    stroke(150,255,150);
    beginShape();
    for (var i = 0; i < path.length; i++) {
        vertex(path[i].i*w+w/2,path[i].j*h+h/2);
    }
    endShape();

}

class Spot {
    constructor(x,y) {
        this.f=0;
        this.g=0;
        this.h=0;
        this.i=x;
        this.j=y;
        this.neighbours=[];
        this.previous=undefined;
        this.wall=false;
        if(random(1)<0.2)
            this.wall=true;
    }
    show(col)
    {
        if(this.wall)
        {
            fill(0);
            noStroke();
            ellipse(this.i*w+w/2,this.j*h+h/2,w,h);
        }
        // else {
        //     fill(col);
        //     noStroke();
        //     rect(start.i*w,start.j*h,w,h);
        // }
    }
    addNeighbours(grid)
    {
        if(this.i<cols-1)
            this.neighbours.push(grid[this.i+1][this.j]);
        if(this.i>0)
            this.neighbours.push(grid[this.i-1][this.j]);
        if(this.j<rows-1)
            this.neighbours.push(grid[this.i][this.j+1]);
        if(this.j>0)
            this.neighbours.push(grid[this.i][this.j-1]);
        if(this.i>0&&this.j>0){
            if(!grid[this.i-1][this.j].wall&&!grid[this.i][this.j-1].wall)
            this.neighbours.push(grid[this.i-1][this.j-1]);
        }
        if(this.i<cols-1&&this.j<rows-1)
            if(!grid[this.i+1][this.j].wall&&!grid[this.i][this.j+1].wall)
                this.neighbours.push(grid[this.i+1][this.j+1]);
        if(this.i<cols-1&&this.j>0)
            if(!grid[this.i][this.j-1].wall&&!grid[this.i+1][this.j].wall)
                this.neighbours.push(grid[this.i+1][this.j-1]);
        if(this.i>0&&this.j<rows-1)
            if(!grid[this.i][this.j+1].wall&&!grid[this.i-1][this.j].wall)
                this.neighbours.push(grid[this.i-1][this.j+1]);
    }
}
