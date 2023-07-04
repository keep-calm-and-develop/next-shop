import Head from "next/head";
import Title from "../../components/Title";
import { Product, getProduct, getProducts } from "../../lib/products";
import { ApiError } from "../../lib/api";
import Image from "next/image";

export async function getStaticPaths() {
    const products = await getProducts();
    return {
        paths: products.map((product) => ({
            params: { id: product.id.toString() },
        })),
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params: { id }}) {
    try {
        const product = await getProduct(id);
        return {
            props: {
                product,
            },
        };
    } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
            return { notFound: true };
        }
        throw error;
    }
}

interface ProductPageProps {
    product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
    return (
        <>
            <Head>
                <title>Product | Next Shop</title>
            </Head>
            <main className="px-6 py-4">
                <Title>{product.title}</Title>
                <div className="flex flex-col lg:flex-row">
                    <div className="mb-2">
                        <Image
                            src={product.pictureURL}
                            alt=""
                            width={640}
                            height={480}
                            loading="lazy"
                        />
                    </div>
                    <div className="flex-1 lg:ml-4">
                        <p className="text-sm">
                            {product.description}
                        </p>
                        <p className="text-lg font-bold mt-2">
                            ${product.price}
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ProductPage;
