# Olympus

<p float="left">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Solidity" src="https://img.shields.io/badge/Solidity-e6e6e6?style=for-the-badge&logo=solidity&logoColor=black" />
  <img alt="Python" src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue" />
</p>

This is my final year project for my Computing degreee at Imperial College London. The focus was on exploring security and gas usage of smart contracts through Play 2 Earn games.

## Abstract

The crypto space is a novel area, and despite the large sums dealt with, many projects do not follow good development practices. Subsequently, this means that users who interact with such protocols are at risk of losing funds through security vulnerabilities or wasting money on gas through inefficient code. To combat this, the aim was to find the optimal design patterns, procedures and tools that all developers should be using. Furthermore, solutions to programmatically verify the security of smart contracts and off-chain alternatives to reduce gas costs were presented. In addition, some of the most popular protocols, such as Axie Infinity, were analysed to discover best practices for development.

Using my findings, a decentralised Play to Earn game, Olympus, was developed to learn first-hand and illustrate a good framework for building Web3 projects. In making Olympus, it was found that automating the test suites and multiple tools, using varying techniques, such as static analysis and fuzzing, was the most beneficial in identifying bugs. To reduce the cost of computation, an alternative to a common price feed utility, Chainlink, was my own price prediction model. Additionally, solutions such as variable packing and carefully choosing data structures were employed to reduce gas consumption in development. However, it was found that the most significant gas savings were possible by moving the code off-chain at the sacrifice of decentralisation.

![Pixel Gaming GIF](frontend/src/images/pixel_home.gif)
