import Presentation from "./presentation.model";

export const initializatePresentation = async () => {
  const presentations = [
    {
      productID: 17,
      presentation: "12oz",
    },
    {
      productID: 18,
      presentation: "16oz",
    },
    {
      productID: 19,
      presentation: "Iced",
    },
    {
      productID: 20,
      presentation: "Frappe",
    },
  ];
  for (const presentation of presentations) {
    await Presentation.findOrCreate({
      where: { presentation: presentation.presentation },
      defaults: presentation,
    });
  }
};
