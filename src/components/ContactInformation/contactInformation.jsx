import "../ContactInformation/contactInformation.css"

export default function contactInf(props){
    return(
        <div className="contact-container">
            <a href="mailto: hh@gmail.com" className="contact-class">
                Наша почта: {props.mail}
             </a>
            <a href="tel: +79911232323" className="contact-class">
                {props.tel}
             </a>
        </div>
    );
}