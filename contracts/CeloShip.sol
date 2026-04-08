// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CeloShip {
    struct Ship {
        address builder;
        string metadataURI; // Link a tu actividad/log
        uint256 timestamp;
    }

    Ship[] public allShips;
    mapping(address => uint256) public shipCount;

    event NewShip(address indexed builder, string metadataURI);

    function shipIt(string memory _metadataURI) public {
        allShips.push(Ship(msg.sender, _metadataURI, block.timestamp));
        shipCount[msg.sender]++;
        emit NewShip(msg.sender, _metadataURI);
    }
}
