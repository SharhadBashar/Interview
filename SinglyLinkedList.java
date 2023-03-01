class Node {
  int data;
  Node next;

  public Node(int data){
    this.data = data;
    this.next = null;
  }
}

public class SinglyLinkedList{
  Node head;

  public void display(Node head){
    if (head == null){
      return;
    }
    Node current = head;
    while(current != null){
      System.out.println(current.data);
      current = current.next;
    }
    System.out.println(current); //should pring null
  }

  public int size(Node head){
    int i = 0;
    if (head == null){
      return i;
    }
    Node current = head;
    while(current != null){
      i++;
      current = current.next;
    }
    return i;
  }

  public Node insertStart(int data, Node head){
    Node newNode = new Node(data);
    if (head == null){
      return newNode;
    }
    newNode.next = head;
    head = newNode;
    return head;
  }

  public Node insertEnd(int data, Node head){
    Node newNode = new Node(data);
    if (head == null){
      return newNode;
    }
    Node current = head;
    while(null != current.next){
      current = current.next
    }
    current.next = newNode;
    return head;
  }

  public void insertAfter(Node previous, int data){
    Node newNode = new Node(data);
    if(previous == null){
      return newNode;
    }
    newNode.next = previous.next;
    previous.next = newNode;
  }

  public Node insert(int position, int data, Node head){
    int length = size(head);
    Node newNode = new Node(data);
    if (length <  size || position < 1){
      return newNode;
    }
    if (position == 1){
      newNode.next = head;
      return newNode;
    }
    else{
      Node previous = head;
      int i = 1;
      while(i < positon - 1){
        previous = previous.next;
        i++;
      }
      Node current = previous.next;
      newNode.next = current;
      previous.next = newNode;
    }
    return head;
  }

  public Node deleteFirst(Node head){
    if (head == null){
      return head;
    }
    Node temp = head;
    head = head.next;
    temp.next = null;
    return temp;
  }

  public Node deleteLast(Node head){
    if (head == null){
      return null;
    }
    Node current = head.next;
    while(current.next.next != null){
      current = current.next;
    }
    current.next = null;
    return head;
  }

  public Node delete(Node head, int position){
    int length = size(head);
    if (head == null || length <  size || position < 1){
      return null;
    }
    if(position == 1){
      Node temp = head;
      head = head.next;
      temp.next = null;
      return temp;
    }
    else{
      Node previous = head;
      int i = 1;
      while(i < position - 1){
        previous = previous.next;
        i++;
      }
      Node current = previous.next;
      previous.next = current.next;
      current.next = null;
    }
    return head;
  }

  public int search(Node head, int data){
    int length = size(head);
    if (head == null || length <  size || position < 1){
      return null;
    }
    Node current = head;
    int i = 1;
    while(current != null){
      if (current.data == data){
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  public Node reverse(Node head){
    if (head == null){
      return head;
    }
    Node current = head;
    Node previous = null;
    Node next = null;
    while (current != null){
      next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }
    head = previous
    return head;
  }

  public Node middle(Node head){
    if (head == null){
      return head;
    }
    Node slow = head;
    Node fast = head;
    while (fast != null && fast.next != null){
      slow = slow.next;
      fast = slow.next;
    }
    return slow;
  }
}



Remove all elements matching val from a linked list in place
returns modified list

1 -> 2 -> 3 -> 2 -> 4 -> 2 -> 5

Node helper;
helper.next = head;
Node node = helper;
Node next;

while(node.next != null) {
  if (node.next.val == val) {
    next = node.next;
    node.next = next.next;
    node.next.next = null;
  }
  else {
    node = node.next;
  }
  return helper.next;
}








