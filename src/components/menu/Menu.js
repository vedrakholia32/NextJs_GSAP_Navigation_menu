"use client"

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

import "./menu.css"

import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";

const menuLinks = [
    { path: '/', label: "Home" },
    { path: '/work', label: "work" },
    { path: '/about', label: "about" },
    { path: '/contact', label: "contact" },
]

const Menu = () => {
    const container = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const tl = useRef()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useGSAP(() => {
        gsap.set(".menu-link-item-holder", { y: 75 });
        tl.current = gsap
            .timeline({ paused: true })
            .to(".menu-overlay", {
                duration: 1.25,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "power4.inOut",
            })
            .to(".menu-link-item-holder", {
                y: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.inOut",
                delay: -0.75
            })
    }, { scope: container });

    useEffect(() => {
        if (isMenuOpen) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
    }, [isMenuOpen]);

    const handleLinkClick = (path) => {
        // First, close the menu
        setIsMenuOpen(false);

        // Delay the navigation to allow the closing animation to finish
        setTimeout(() => {
            window.location.href = path; // Use window.location.href to navigate after the animation
        }, 1200); // Wait for the animation to finish (match the duration of the closing animation)
    }

    return (
        <div className="menu-container" ref={container}>
            <div className="menubar">
                <div className="menu-logo">
                    {/* <Link href={"/"}>Hello</Link> */}
                </div>
                <div className="menu-open" onClick={toggleMenu}>
                    <p className="special">Menu</p>
                </div>
            </div>
            <div className="menu-overlay">
                <div className="menu-overlay-bar">
                    <div className="menu-logo">
                        {/* <Link href={"/"}>Hello</Link> */}
                    </div>
                    <div className="menu-close" onClick={toggleMenu}>
                        <p>Close</p>
                    </div>
                </div>
                <div className="menu-close-icon">
                    {/* <p>&#x2715;</p> */}
                </div>
                <div className="menu-copy">
                    <div className="menu-links">
                        {menuLinks.map((link, index) => (
                            <div className="menu-link-item" key={index}>
                                <div className="menu-link-item-holder" onClick={() => handleLinkClick(link.path)}>
                                    <p className="menu-link">{link.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="menu-preview"></div>
            </div>
        </div>
    );
};

export default Menu;
