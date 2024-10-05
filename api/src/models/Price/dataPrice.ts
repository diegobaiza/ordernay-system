import Price from "./price.model";

export const initializatePrices = async () => {
  const prices = [
    {
      id: 1,
      price: 12.5,
      currency: "Q",
    },
    {
      presentationID: 2,
      price: 18.0,
      currency: "Q",
    },
    {
      presentationID: 3,
      price: 25,
      currency: "Q",
    },
    {
      presentationID: 4,
      price: 28.5,
      currency: "Q",
    },
  ];

  for (const price of prices) {
    await Price.findOrCreate({
      where: { price: price.price },
      defaults: price,
    });
  }
};
