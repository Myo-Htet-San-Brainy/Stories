export type QNode<T> = {
  value: T;
  next?: QNode<T>;
};

export class Queue<T> {
  public length: number;
  private head: QNode<T> | undefined;
  private tail: QNode<T> | undefined;
  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  enqueue(value: T): void {
    const node: QNode<T> = { value: value, next: undefined };
    ++this.length;
    if (this.tail === undefined) {
      this.tail = node;
      return;
    }
    const tail = this.tail;
    tail.next = node;
    this.tail = node;
  }

  dequeue(): T | undefined {
    if (this.head === undefined) {
      return undefined;
    }
    --this.length;
    const head = this.head;
    this.head = head.next;
    head.next = undefined;
    return head.value;
  }

  getAll(): T[] {
    let curr = this.head;
    let values = [];
    while (curr !== undefined) {
      values.push(curr.value);
      --this.length;
      curr = curr.next;
    }
    return values;
  }
}
