import Head from "next/head";
import Title from "../../components/Title";
import { Product, getProduct, getProducts } from "../../lib/products";
import { ApiError } from "../../lib/api";

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
                <p>
                    {product.description}
                </p>
            </main>
        </>
    );
}

export default ProductPage;
