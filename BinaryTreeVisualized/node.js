class Node
{
  constructor(val,x,y)
  {
    this.left=null;
    this.right=null;
    this.value=val;
    this.x=x;
    this.y=y;
  }
  addNode(n)
  {
    if(n.value<this.value)
    {
      if(this.left==null)
      {
        this.left=n;
        this.left.x=this.x-50;
        this.left.y=this.y+30;
      }
      else
        this.left.addNode(n);
    }
    else if(n.value>this.value)
    {
      if(this.right==null)
      {
        this.right=n;
        this.right.x=this.x+50;
        this.right.y=this.y+30;
      }
      else
        this.right.addNode(n);
    }
  }
  visit(parent)
  {
    if(this.left!=null) 
      this.left.visit(this);
    console.log(this.value);
    fill(255);
    textAlign(LEFT);
    text(this.value,this.x,this.y);
    stroke(255);
    line(this.x,this.y,parent.x,parent.y);
    //noFill();
    ellipse(this.x,this.y,4,4);
    if(this.right!=null) 
      this.right.visit(this);
  }
  search(val)
  {
    if(this.value==val)
      return this;
    else if(val<this.value&&this.left!=null)
      return this.left.search(val);
    else if(val>this.value&&this.right!=null)
      return this.right.search(val);
    return null;
  }
}