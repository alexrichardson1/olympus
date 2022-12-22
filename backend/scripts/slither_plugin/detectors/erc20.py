"""
Detects if a contract implements ERC20 token standard.
"""

from slither.detectors.abstract_detector import AbstractDetector, DetectorClassification


class ERC20(AbstractDetector):
    """
    Detect if ERC20 standard has been implemented correctly
    """

    ARGUMENT = "erc20"
    HELP = "All ERC20 functions have not been implemented"
    IMPACT = DetectorClassification.HIGH
    CONFIDENCE = DetectorClassification.HIGH

    WIKI = "https://eips.ethereum.org/EIPS/eip-20"
    WIKI_TITLE = "EIP-20"
    WIKI_DESCRIPTION = ".."
    WIKI_EXPLOIT_SCENARIO = ".."
    WIKI_RECOMMENDATION = ".."

    def _detect(self):
        ERC20_CONTRACTS = ["Drachma", "Gold"]
        results = []
        signatures = {
            "totalSupply() returns(uint256)": 0,
            "balanceOf(address) returns(uint256)": 1,
            "transfer(address,uint256) returns(bool)": 2,
            "allowance(address,address) returns(uint256)": 3,
            "approve(address,uint256) returns(bool)": 4,
            "transferFrom(address,address,uint256) returns(bool)": 5}

        for contract in self.slither.contracts:
            if contract.name not in ERC20_CONTRACTS:
                continue

            found = [False] * 6
            for f in contract.functions:
                if f.signature_str in signatures:
                    found[signatures[f.signature_str]] = True

            if all(found):
                continue

            info = [
                f"{contract.name} does not implement the ERC20 standard correctly\n"]
            for sig in signatures:
                func_name = sig.split(" ")[0]
                if found[signatures[sig]]:
                    info.append(f"  {contract.name}.{func_name} [✔️]\n")
                else:
                    info.append(f"  {contract.name}.{func_name} [ ]\n")

            res = self.generate_result(info)
            results.append(res)

        return results
