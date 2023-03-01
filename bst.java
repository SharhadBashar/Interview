class Node {
	int value;
	Node left;
	Node right;

	public Node(int value){
		this.value = value;
		left = null;
		right = null;
	}

	public class BinarySearchTree{
		Node root;
		//Insertion
		private Node insert(Node current, int value){
			if(current == null){
				return new Node(value);
			}

			if (value < current.value){
				current.left = insert(current.left, value);
			}
			else if(value > current.value){
				current.right = insert(current.right, value)
			}
			else{//Value exists
				return current;
			}
			return current;
		}

		public void add (int value){
			insert(root, value);
		}


		//Search or contains
		private boolean containsNode(Node current, int value){
			if(current == null){
				return false;
			}
			if(value == current.value){
				return true;
			}
			else if (value < current.value){
				containsNode(current.left, value);
			}
			else {//value is at the right node
				containsNode(current.right, value);
			}
		}

		public boolean contains(int value){
			return containsNode(root, value);
		}


		//Delete
		private Node deleteNode (Node current, int value){
			if (current == null){
				return null;
			}
			if(value == current.value){
				//current node is a leaf
				if(currrent.left == null && current.right == null){
					current = null;
				}
				//current node has only one left or right child
				if (current.left != null && current.right == null){
					current = current.left;
					return current;
				}
				else if (current.left == null && current.right != null){
					current = current.right;
					return current;
				}
				//current node has two childs
				if (current.left != null && current.right != null){
					int inOrderValue = findSmallestValue(current.right);
					current.value = inOrderValue;
					current.right = deleteNode(current.right, inOrderValue);
					return current;
				}
			}
			if(value < current.value){
				current.left = deleteNode(current.left, value);
			}
			else if (value > current.value){
				current.right = deleteNode(current.right, value)
			}
		}

		public int findSmallestValue(Node root){
			if (root.left == null){
				return root.value;
			}
			else{
				findSmallestValue(root.left);
			}
		}

		public void delete(int value){
			root = deleteNode(root, int value);
		}
		//Traverse
		////Inorder (L Root R)
		public void InOrder(Node node){
			if(node != null){
				InOrder(node.left);
				System.out.println(node.value);
				InOrder(node.right);
			}
		}
		////Preorder(Roor L R)
		public void preOrder(Node node){
			if(node != null){
				System.out.println(node.value);
				preOrder(node.left);
				preorder(node.right);
			}
		}
		//Postorder (L R Root)
		public void postOrder(Node node){
			if(node != null){
				postOrder(node.left);
				postorder(node.right);
				System.out.println(node.value);
			}
		}
		public void breadthFirstSearch(Node root){
			if(root == null){
				return;
			}

			Queue <Node> nodes = new Queue<Nodes>();
			nodes.add(root);
			while(!nodes.isEmpty()){
				Node node = nodes.remove();
				System.out.println(node.value);

				if(node.left != null){
					nodes.add(node.left);
				}
				if node.right(!= null){
					nodes.add(node.right)
				}
			}

		}
	}
}










/**
 *          5
 *      3    6
 *     2   1 7 4
 *
 * Zig-Zag Traversal: 5,6,3,2,1,7,4
 *
 * /

 class Node {
    String data;
    Node left;
    Node right;
    Node (String data) {
        this.data = data;
    }
 }

 private List<String> zigzag(Node root) {
    //Variables
    List<String> values = new ArrayList<String>();
    boolean leftToRight;
    Node node;
    //declare 3 stacks
    Stack<Node> current = new Stack();
    Stack<Node> next = new Stack();
    Stack<Node> temp = new Stack();

    if (root == null) {
        return values;
    }

    //push root
    current.push(root);
    //leftToRight = true;

    //check and see if stack is not empty
    //while(!current.isEmpty()) {
        node = current.pop();

        //add to list
        values.add(node.data);

        //accessing data according to current order
        //from left to right
        if(leftToRight) {
            if(node.left != null) {
                next.push(node.left);
            }
            if(node.right != null) {
                next.push(node.right);
            }
        }

        //from right to left
        else {
            if(node.right != null) {
                next.push(node.right);
            }
            if(node.left != null) {
                next.push(node.left);
            }
        }

        if (current.isEmpty()) {
            leftToRight = !leftToRight;
            temp = current;
            current = next;
            next = temp;
        }
    }

    while(!current.isEmpty()) {
        node = current.pop();
        values.add(node);
        if(node.right != null) {
            current.push(node.right);
        }
        if(node.left != null) {
            current.push(node.left);
        }
    }
    return values;
 }