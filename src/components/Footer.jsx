const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="flex items-center justify-center px-10 py-10 bg-green-500">
            <p>&copy; {year} Till Jannah</p>
        </footer>
    );
}

export default Footer;