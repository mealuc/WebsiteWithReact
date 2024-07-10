import React from 'react';
import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footerContainer">
                <div className="footerCategories">
                    <ul>
                        <h3>First</h3>
                        <li><a>Test 0</a></li>
                        <li><a>Test 1</a></li>
                        <li><a>Test 2</a></li>
                        <li><a>Test 3</a></li>
                        <li><a>Test 4</a></li>
                        <li><a>Test 5</a></li>
                        <li><a>Test 6</a></li>
                    </ul>
                    <ul>
                        <h3>Second</h3>
                        <li><a>Test 6</a></li>
                        <li><a>Test 7</a></li>
                        <li><a>Test 8</a></li>
                        <li><a>Test 9</a></li>
                    </ul>
                </div>
            </div>
            <div className="footerCopyright">
                <p>TEST</p>
            </div>
        </footer>
    )

}

export default Footer = React.memo(Footer);