import CartButton from "@/app/(front)/components/CartButton";
import Image from "next/image";

export type ProductCardItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryName: string;
  imageName: string | null;
};

type Props = {
  products: ProductCardItem[];
};

function getProductImage(product: ProductCardItem) {
  return product.imageName
    ? `/product-image/${product.imageName}`
    : "/product-image/nopic.png";
}

const priceFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
});

const FeaturesProduct = ({ products }: Props) => {
  return (
    <section className="mx-auto flex max-w-7xl flex-col px-6 py-14 sm:py-20">
      <h2 className="text-pretty text-center font-bold text-4xl tracking-[-0.04em] text-[#001f3e] sm:text-[2.75rem]">
        สินค้าทั้งหมด
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-center text-lg text-[#66798b]">
        เลือกสินค้าคุณภาพดีในราคาที่คุ้มค่า พร้อมบริการจัดส่งรวดเร็ว
      </p>

      {products.length === 0 ? (
        <div className="mt-12 rounded border border-dashed border-[#ccd2d8] px-6 py-12 text-center text-[#66798b]">
          ยังไม่มีสินค้าในฐานข้อมูล
        </div>
      ) : (
      <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            className="flex rounded bg-white px-6 py-7 border border-[#e6e9ec] shadow-[0_0.125rem_0.25rem_rgba(0,0,0,0.075)] transition-shadow hover:shadow-[0_0.25rem_0.75rem_rgba(0,0,0,0.1)]"
            key={product.id}
          >
            <div className="flex w-full flex-col">
              <div className="relative mb-5 aspect-4/5 w-full overflow-hidden rounded bg-[#f2f4f5] sm:mb-6">
                <Image
                  alt={product.name}
                  className="object-cover"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={getProductImage(product)}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="rounded bg-[#e6f0ff] px-3 py-1 text-sm font-semibold text-primary">
                  #{product.id}
                </span>
                <span className="text-sm text-[#66798b]">
                  {product.categoryName}
                </span>
              </div>
              <h3 className="mt-4 font-semibold text-lg text-[#001f3e]">
                {product.name}
              </h3>
              <p className="mt-2 line-clamp-2 min-h-12 text-base text-[#334c65]">
                {product.description}
              </p>
              <p className="mt-4 text-xl font-bold text-[#001f3e]">
                {priceFormatter.format(product.price)}
              </p>
              <div className="mt-auto pt-4">
                <CartButton product={product} />
              </div>
            </div>
          </article>
        ))}
      </div>
      )}
    </section>
  );
};

export default FeaturesProduct;
