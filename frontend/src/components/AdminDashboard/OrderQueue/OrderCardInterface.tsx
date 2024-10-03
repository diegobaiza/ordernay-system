export interface Order {
  id: number;
  table: number;
  details: string;
}

export interface OrderCardProps {
  order: Order;
}
