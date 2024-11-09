// Header.tsx

"use client";

import React, { useState } from 'react';
import { Box, Button, Flex, Link, Text, useDisclosure } from '@chakra-ui/react';
import Image from '@/components/ui/image';
import darkLogo from '@/assets/images/logo-white.svg';
import ConnectWallet from './ConnectWallet'; // Import the new component
import WalletConnect from '@/components/nft/wallet-connect';

interface HeaderProps {
    onRegistrationClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRegistrationClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [walletData, setWalletData] = useState({
        address: "",
        balance: null,
    });

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Function to handle wallet connection and updating state
    const handleConnect = (address: string, balance: string) => {
        setWalletData({ address, balance });
    };

    return (
        <header className="bg-black text-white p-4 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <Flex justify="space-between" align="center" w="full">
                <Image src={darkLogo} alt="Criptic" height={45} priority />
                <Button onClick={toggleMenu} display={{ base: 'block', lg: 'none' }} variant="link" colorScheme="white" aria-label="Toggle menu">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </Button>
            </Flex>
            <Flex
                direction={{ base: 'column', lg: 'row' }}
                align="center"
                display={isMenuOpen ? 'flex' : { base: 'none', lg: 'flex' }}
                className="space-x-4"
            >
                <Link href="#documentation" color="white" _hover={{ color: 'gray.400' }}>Documentation</Link>
                {/* <Link href="#login" color="white" _hover={{ color: 'gray.400' }}>Login</Link> */}
                <Link href="#register" onClick={(e) => { e.preventDefault(); onRegistrationClick(); }} color="white" _hover={{ color: 'gray.400' }}>
                    Registration
                </Link>
            </Flex>
            <Flex direction="column" align="center" className="space-y-2 lg:space-y-0 lg:space-x-4">
                <Text color="white">Maximum</Text>
                <Text color="white">Accrual 5.12%</Text>
                <Text color="white">Annual Rate 5.05%</Text>
            </Flex>
            
            <Flex direction="column" align="center">
            <WalletConnect />
            </Flex>
        </header>
    );
};

export default Header;
