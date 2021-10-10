import IPage from "../interfaces/page";
//import getHeisigTrad from "./tradHeisig";

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
/*
    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }*/

    const testchr = (filename: string, text: string) => {
        //console.log(entext)
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }


/*
    function downloadUrl(){
        const url: URL = new URL('../staticResources/test.txt')
        window.open(url, '_self');
    }*/
    //<button type="button" onClick={() => downloadUrl()}>heisig</button>


// Start file download.
    //download("hello.txt","This is the content of my file :)");

    return (
    <section>
        <h1> The Products page </h1>
        <a href='../staticResources/personalStories.txt' download>Click to download</a>
        <p>******</p>
        <a href='../staticResources/test.txt' download>download test</a>
        <p>******</p>
        <button type="button" onClick={() => testchr("tretre.txt", "en ny text")}>downloadText</button>
        <p>******</p>

        <ul>
            {allProducts.map(meal => <li>{meal.name}</li>)}
        </ul>
    </section>
    );

};

export default Products;