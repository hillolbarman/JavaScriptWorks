class Node
{
  constructor(val)
  {
    this.left=null;
    this.right=null;
    this.value=val;
  }
  addNode(n)
  {
    if(n.value<this.value)
    {
      if(this.left==null)
        this.left=n;
      else
        this.left.addNode(n);
    }
    else if(n.value>this.value)
    {
      if(this.right==null)
        this.right=n;
      else
        this.right.addNode(n);
    }
  }
  visit()
  {
    if(this.left!=null) 
      this.left.visit();
    console.log(this.value);
    if(this.right!=null) 
      this.right.visit();
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