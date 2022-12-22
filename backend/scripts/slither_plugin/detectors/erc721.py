"""
Detects if a contract implements ERC721 token standard.
"""

from slither.detectors.abstract_detector import AbstractDetector, DetectorClassification


class ERC721(AbstractDetector):
    """
    Detect if ERC721 standard has been implemented correctly
    """

    ARGUMENT = "erc721"
    HELP = "All ERC721 functions have not been implemented"
    IMPACT = DetectorClassification.HIGH
    CONFIDENCE = DetectorClassification.HIGH

    WIKI = "https://eips.ethereum.org/EIPS/eip-721"
    WIKI_TITLE = "EIP-721"
    WIKI_DESCRIPTION = ".."
    WIKI_EXPLOIT_SCENARIO = ".."
    WIKI_RECOMMENDATION = ".."

    def _detect(self):
        ERC721_CONTRACTS = ["Olympus"]
        results = []
        signatures = {
            "balanceOf(address) returns(uint256)": 0,
            "ownerOf(uint256) returns(address)": 1,
            "safeTransferFrom(address,address,uint256) returns()": 2,
            "transferFrom(address,address,uint256) returns()": 3,
            "approve(address,uint256) returns()": 4,
            "getApproved(uint256) returns(address)": 5,
            "setApprovalForAll(address,bool) returns()": 6,
            "isApprovedForAll(address,address) returns(bool)": 7,
            "safeTransferFrom(address,address,uint256,bytes) returns()": 8}

        for contract in self.slither.contracts:
            if contract.name not in ERC721_CONTRACTS:
                continue

            found = [False] * 9
            for f in contract.functions:
                if f.signature_str in signatures:
                    found[signatures[f.signature_str]] = True

            if all(found):
                continue

            info = [
                f"{contract.name} does not implement the ERC721 standard correctly\n"]
            for sig in signatures:
                func_name = sig.split(" ")[0]
                if found[signatures[sig]]:
                    info.append(f"  {contract.name}.{func_name} [✔️]\n")
                else:
                    info.append(f"  {contract.name}.{func_name} [ ]\n")

            res = self.generate_result(info)
            results.append(res)

        return results
