// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ENSAddressBook {
    mapping(string => address[]) public centralMap;
    mapping(string => address) public mostPreferredAddress;
    mapping(string => uint) public booleanExists;

    event preferredAddressUpdate(string message);
    event entryAdded(string message);
    event noAddressExists(string message);

    function addEntry(string memory _ens, uint preferred) public {
        address addable = msg.sender;
        for (uint i = 0; i < centralMap[_ens].length; i++) {
            if (addable == centralMap[_ens][i]) return;
        }
        centralMap[_ens].push(addable);
        if (preferred == 1 || booleanExists[_ens] != 1) {
            mostPreferredAddress[_ens] = addable;
            emit preferredAddressUpdate("Preferred EOA Address Updated");
        }
        booleanExists[_ens] = 1;
        emit entryAdded("Entry Added to the given ENS");
    }

    function checkExistance(string memory _ens) public view returns (bool) {
        return booleanExists[_ens] == 1;
    }

    function getAllAddresses(
        string memory _ens
    ) public view returns (address[] memory) {
        require(
            centralMap[_ens].length > 0,
            "No address exists for the given ENS"
        );
        return centralMap[_ens];
    }

    function crossContractENStoEOA(
        string memory _ens
    ) external view returns (address) {
        require(
            centralMap[_ens].length > 0,
            "No address is registered for the given ENS"
        );
        return mostPreferredAddress[_ens];
    }

    function giveSize(string memory _ens) public view returns (uint) {
        return centralMap[_ens].length;
    }

    function getMostfitAddress(
        string memory _ens
    ) public view returns (address) {
        require(
            centralMap[_ens].length > 0,
            "No address exists for the corresponding ENS"
        );

        return mostPreferredAddress[_ens];
    }

    function getAddressOfKeyByIndex(
        string memory _ens,
        uint index
    ) public view returns (address) {
        require(index < centralMap[_ens].length, "Memory out of bound access");
        return centralMap[_ens][index];
    }
}
