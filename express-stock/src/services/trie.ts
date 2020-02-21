class TrieNode<T> {
  public char: string;
  public item?: T;
  public children: Map<string, TrieNode<T>>;

  constructor(
    char: string,
    item?: T,
    children: Map<string, TrieNode<T>> = new Map<string, TrieNode<T>>()
  ) {
    this.children = children;
    this.char = char;
    this.item = item;
  }
}

export class Trie<T> {
  private root: TrieNode<T> = new TrieNode<T>("");

  public addNode(word: string, item?: T, node: TrieNode<T> = this.root): void {
    if (word.length === 0) return;

    if (!node.children.has(word[0]))
      node.children.set(
        word[0],
        new TrieNode(word[0], word.length === 1 ? item : undefined)
      );

    this.addNode(word.slice(1), item, node.children.get(word[0]));
  }

  private findNode(
    word: string,
    startNode: TrieNode<T> = this.root
  ): TrieNode<T> | null {
    if (!startNode.children.has(word[0])) return null;

    if (word.length === 1) return startNode.children.get(word[0]) || null;

    return this.findNode(word.slice(1), startNode.children.get(word[0]));
  }

  private getAllItemsUnderNode(
    word: string,
    node: TrieNode<T> = this.root,
    items: T[]
  ): void {
    if (node.item) items.push(node.item);

    node.children.forEach((child, char) =>
      this.getAllItemsUnderNode(word + char, child, items)
    );
  }

  public getItemsWithPrefix(
    prefix: string,
    node: TrieNode<T> = this.root
  ): T[] {
    const items: T[] = [];
    const startNode = this.findNode(prefix, node);
    if (!startNode) return items;

    this.getAllItemsUnderNode(prefix, startNode, items);

    return items;
  }
}
