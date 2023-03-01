public class BinarySearchTree {
  public Node root;

  public void insert(int value){
    Node node = new Node<>(value);

    if ( root == null ) {
      root = node;
      return;
    }

    insertRec(root, node);

  }

  private void insertRec(Node latestRoot, Node node){

    if ( latestRoot.value > node.value){

      if ( latestRoot.left == null ){
        latestRoot.left = node;
        return;
      }
      else{
        insertRec(latestRoot.left, node);
      }
    }
    else{
      if (latestRoot.right == null){
        latestRoot.right = node;
        return;
      }
      else{
        insertRec(latestRoot.right, node);
      }
    }
  }
}