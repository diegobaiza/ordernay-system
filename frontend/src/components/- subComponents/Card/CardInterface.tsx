export interface OrderItem {
  name: string;
  quantity: number;
}

export interface CardProps {
  tableNumber: number;
  items: OrderItem[];
}
