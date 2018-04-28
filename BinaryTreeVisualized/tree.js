class Tree
{
  constructor()
  {
    this.root=null;
  }
  addValue(n)
  {
    var node=new Node(n);
    if(this.root==null)
    {
      this.root=node;
      this.root.x=width/2;
      this.root.y=height/10;
    }
    else
      this.root.addNode(node);
  }
  traverse()
  {
    this.root.visit(this.root);
  }
  search(val)
  {
    console.log(this.root.search(val));
  }
}
