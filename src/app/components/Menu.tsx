import MenuList from "./MenuList";

export default function Menu() {
  return (
    <div className="bg-white p-8 md:p-20 py-12 md:py-28 text-black">
      <div className="mb-10">
      <h1 className="text-5xl mb-4">Menu</h1>
      <p>Enjoy our delicious coffee and pastries.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/3">
          <MenuList
            name={"Coffee"}
            items={[
              { name: "Latte", price: 4 },
              { name: "Americano", price: 3 },
              { name: "Cappuccino", price: 4 },
              { name: "Macchiato", price: 4 },
            ]}
          />
        </div>
        <div className="md:w-1/3">
          <MenuList
            name={"Pastries"}
            items={[
                { name: "Croissant", price: 3 },
                { name: "Pain au Chocolat", price: 4 },
                { name: "Cinnamon Roll", price: 4 },
                { name: "Almond Croissant", price: 4 },
            ]}
          />
        </div>
        <div className="md:w-1/3">
          <MenuList
            name={"Other"}
            items={[
                { name: "Tea", price: 3 },
                { name: "Hot Chocolate", price: 4 },
                { name: "Chai Latte", price: 4 },
                { name: "Matcha Latte", price: 4 },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
