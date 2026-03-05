import {
  Heart,
  Leaf,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  User,
} from "lucide-react";

const categories = [
  "Плодовые деревья",
  "Ягодные кустарники",
  "Декоративные растения",
  "Хвойные",
  "Розы",
  "Многолетники",
];

const productTypes = ["Закрытая корневая", "Открытая корневая", "Контейнерные"];
const seasons = ["Весна", "Лето", "Осень"];

const products = [
  {
    title: "Яблоня 'Медовый Спас'",
    description: "Сладкие крупные плоды, зимостойкий сорт для средней полосы.",
    price: "1 450 ₽",
    image:
      "https://images.unsplash.com/photo-1611171711912-8370a56d7fce?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Гортензия метельчатая",
    description: "Пышные бело-розовые соцветия, цветение с июля по сентябрь.",
    price: "1 990 ₽",
    image:
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Смородина черная",
    description: "Ароматные ягоды, высокая урожайность, простая в уходе.",
    price: "890 ₽",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Туя западная 'Смарагд'",
    description: "Компактная вечнозеленая хвоя, подходит для живой изгороди.",
    price: "2 390 ₽",
    image:
      "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Роза плетистая",
    description: "Обильное цветение и насыщенный аромат для арок и беседок.",
    price: "1 290 ₽",
    image:
      "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Груша 'Конференция'",
    description: "Сочный десертный сорт, устойчив к болезням и морозам.",
    price: "1 650 ₽",
    image:
      "https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Малина ремонтантная",
    description: "Плодоносит до поздней осени, сладкие и крупные ягоды.",
    price: "760 ₽",
    image:
      "https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Пион молочноцветковый",
    description: "Крупные бутоны и насыщенная зелень, идеален для клумб.",
    price: "1 120 ₽",
    image:
      "https://images.unsplash.com/photo-1469259943454-aa100abba749?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Ель голубая",
    description: "Выразительная серебристо-голубая хвоя, акцент в саду.",
    price: "2 850 ₽",
    image:
      "https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad1?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[linear-gradient(120deg,#f6faf4_0%,#eef8ef_42%,#fefcf8_100%)] text-zinc-900">
      <header className="border-b border-emerald-100/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-emerald-800">
            <Leaf className="h-5 w-5" />
            GardenForYou
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-700 md:flex">
            <a href="/" className="transition hover:text-emerald-700">
              Каталог
            </a>
            <a href="/" className="transition hover:text-emerald-700">
              Доставка
            </a>
            <a href="/" className="transition hover:text-emerald-700">
              Оплата
            </a>
            <a href="/" className="transition hover:text-emerald-700">
              Акции
            </a>
          </nav>

          <div className="flex items-center gap-2 text-zinc-700">
            <button
              type="button"
              className="rounded-full border border-emerald-100 bg-white p-2 transition hover:bg-emerald-50"
            >
              <Heart className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="rounded-full border border-emerald-100 bg-white p-2 transition hover:bg-emerald-50"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="rounded-full border border-emerald-100 bg-white p-2 transition hover:bg-emerald-50"
            >
              <User className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-zinc-900">
            Саженцы для вашего сада
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600">
            Выберите категорию и настройте фильтры слева, чтобы быстро найти
            подходящие растения.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm lg:sticky lg:top-6">
            <div className="mb-5 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-emerald-700" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">
                Фильтры
              </h2>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="mb-3 text-sm font-semibold text-zinc-800">
                  Поиск
                </h3>
                <label className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2">
                  <Search className="h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Найти саженец"
                    className="w-full border-none bg-transparent text-sm text-zinc-700 outline-none"
                  />
                </label>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold text-zinc-800">
                  Категории
                </h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-emerald-700"
                        />
                        <span>{category}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold text-zinc-800">
                  Тип саженца
                </h3>
                <ul className="space-y-2">
                  {productTypes.map((type) => (
                    <li key={type}>
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-emerald-700"
                        />
                        <span>{type}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold text-zinc-800">
                  Сезон посадки
                </h3>
                <ul className="space-y-2">
                  {seasons.map((season) => (
                    <li key={season}>
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-emerald-700"
                        />
                        <span>{season}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold text-zinc-800">
                  Цена
                </h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="500"
                    max="3000"
                    defaultValue="2000"
                    className="w-full accent-emerald-700"
                  />
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span>500 ₽</span>
                    <span>3 000 ₽</span>
                  </div>
                </div>
              </section>
            </div>
          </aside>

          <section>
            <div className="mb-4 flex items-center justify-between rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm text-zinc-600">
              <span>Найдено товаров: {products.length}</span>
              <button
                type="button"
                className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-800 transition hover:bg-emerald-100"
              >
                Сбросить фильтры
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.title}
                  className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div
                    role="img"
                    aria-label={product.title}
                    className="h-44 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />

                  <div className="space-y-2 p-4">
                    <h3 className="text-base font-semibold text-zinc-900">
                      {product.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-600">
                      {product.description}
                    </p>
                    <p className="pt-1 text-lg font-bold text-emerald-800">
                      {product.price}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-10 border-t border-emerald-100 bg-white/90">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 text-sm text-zinc-600 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <p className="font-semibold text-zinc-900">GardenForYou</p>
            <p className="mt-1">
              Интернет-магазин саженцев и растений для вашего участка.
            </p>
          </div>
          <div>
            <p className="font-semibold text-zinc-900">Контакты</p>
            <p className="mt-1">+7 (999) 123-45-67</p>
            <p>hello@gardenforyou.ru</p>
          </div>
          <div>
            <p className="font-semibold text-zinc-900">Адрес</p>
            <p className="mt-1">Москва, ул. Садовая, 15</p>
            <p>Пн-Вс: 09:00 - 20:00</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
