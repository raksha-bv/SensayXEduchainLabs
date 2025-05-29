// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract NFTCertificate is ERC721, Ownable {

    uint256 public nextTokenId;
    mapping(uint256 => string) private tokenIdToMetadataURI;

    event CertificateMinted(address recipient, uint256 tokenId, string metadataURI);

    constructor() ERC721("NFTCertificate", "CERT") Ownable(msg.sender) {}

    function mintCertificate(address recipient, string memory metadataURI) external {
        uint256 tokenId = nextTokenId;
        _safeMint(recipient, tokenId);
        tokenIdToMetadataURI[tokenId] = metadataURI;
        nextTokenId++;

        emit CertificateMinted(recipient, tokenId, metadataURI);
    }
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return tokenIdToMetadataURI[tokenId];
    }

}
