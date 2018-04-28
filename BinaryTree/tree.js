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
      this.root=node;
    else
      this.root.addNode(node);
  }
  traverse()
  {
    this.root.visit();
  }
  search(val)
  {
    console.log(this.root.search(val));
  }
}
