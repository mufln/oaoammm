namespace hihihiha.Utils;

public class RedBlackTree<T>
{
    private class Node
    {
        public T Value { get; set; }
        public Node Left { get; set; }
        public Node Right { get; set; }
        public Node Parent { get; set; }
        public Color Color { get; set; }

        public Node(T value)
        {
            Value = value;
            Color = Color.Red;
        }
    }

    private enum Color
    {
        Red,
        Black
    }

    private Node root;
    private IComparer<T> comparer;

    public RedBlackTree() : this(Comparer<T>.Default)
    {
    }

    public RedBlackTree(IComparer<T> comparer)
    {
        if (comparer == null)
            throw new ArgumentNullException(nameof(comparer));
        this.comparer = comparer;
    }

    // Вставка элемента
    public void Insert(T value)
    {
        var node = new Node(value);
        if (root == null)
        {
            root = node;
            FixInsert(node);
        }
        else
        {
            var current = root;
            while (true)
            {
                int comparisonResult = comparer.Compare(current.Value, value);
                if (comparisonResult > 0)
                {
                    if (current.Left == null)
                    {
                        current.Left = node;
                        break;
                    }

                    current = current.Left;
                }
                else if (comparisonResult < 0)
                {
                    if (current.Right == null)
                    {
                        current.Right = node;
                        break;
                    }

                    current = current.Right;
                }
                else
                {
                    return; // элемент уже существует
                }
            }

            node.Parent = current;
            FixInsert(node);
        }
    }

    // Поиск элемента
    public bool Contains(T value)
    {
        var current = root;
        while (current != null)
        {
            int comparisonResult = comparer.Compare(current.Value, value);
            if (comparisonResult > 0)
            {
                current = current.Left;
            }
            else if (comparisonResult < 0)
            {
                current = current.Right;
            }
            else
            {
                return true;
            }
        }

        return false;
    }

    // Удаление элемента
    public bool Remove(T value)
    {
        var current = FindNode(root, value);
        if (current == null)
            return false;

        DeleteNode(current);
        return true;
    }

    // Обход дерева in-order
    public IEnumerable<T> InOrder()
    {
        var stack = new Stack<Node>();
        var current = root;
        while (stack.Count > 0 || current != null)
        {
            if (current != null)
            {
                stack.Push(current);
                current = current.Left;
            }
            else
            {
                current = stack.Pop();
                yield return current.Value;
                current = current.Right;
            }
        }
    }

    private void RotateLeft(Node node)
    {
        var rightChild = node.Right;
        if (rightChild == null)
            return;

        node.Right = rightChild.Left;
        if (node.Right != null)
            node.Right.Parent = node;

        rightChild.Parent = node.Parent;
        if (node.Parent == null)
            root = rightChild;
        else if (node == node.Parent.Left)
            node.Parent.Left = rightChild;
        else
            node.Parent.Right = rightChild;

        rightChild.Left = node;
        node.Parent = rightChild;
    }

    private void RotateRight(Node node)
    {
        var leftChild = node.Left;
        if (leftChild == null)
            return;

        node.Left = leftChild.Right;
        if (node.Left != null)
            node.Left.Parent = node;

        leftChild.Parent = node.Parent;
        if (node.Parent == null)
            root = leftChild;
        else if (node == node.Parent.Right)
            node.Parent.Right = leftChild;
        else
            node.Parent.Left = leftChild;

        leftChild.Right = node;
        node.Parent = leftChild;
    }

    private void FixInsert(Node node)
    {
        while (node != root && node.Parent.Color == Color.Red)
        {
            if (node.Parent == node.Parent.Parent.Left)
            {
                var uncle = node.Parent.Parent.Right;
                if (uncle?.Color == Color.Red)
                {
                    node.Parent.Color = Color.Black;
                    uncle.Color = Color.Black;
                    node.Parent.Parent.Color = Color.Red;
                    node = node.Parent.Parent;
                }
                else
                {
                    if (node == node.Parent.Right)
                    {
                        node = node.Parent;
                        RotateLeft(node);
                    }

                    node.Parent.Color = Color.Black;
                    node.Parent.Parent.Color = Color.Red;
                    RotateRight(node.Parent.Parent);
                }
            }
            else
            {
                var uncle = node.Parent.Parent.Left;
                if (uncle?.Color == Color.Red)
                {
                    node.Parent.Color = Color.Black;
                    uncle.Color = Color.Black;
                    node.Parent.Parent.Color = Color.Red;
                    node = node.Parent.Parent;
                }
                else
                {
                    if (node == node.Parent.Left)
                    {
                        node = node.Parent;
                        RotateRight(node);
                    }

                    node.Parent.Color = Color.Black;
                    node.Parent.Parent.Color = Color.Red;
                    RotateLeft(node.Parent.Parent);
                }
            }
        }

        root.Color = Color.Black;
    }

