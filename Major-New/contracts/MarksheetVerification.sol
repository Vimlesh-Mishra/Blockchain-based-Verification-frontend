// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MarksheetVerification {
    struct Marksheet {
        string studentName;
        string prn;  // Added PRN
        bytes32 marksheetHash;
        string ipfsHash;
    }

    mapping(bytes32 => Marksheet) public marksheets;

    event MarksheetUploaded(bytes32 indexed marksheetHash, string studentName, string prn, string ipfsHash);
    event BatchUploadCompleted(uint256 totalUploaded);
    event VerificationAttempt(address indexed verifier, bytes32 indexed marksheetHash, uint256 timestamp);

    function uploadMarksheet(string memory _studentName, string memory _prn, bytes32 _marksheetHash, string memory _ipfsHash) public {
        require(marksheets[_marksheetHash].marksheetHash == 0x0, "Marksheet already exists");
        require(bytes(_studentName).length > 0, "Student name cannot be empty");
        require(bytes(_prn).length > 0, "PRN cannot be empty");
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");

        marksheets[_marksheetHash] = Marksheet(_studentName, _prn, _marksheetHash, _ipfsHash);

        emit MarksheetUploaded(_marksheetHash, _studentName, _prn, _ipfsHash);
    }

    function uploadMultipleMarkSheets(
        string[] memory _studentNames,
        string[] memory _prns,  // Added PRNs array
        bytes32[] memory _marksheetHashes,
        string[] memory _ipfsHashes
    ) public {
        require(
            _studentNames.length == _prns.length && 
            _prns.length == _marksheetHashes.length &&
            _marksheetHashes.length == _ipfsHashes.length,
            "Input array lengths must match"
        );

        uint256 totalUploaded = 0;

        for (uint256 i = 0; i < _studentNames.length; i++) {
            require(marksheets[_marksheetHashes[i]].marksheetHash == 0x0, "Duplicate marksheet detected");
            require(bytes(_studentNames[i]).length > 0, "Student name cannot be empty");
            require(bytes(_prns[i]).length > 0, "PRN cannot be empty");
            require(bytes(_ipfsHashes[i]).length > 0, "IPFS hash cannot be empty");

            marksheets[_marksheetHashes[i]] = Marksheet(_studentNames[i], _prns[i], _marksheetHashes[i], _ipfsHashes[i]);

            emit MarksheetUploaded(_marksheetHashes[i], _studentNames[i], _prns[i], _ipfsHashes[i]);

            totalUploaded++;
        }

        emit BatchUploadCompleted(totalUploaded);
    }

    function verifyMarksheet(bytes32 _providedHash) public returns (bool) {
        require(marksheets[_providedHash].marksheetHash != 0x0, "Marksheet does not exist");

        emit VerificationAttempt(msg.sender, _providedHash, block.timestamp);

        return true;
    }

    function getMarksheetDetails(bytes32 _providedHash) public view returns (string memory, string memory, string memory) {
        require(marksheets[_providedHash].marksheetHash != 0x0, "Marksheet does not exist");

        Marksheet memory storedMarksheet = marksheets[_providedHash];
        return (storedMarksheet.studentName, storedMarksheet.prn, storedMarksheet.ipfsHash);
    }
}
