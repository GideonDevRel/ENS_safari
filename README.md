# ENS Lookup & Registration DApp

This decentralized application (DApp) allows users to easily look up and register Ethereum Name Service (ENS) domains. Users can connect their wallets, check the availability of `.eth` domains, and register new domains through a secure commit-reveal process. The application is built using **Next.js**, **web3.js**, **NextUI**, and **ethers.js**, and is deployed on **[Fleek](https://fleek.xyz/)**, ensuring a decentralized and seamless deployment experience.

### 🚀 **Live Demo: [ENS Lookup & Registration](https://fleek.xyz/)**

---

## Features
- 🔍 **ENS Lookup**: Easily search for any `.eth` domain to check its availability and resolve it to an Ethereum address.
- 📝 **ENS Registration**: Register available ENS domains using the secure commit-reveal process to prevent front-running.
- 🔐 **MetaMask Integration**: Connect your wallet via MetaMask to interact with Ethereum smart contracts.
- ⚡ **Fleek Deployment**: The DApp is deployed on [Fleek](https://fleek.xyz/), leveraging decentralized hosting powered by IPFS.
- 🎨 **Modern UI**: Clean and responsive design built with **NextUI** for an intuitive user experience.

---

## Technologies Used
- **Next.js**: React framework for building fast and modern web applications.
- **web3.js**: Ethereum JavaScript API for interacting with smart contracts.
- **NextUI**: Elegant and fast UI components for a smooth user interface.
- **Fleek**: Decentralized hosting platform, powered by IPFS and Ethereum.

---

## How It Works

### ENS Lookup
- Users can enter any `.eth` domain (e.g., `myname.eth`) in the search bar.
- The app will check the availability of the domain using the `ETHRegistrarController` contract.

### ENS Registration
- If a domain is available, users can initiate the registration process, which consists of:
  1. **Commitment**: The user makes a commitment to register the domain, which is submitted on-chain to prevent front-running.
  2. **Waiting Period**: ENS requires a waiting period of at least 60 seconds after commitment.
  3. **Registration**: Once the waiting period is over, the user can complete the registration of their domain.

---

## Getting Started

### Prerequisites
- **Node.js** (v18+)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/maogagideon/ENS_safari.git
   cd ENS_Safari

