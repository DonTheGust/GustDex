import "./styles.css";

function Header() {
    const srcLogo = 'https://fontmeme.com/permalink/220726/cded6ed0131fcad61ee379df3f93b503.png'

    return (
        <a href="https://github.com/DonTheGust/GustDex"><img src={srcLogo} alt="logo" className="logo" /></a>
    );
}

export default Header;