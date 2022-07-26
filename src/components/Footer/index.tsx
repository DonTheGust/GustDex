import logoGit from "../../assets/img/github.svg";
import "./styles.css";

function Footer() {
    return (
        <>
            <div className="git-footer">
                <p>Made by:
                    <a href="https://github.com/DonTheGust" target="_blank"> <img src={logoGit} className="git" alt="Babylon by Gus" /> DonTheGust</a>.
                </p>
            </div>
        </>
    );
}

export default Footer;