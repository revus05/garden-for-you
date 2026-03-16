import { withHomeLayout } from "widgets/layouts/home";

const HomePage = () => {
  return (
    <div className="wrapper">
      <div className="w-1/2">
        <h1 className="font-black text-3xl text-[#272D4E]">
          Сад для вас — Магазин отборных заженцев
        </h1>
        <span>
          Выбирайте подходящие растения и создавайте зелёный уголок, который
          будет радовать вас долгие годы. 🌱
        </span>
      </div>
    </div>
  );
};

export default withHomeLayout(HomePage);
