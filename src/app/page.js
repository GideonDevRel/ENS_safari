'use client'

import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { NextUIProvider, Button, Input, Card, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";
import { Search, Edit3 } from 'lucide-react'; // Ensure lucide-react icons are correctly imported

export default function Home() {
  const [ensName, setEnsName] = useState('');
  const [lookupResult, setLookupResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [scrollBehavior, setScrollBehavior] = useState("inside"); // Added scroll behavior state

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }, []);

  const connectWallet = async () => {
    if (web3) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Failed to connect wallet", error);
      }
    }
  };

  const handleLookup = async () => {
    if (!web3 || !ensName.trim()) return;
    setLoading(true);
    try {
      const address = await web3.eth.ens.getAddress(ensName);
      setLookupResult(`Address for ${ensName}: ${address}`);
    } catch (error) {
      setLookupResult("ENS name not found or an error occurred.");
    }
    setLoading(false);
  };

  const handleRegister = () => {
    onOpen(); // Opens the modal using onOpen function
  };

  return (
    <NextUIProvider>
      <div className="flex flex-col justify-between min-h-screen p-8 pb-20 bg-gray-100">
        <header className="w-full max-w-4xl mx-auto">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-800">ENS Lookup</span>
            </div>
            {account ? (
              <Button color="primary" variant="ghost">{`Connected: ${account.substring(0, 6)}...${account.substring(account.length - 4)}`}</Button>
            ) : (
              <Button color="primary" variant="ghost" onClick={connectWallet}>Connect Wallet</Button>
            )}
          </nav>
        </header>

        <main className="w-full max-w-4xl mx-auto space-y-12">
          <section className="space-y-4 text-center">
            <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">Discover Your Ethereum Identity</h1>
            <p className="text-xl text-gray-600">Look up and register your unique Ethereum Name Service domain</p>
          </section>

          <Card className="p-8 bg-white shadow-lg rounded-xl">
            <CardBody className="space-y-6">
              <div className="flex space-x-4">
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Enter ENS name"
                  value={ensName}
                  onChange={(e) => setEnsName(e.target.value)}
                />
                <Button color="primary" onClick={handleLookup} disabled={loading} isLoading={loading} auto>
                  Lookup
                </Button>
              </div>
              {lookupResult && (
                <p style={{ padding: '10px', color: 'green' }}>{lookupResult}</p>
              )}
              <Button color="success" onClick={handleRegister} auto>
                <Edit3 className="w-4 h-4 mr-2" /> Register Domain
              </Button>
            </CardBody>
          </Card>
        </main>

        {/* Scroll Behavior Selection */}
        <div className="flex flex-col gap-2">
          <RadioGroup
            label="Select scroll behavior"
            orientation="horizontal"
            value={scrollBehavior}
            onValueChange={setScrollBehavior}
          >
            <Radio value="inside">inside</Radio>
            <Radio value="outside">outside</Radio>
          </RadioGroup>
        </div>

        {/* Modal */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={scrollBehavior}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Register ENS Domain
                </ModalHeader>
                <ModalBody>
                  <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Enter ENS name for registration"
                    value={ensName}
                    onChange={(e) => setEnsName(e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" onPress={() => {
                    alert(`Registering ${ensName}`);
                    onClose();
                  }}>
                    Register
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <footer className="w-full max-w-4xl mx-auto text-center text-gray-600">
          <p>&copy; 2023 ENS Lookup. All rights reserved.</p>
        </footer>
      </div>
    </NextUIProvider>
  );
}
