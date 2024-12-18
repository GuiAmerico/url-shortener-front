import {Header} from "./components/Header";
import {Input} from "./components/Input";
import {ShortenerUrlForm} from "./components/ShortenerUrlForm";
import {MostVisitedUrl} from "./components/MostVisitedUrl";

function App() {

    return (
        <div>
            <Header/>
            <ShortenerUrlForm/>
            <MostVisitedUrl/>
        </div>
    )
}

export default App
