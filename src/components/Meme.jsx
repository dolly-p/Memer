import styled from "styled-components";
import axios from "axios";
import qs from "qs";

import { useState, useEffect } from "react";

const username = import.meta.env.VITE_USERNAME;
const password = import.meta.env.VITE_PASSWORD;
let randNum;

const Meme = () =>{
    const [data, setData] = useState([]);
    const [firstText, setFirstText] = useState("");
    const [secondText, setSecondText] = useState("");
    const [randomMeme, setRandomMeme] = useState([]);
    const [imgPath, setImgPath] = useState(""); 

    const handleFirstInput = (e) =>{
        setFirstText(e.target.value)
    }
    const handleSecondInput = (e) =>{
        setSecondText(e.target.value);
    }
    const handleSubmit =()=>{
        randNum = Math.floor(Math.random() * data.length)
        setRandomMeme(data[randNum]);
    }
    const handleClick = async()=>{
        const params = {
            template_id: `${data[randNum].id}`,
            username: username.toString(),
            password: password.toString(),
            text0: firstText,
            text1: secondText
        }
        
        const createMeme = await axios.post("https://memer-36gg.onrender.com/api/caption_image", qs.stringify(params),{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(createMeme.data.data.url);
        
        const img = createMeme.data.data.url;
        setImgPath(img);
    }

    useEffect(()=>{
        const getMeme = async()=>{
            const meme = await axios.get("https://api.imgflip.com/get_memes");
            setData(meme.data.data.memes);
            
        }
        getMeme();
    }, [])
    
    return(
        <Container>
            <section>
                <h1>Meme Generator</h1>
                <Form>
                    <form action="">
                        <label htmlFor="firstText">First Text: </label>
                        <input type="text" name="firstText" onChange={handleFirstInput} /><br />
                        <label htmlFor="secondText">Second Text: </label>
                        <input type="text" name="secondText" onChange={handleSecondInput} /><br />
                        <Submit>
                            <div onClick={handleClick} className="submit">Generate Meme</div>
                            <div onClick={handleSubmit} className="submit">Load Meme</div>
                        </Submit>
                    </form>
                </Form>

                    {/* <img src="https://i.imgflip.com/952i4j.jpg" alt="" /> */}
                    <MemeBox>
                        <img src={randomMeme.url} alt="" />
                        <img src={imgPath} alt="" />
                    </MemeBox>
            </section>
        </Container>
    )
}
const Container = styled.div`
    margin-top: 10%;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    background-color: aliceblue;
    border-radius: 5px;
    color: black;
    text-align: center;
    h1{
        font-size: 3rem;
    }
`
const Form = styled.div`
    width: 100%;
    padding-top: 2rem;
    label{
        font-size: 1.5rem;
    }
    input{
        min-width: 3rem;
        width: 60%;
        height: 1.5rem;
        border: 1px solid rgba(2,0,36,1);
        margin-bottom: 1rem;
    }
    .submit{
        width: 40%;
        padding-top: .5rem;
        padding-bottom: .5rem;
        text-align: center;
        border: 1px solid rgba(2,0,36,1);
        margin-left: auto;
        margin-right: auto;
        cursor: pointer;
    }
    .submit[value]{
        font-size: 1rem;
    }
`
const Submit = styled.div`
    display: flex;
`
const MemeBox = styled.div`
    padding-top: 1.5rem;
    padding-bottom: 3rem;

    img{
        border-radius: 5px;
        max-width: 400px;
        max-height: 800px;
    }
`
export default Meme;