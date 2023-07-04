import Head from 'next/head';
import Title from '../components/Title';
import { Product, getProducts } from '../lib/products';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import Page from '../components/Page';

export async function getStaticProps() {
    const products = await getProducts();
    return {
        props: {
            products,
        },
        revalidate: 5 * 60,
    };
}

interface HomePageProps {
    products: Product[];
};

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  return (
    <Page title="Indoor Plants">
        <ul className='grid grid-cols-1 gap:4 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3'>
            {
                products.map((product) => (
                    <li key={product.id}>
                        <ProductCard product={product} />
                    </li>
                ))
            }
        </ul>
    </Page>
  );
}

export default HomePage;
