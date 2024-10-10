import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Header } from "../../- subComponents/Header/Header";
import OrderSummary from "./OrderSummary/OrderSummary";
import ProductGrid from "./ProductGrid/ProductGrid";
import SelectedTable from "./SelectedTable/SelectedTable";
import SidebarMenu from "./SideBarMenu/SideBarMenu";
import SwitchCategoryFood from "./SwitchCategoryFood/SwitchCategoryFood";
import { useAuth } from "../../../context/AuthContext/AuthContext";

interface Product {
  id: string;
  name: string;
  // price: number;
  description: string;
}

interface SubCategory {
  id: string;
  name: string;
}

interface OrderItem {
  productID: string;
  name: string;
  // price: number;
  quantity: number;
}

const MenuView: React.FC = () => {
  const [category, setCategory] = useState<string>("Comidas");
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [currentType, setCurrentType] = useState<string>("Comidas/Desayunos");

  // Obtenemos tableId y tableNumber desde useLocation, pasados desde TableItem
  const { state } = useLocation();
  const { tableId, tableNumber } = state;

  const { usernameID } = useAuth(); // Obtenemos usernameID del AuthContext

  // Fetch subcategories based on category
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get<SubCategory[]>(
          `http://localhost:3300/api/subcategories?category=${category}`
        );
        setSubCategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubCategories();
  }, [category]);

  // Fetch products based on selected subcategory
  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedSubCategory) {
        try {
          const response = await axios.get<Product[]>(
            `http://localhost:3300/api/products?subcategory=${selectedSubCategory}`
          );
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };
    fetchProducts();
  }, [selectedSubCategory]);

  // Add to orderItems
  const handleAddToOrder = (product: Product) => {
    const existingItemIndex = orderItems.findIndex(
      (item) => item.productID === product.id
    );

    if (existingItemIndex !== -1) {
      const updatedOrderItems = [...orderItems];
      updatedOrderItems[existingItemIndex].quantity += 1;
      console.log(updatedOrderItems);
      setOrderItems(updatedOrderItems);
    } else {
      setOrderItems([
        ...orderItems,
        {
          productID: product.id,
          name: product.name,
          quantity: 1,
        },
      ]);
    }
  };

  const handleUpdateQuantity = (productID: string, quantity: number) => {
    const updatedOrderItems = orderItems.map((item) =>
      item.productID === productID ? { ...item, quantity } : item
    );
    setOrderItems(updatedOrderItems);
  };

  // Handle removing an item from the order
  const handleRemoveFromOrder = (productID: string) => {
    const updatedOrderItems = orderItems.filter(
      (item) => item.productID !== productID
    );

    setOrderItems(updatedOrderItems);
  };
  // Handle sending the order
  const handleSendOrder = async () => {
    if (!usernameID) {
      console.error("Error: usernameID no está disponible");
      return;
    }

    if (!tableId) {
      console.error("Error: tableId no está disponible");
      return;
    }

    try {
      const orderData = {
        usernameID, // Enviamos el ID del usuario que hizo la orden
        tableID: tableId, // Pasamos tableId correctamente
        status: "pending", // Define un estado por defecto
        items: orderItems.map((item) => ({
          productID: item.productID, // Solo enviamos el productID y quantity
          name: item.name,
          quantity: item.quantity,
        })),
      };

      console.log(orderData);

      // Enviar la orden al backend
      const response = await axios.post(
        "http://localhost:3300/api/orders",
        orderData
      );
      console.log("Orden enviada con éxito:", response.data);

      // Limpiar el resumen después de enviar la orden
      setOrderItems([]);
    } catch (error) {
      console.error("Error al enviar la orden:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {tableNumber && <SelectedTable tableNumber={tableNumber} />}{" "}
      {/* Mostramos la mesa si está disponible */}
      <SwitchCategoryFood category={category} setCategory={setCategory} />
      <div className="flex flex-1 w-full">
        {/* SidebarMenu a la izquierda */}
        <div className="w-1/6">
          <SidebarMenu
            subCategories={subCategories}
            setSelectedSubCategory={setSelectedSubCategory}
          />
        </div>

        <div className="flex-grow p-4 max-w-4xl mx-auto overflow-y-auto">
          <ProductGrid
            products={products}
            onAddToOrder={handleAddToOrder}
            category={category}
            setCategory={setCategory}
            currentType={currentType}
            setType={setCurrentType}
          />
        </div>
      </div>
      {/* Resumen del pedido */}
      <OrderSummary
        orderItems={orderItems}
        tableNumber={tableNumber ?? 0} // Pasamos un valor por defecto si no está disponible
        onRemoveItem={handleRemoveFromOrder} // Pass remove handler to OrderSummary
        onSendOrder={handleSendOrder} // Pass send order handler to OrderSummary
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
};

export default MenuView;
