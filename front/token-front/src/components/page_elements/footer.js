const Footer = (props) =>{
    /*
        Props:
        1.Brand
        2.items - list of links. Every element contains href and text propertyes
     */
    return(
        <footer class="footer">
        <div class="container">
        <div class="row">
            <div class="col-12 col-md-4">
            <p class="text text--gray footer__copy">{props.brand}</p>
            </div>
            <div class="col-12 col-md-8">
            <ul class="footer__links">
                {props.items.map(e => (
                    <li class="footer__links-item"><a class="text text--gray" href={e.href} target="_blank">{e.text}</a></li>
                ))}
            </ul>
            </div>
        </div>
        </div>
    </footer>
    )
}
export default Footer