    private void DeleteNode(Node node)
    {
        if (node.Left != null && node.Right != null)
        {
            var successor = GetSuccessor(node);
            node.Value = successor.Value;
            node = successor;
        }

        var child = node.Left ?? node.Right;
        if (child != null)
        {
            child.Parent = node.Parent;
            if (node.Parent == null)
                root = child;
            else if (node == node.Parent.Left)
                node.Parent.Left = child;
            else
                node.Parent.Right = child;
            node.Left = node.Right = node.Parent = null;
        }
        else if (node.Parent == null)
        {
            root = null;
        }
        else
        {
            if (node.Color == Color.Black)
                FixDelete(node);

            if (node.Parent != null)
            {
                if (node == node.Parent.Left)
                    node.Parent.Left = null;
                else if (node == node.Parent.Right)
                    node.Parent.Right = null;
                node.Parent = null;
            }
        }
    }

    private Node FindNode(Node current, T value)
    {
        while (current != null)
        {
            int comparisonResult = comparer.Compare(current.Value, value);
            if (comparisonResult > 0)
                current = current.Left;
            else if (comparisonResult < 0)
                current = current.Right;
            else
                return current;
        }

        return null;
    }

    private void FixDelete(Node node)
    {
        while (node != root && node.Color == Color.Black)
        {
            if (node == node.Parent.Left)
            {
                var sibling = node.Parent.Right;
                if (sibling.Color == Color.Red)
                {
                    sibling.Color = Color.Black;
                    node.Parent.Color = Color.Red;
                    RotateLeft(node.Parent);
                    sibling = node.Parent.Right;
                }

                if ((sibling.Left?.Color ?? Color.Black) == Color.Black &&
                    (sibling.Right?.Color ?? Color.Black) == Color.Black)
                {
                    sibling.Color = Color.Red;
                    node = node.Parent;
                }
                else
                {
                    if (sibling.Right.Color == Color.Black)
                    {
                        sibling.Left.Color = Color.Black;
                        sibling.Color = Color.Red;
                        RotateRight(sibling);
                        sibling = node.Parent.Right;
                    }

                    sibling.Color = node.Parent.Color;
                    node.Parent.Color = Color.Black;
                    sibling.Right.Color = Color.Black;
                    RotateLeft(node.Parent);
                    node = root;
                }
            }
            else
            {
                var sibling = node.Parent.Left;
                if (sibling.Color == Color.Red)
                {
                    sibling.Color = Color.Black;
                    node.Parent.Color = Color.Red;
                    RotateRight(node.Parent);
                    sibling = node.Parent.Left;
                }

                if ((sibling.Left?.Color ?? Color.Black) == Color.Black &&
                    (sibling.Right?.Color ?? Color.Black) == Color.Black)
                {
                    sibling.Color = Color.Red;
                    node = node.Parent;
                }
                else
                {
                    if (sibling.Left.Color == Color.Black)
                    {
                        sibling.Right.Color = Color.Black;
                        sibling.Color = Color.Red;
                        RotateLeft(sibling);
                        sibling = node.Parent.Left;
                    }

                    sibling.Color = node.Parent.Color;
                    node.Parent.Color = Color.Black;
                    sibling.Left.Color = Color.Black;
                    RotateRight(node.Parent);
                    node = root;
                }
            }
        }

        node.Color = Color.Black;
    }

    private Node GetSuccessor(Node node)
    {
        var successor = node.Right;
        while (successor.Left != null)
            successor = successor.Left;
        return successor;
    }
}