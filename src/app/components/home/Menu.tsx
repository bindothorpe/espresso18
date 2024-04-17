import MenuList from "./MenuList";

export default function Menu() {

  return (
    <div className="bg-white p-8 md:p-20 py-12 md:py-28 text-black">
      <div className="mb-10">
        <h1 className="text-5xl mb-4 font-bold">Menu</h1>
        <p>Enjoy our delicious coffee and pastries.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/3">
          <MenuList name={"Coffee"} />
        </div>
        <div className="md:w-1/3">
          <MenuList
            name={"Pastries"}
          />
        </div>
        <div className="md:w-1/3">
          <MenuList name={"Other"}  />
        </div>
      </div>
    </div>
  );
}
