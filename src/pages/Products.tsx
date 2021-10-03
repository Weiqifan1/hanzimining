import IPage from "../interfaces/page";

const Products: React.FunctionComponent<IPage> = props => {

    const allProducts = [
        {
            name: "name1",
            info: "info1",
            price: 1
        },
        {
            name: "name2",
            info: "info2",
            price: 2
        }
    ]

    return (
    <section>
        <h1> The Products page </h1>
        <ul>
            {allProducts.map(meal => <li>{meal.name}</li>)}
        </ul>
    </section>
    );

};

export default Products;