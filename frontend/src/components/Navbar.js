import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>ADMIN CONTROL</h1>
                </Link>
                <h2>Logout</h2>
            </div>
        </header>
    )
}

export default Navbar;