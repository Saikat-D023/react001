import React from 'react';
import Link from 'next/link';

const Footer = () => {
    const footerData = [
        {
            title: 'Product',
            links: ['Features', 'Download', 'Integrations'],
        },
        {
            title: 'Company',
            links: ['About', 'Blog', 'Careers'],
        },
        {
            title: 'Support',
            links: ['Contact', 'Help Center', 'Status'],
        },
        {
            title: 'AI',
            links: ['Docs', 'API', 'Community'],
        },
        {
            title: 'Legal',
            links: ['Privacy Policy', 'Terms', 'Security'],
        },
    ];

    return (
        <footer className="w-full border-t border-gray-100 bg-white py-16 mt-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-12">
                {footerData.map((section) => (
                    <div key={section.title} className="flex flex-col space-y-4">
                        <h4 className="text-black font-semibold text-sm">
                            {section.title}
                        </h4>
                        <ul className="space-y-2">
                            {section.links.map((link) => (
                                <li key={link}>
                                    <Link
                                        href="#"
                                        className="text-gray-500 hover:text-black text-sm transition-colors"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </footer>
    );
};

export default Footer;