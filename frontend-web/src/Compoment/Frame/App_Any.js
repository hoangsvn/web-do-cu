import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const AnyUrl = () => {
    const { link } = useParams();
   
    const [Display, setDisplay] = useState();
    useEffect(() => {
        try {
            const response = fetch(link);
            const text = response.text();
            setDisplay(text);


        } catch (error) {

        }

        console.log(Display);
    }, [link]);

    return (
        <div>
            {link}
            {Display}
        </div>
    );
}

export default AnyUrl;