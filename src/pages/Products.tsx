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

    const testchr = (filename: string, text: string) => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    const getCharactersJson = (filename: string, url: string) => {
        fetch(url)
            .then(res => res.json())
            .then(data => testchr(filename, JSON.stringify(data)))
    }

    return (
    <section>
        <h1> The Products page </h1>
        <a href='../staticResources/personalStories.txt' download>Click to download</a>
        <p>******</p>
        <a href='../staticResources/test.txt' download>download test</a>
        <p>******</p>
        <button type="button" onClick={() => testchr("tretre.txt", "en ny text")}>downloadText</button>
        <p>******</p>
        <button type="button" onClick={() => getCharactersJson("heisigKanjiV5-3030noKeys.json", "https://weiqifan1.github.io/hanzimining_data/heisigKanjiV5-3030noKeys.json")}>DownloadKanji</button>
        <button type="button" onClick={() => getCharactersJson("heisigTraditionalV1-3035noKeys.json", "https://weiqifan1.github.io/hanzimining_data/heisigTraditionalV1-3035noKeys.json")}>DownloadTraditional</button>
        <button type="button" onClick={() => getCharactersJson("heisigSimplifiedV1-3018noKeys.json", "https://weiqifan1.github.io/hanzimining_data/heisigSimplifiedV1-3018noKeys.json")}>DownloadSimplified</button>
        <ul>
            {allProducts.map(meal => <li>{meal.name}</li>)}
        </ul>
    </section>
    );

};

export default Products;