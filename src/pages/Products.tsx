import IPage from "../interfaces/page";

const Products: React.FunctionComponent<IPage> = props => {

    return (
    <section>
        <h1> The Products page </h1>
        <ul>
            <li>Product 1</li>
            <li>Product 2</li>
            <li>Product 3</li>
        </ul>
    </section>
    );

};

export default Products;