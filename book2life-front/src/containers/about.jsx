import React from 'react'
import bandeau from '../assets/images/bandeau.jpg'
import photo_groupe2 from '../assets/images/photo_groupe2.png'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faLinkedin, faSquareInstagram } from "@fortawesome/free-brands-svg-icons"



//Page a propos
const About = (props)=>{

    return (
        <main id="about">
            <h1 className='titre_h1'>Tu l'as déja lu et tu ne veux pas la garder ? Vends-la, échange-la ou donne-la !</h1>  
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident at assumenda inventore, in fugiat ipsa. Sequi libero praesentium laborum quos deserunt ipsum, tempora iste aspernatur fuga accusamus omnis ad dolor repellendus sapiente non. Cupiditate fuga dolorem expedita ipsam quas molestias.</p>

            <img src={bandeau} id="bandeau" alt = "héros de bande dessiné"/>
           
            <div>
                <h2 className='titre_h2 uppercase'>Une simple idée qui rassemble les passionnés de BDs</h2>
                <ol>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis aliquid laudantium assumenda consectetur veritatis nesciunt quis odio, possimus, ab molestiae cum quibusdam asperiores praesentium incidunt consequatur impedit quo labore necessitatibus ipsum ipsa molestias. Obcaecati commodi harum ipsam voluptatum eum reiciendis aliquam iste quibusdam veniam fuga explicabo voluptatem, quod aspernatur dolores.</li>
                    <li>Et ipsam iure vel fugit reprehenderit, minus in dicta quisquam vero, dignissimos dolores quis excepturi doloremque maxime accusantium ea. Quasi beatae iste corrupti at velit provident aliquam voluptate reprehenderit adipisci minus quam facere voluptatem incidunt eum, cupiditate ipsum odio, porro, officiis alias nesciunt temporibus similique nemo doloribus dolore! Nesciunt, delectus.</li>
                    <li>Unde aspernatur perspiciatis, dolores harum non doloribus quam fuga tempore blanditiis incidunt, iusto vitae, suscipit debitis quidem in vel tempora itaque recusandae dolore? Tempora necessitatibus nostrum quas illum nobis aut ea expedita, vitae similique inventore obcaecati vel in et doloremque aliquid quod dolores deserunt veniam nemo sed laboriosam! Sint, vero.</li>
                    <li>Magnam, voluptatum maiores nihil reprehenderit odit fugiat magni, dolore, eaque vel praesentium tempora eligendi. Amet doloribus cumque tempora incidunt vel ut sapiente odit nulla, doloremque, quisquam omnis perspiciatis officia maiores beatae iure dolorum quo accusantium corrupti provident vero odio quis expedita repellendus blanditiis! Laboriosam vitae excepturi quisquam veritatis repellat quo!</li>
                </ol>
            </div>

            <div>
                <h2 className='titre_h2 uppercase'>L’équipe dirigeante de Book2life</h2>    
                    <img src={photo_groupe2} id="equipe" alt = "l'équipe book2life en format BD"/>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi inventore perspiciatis culpa ipsam perferendis distinctio est amet obcaecati cum. Voluptates neque et voluptatum numquam sequi placeat harum tenetur dolore, dolorum quas, facilis doloremque, explicabo maxime. Ut nulla adipisci quas iure voluptates, facere sequi sint, mollitia aut consectetur est sed possimus.</p>
            </div>


            <div className='social'>
                <Link to=""><FontAwesomeIcon icon={faSquareFacebook}/></Link>
                <Link to=""><FontAwesomeIcon icon={faLinkedin}/></Link>
                <Link to=""><FontAwesomeIcon icon={faSquareInstagram}/></Link>
            </div>
        </main>     
    )
}

export default About